// controllers/StudyController.js — керує режимом вивчення карток (app.html)

import { $ } from "../helpers.js";

export class StudyController {
  constructor(userModel, wordModel, progressModel, view, quizController) {
    this.userModel     = userModel;
    this.wordModel     = wordModel;
    this.progressModel = progressModel;
    this.view          = view;
    this.quizCtrl      = quizController;
    this.user          = null;
    // Поточний стан: рівень, тема, індекс картки
    this.state         = { level: null, topic: null, index: 0 };
  }

  // Ініціалізація: перевірка сесії, заповнення фільтрів, перший рендер
  init() {
    this.user = this.userModel.currentUser();
    if (!this.user) { alert("Спочатку увійди"); location.href = "index.html"; return; }

    $("#logoutBtn")?.addEventListener("click", () => this.userModel.logout());

    const levels = this.wordModel.getLevels();
    this.state.level = levels[0];
    this.state.topic = this.wordModel.getTopics(this.state.level)[0];

    this.view.fillLevels(levels, this.state.level);
    this.view.fillTopics(this.wordModel.getTopics(this.state.level), this.state.topic);

    this._bindEvents();
    this._renderAll();
    this.view.setMode("study");
  }

  // Підписка на всі події UI
  _bindEvents() {
    this.view.levelSel.addEventListener("change", () => {
      this.state.level = this.view.levelSel.value;
      const topics = this.wordModel.getTopics(this.state.level);
      this.state.topic = topics[0];
      this.view.fillTopics(topics, this.state.topic);
      this.state.index = 0;
      this._renderAll();
      this.quizCtrl.reset();
    });

    this.view.topicSel.addEventListener("change", () => {
      this.state.topic = this.view.topicSel.value;
      this.state.index = 0;
      this._renderAll();
      this.quizCtrl.reset();
    });

    this.view.flipBtn.addEventListener("click",     () => this.view.toggleTranslation());
    this.view.prevCardBtn.addEventListener("click", () => { this.state.index--; this._renderCard(); });
    this.view.nextCardBtn.addEventListener("click", () => { this.state.index++; this._renderCard(); });

    // "Знаю" — позначає вивченим і переходить до наступного
    this.view.knowBtn.addEventListener("click", () => {
      const words = this._currentWords();
      this.progressModel.markKnown(this.user.email, words[this.state.index].id, true);
      if (this.state.index < words.length - 1) this.state.index++;
      this._renderAll();
    });

    // "Не знаю" — знімає позначку вивченого
    this.view.dontKnowBtn.addEventListener("click", () => {
      const words = this._currentWords();
      this.progressModel.markKnown(this.user.email, words[this.state.index].id, false);
      this._renderAll();
    });

    $("#resetProgressBtn")?.addEventListener("click", () => {
      if (!confirm("Скинути прогрес для цього користувача?")) return;
      this.progressModel.reset(this.user.email);
      this.state.index = 0;
      this._renderAll();
      this.quizCtrl.reset();
    });

    this.view.tabStudy.addEventListener("click", () => this.view.setMode("study"));
    this.view.tabQuiz.addEventListener("click",  () => this.view.setMode("quiz"));
  }

  _currentWords() {
    return this.wordModel.getWords(this.state.level, this.state.topic);
  }

  _renderCard() {
    const words = this._currentWords();
    if (!words.length) return;
    this.state.index = Math.max(0, Math.min(this.state.index, words.length - 1));
    this.view.renderCard(
      words[this.state.index], this.state.index, words.length,
      this.state.level, this.state.topic
    );
  }

  _renderAll() {
    const words = this._currentWords();
    const prog  = this.progressModel.get(this.user.email);
    this.view.renderStats(words.filter(w => prog.known[w.id]).length, words.length);
    this.view.renderList(words, prog.known);
    this._renderCard();
  }

  // Публічні методи — використовуються QuizController
  getCurrentWords() { return this._currentWords(); }
  getState()        { return this.state; }
  getUser()         { return this.user; }
}
