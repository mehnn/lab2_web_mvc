// controllers/QuizController.js — керує вікториною (app.html)

import { shuffle } from "../helpers.js";

export class QuizController {
  constructor(wordModel, progressModel, view) {
    this.wordModel     = wordModel;
    this.progressModel = progressModel;
    this.view          = view;
    this.studyCtrl     = null; // встановлюється через setStudyController()

    // Запасні варіанти відповідей якщо в темі менше 4 слів
    this._PAD  = ["місяць", "вікно", "міст", "ручка", "сумка", "дерево", "вогонь", "небо", "камінь"];

    this.state = { poolMode: "all", questions: [], qi: 0, locked: false, score: 0, total: 0 };
  }

  // Взаємна залежність: QuizController потребує доступу до StudyController
  setStudyController(ctrl) { this.studyCtrl = ctrl; }

  // Підписка на кнопки вікторини; перший запуск
  init() {
    this.view.startQuizBtn.addEventListener("click",    () => this.reset());
    this.view.nextQuestionBtn.addEventListener("click", () => this._nextQuestion());
    this.view.onlyUnknownBtn.addEventListener("click",  () => {
      this.state.poolMode = this.state.poolMode === "unknown" ? "all" : "unknown";
      this.view.setOnlyUnknownLabel(this.state.poolMode === "unknown");
      this.reset();
    });
    this.reset();
  }

  // Перезапускає вікторину з нуля
  reset() {
    this.state.locked    = false;
    this.state.score     = 0;
    this.state.qi        = 0;
    this.state.questions = this._buildQuestions();
    this.state.total     = this.state.questions.length;
    this.view.renderHUD(0, this.state.total);
    this._renderQuestion();
  }

  // Формує список питань залежно від режиму (всі / тільки невивчені)
  _buildQuestions() {
    const user  = this.studyCtrl.getUser();
    const words = this.studyCtrl.getCurrentWords();
    const prog  = this.progressModel.get(user.email);

    const pool = this.state.poolMode === "unknown"
      ? words.filter(w => !prog.known[w.id])
      : words;

    const src = pool.length ? pool : words;
    return shuffle(src).map(w => ({
      word:    w,
      correct: w.ua,
      options: this._makeOptions(w, words),
    }));
  }

  // Генерує 4 варіанти: 1 правильний + 3 випадкові неправильні
  _makeOptions(target, words) {
    const wrongs = shuffle(words.filter(x => x.en !== target.en).map(x => x.ua)).slice(0, 3);
    const opts   = shuffle([target.ua, ...wrongs]);
    while (opts.length < 4) opts.push(this._PAD[opts.length % this._PAD.length]);
    return opts.slice(0, 4);
  }

  _renderQuestion() {
    this.state.locked = false;
    if (!this.state.questions.length) return;
    if (this.state.qi >= this.state.questions.length) {
      this.view.renderFinished(this.state.score, this.state.total);
      return;
    }
    this.view.renderQuestion(this.state.questions[this.state.qi], (opt) => this._onChoose(opt));
  }

  // Обробляє вибір відповіді: оновлює прогрес, підсвічує кнопки
  _onChoose(opt) {
    if (this.state.locked) return;
    this.state.locked = true;

    const q         = this.state.questions[this.state.qi];
    const isCorrect = opt === q.correct;

    this.progressModel.recordQuizAnswer(this.studyCtrl.getUser().email, isCorrect);
    this.view.highlightAnswer(q.correct, opt);
    this.view.showFeedback(isCorrect, q.correct);

    if (isCorrect) {
      this.state.score += 1;
      this.view.renderHUD(this.state.score, this.state.total);
      // При правильній відповіді — автоперехід через 1.3 с
      setTimeout(() => { this.state.qi++; this.state.locked = false; this._renderQuestion(); }, 1300);
    } else {
      this.view.renderHUD(this.state.score, this.state.total);
    }
  }

  _nextQuestion() {
    this.state.qi++;
    this._renderQuestion();
  }
}
