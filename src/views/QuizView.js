// views/QuizView.js — відображення вікторини (app.html)

import { $, escapeHtml } from "../helpers.js";

export class QuizView {
  constructor() {
    this.quizWord        = $("#quizWord");
    this.quizOptions     = $("#quizOptions");
    this.quizScore       = $("#quizScore");
    this.quizTotal       = $("#quizTotal");
    this.quizFeedback    = $("#quizFeedback");
    this.nextQuestionBtn = $("#nextQuestionBtn");
    this.startQuizBtn    = $("#startQuizBtn");
    this.onlyUnknownBtn  = $("#quizOnlyUnknownBtn");
  }

  // Оновлює лічильник рахунку
  renderHUD(score, total) {
    this.quizScore.textContent = String(score);
    this.quizTotal.textContent = String(total);
  }

  // Малює питання з варіантами відповідей; onChoose — колбек при натисканні
  renderQuestion(question, onChoose) {
    this.quizFeedback.textContent = "Натисни варіант відповіді.";
    this.nextQuestionBtn.disabled = true;
    this.quizWord.textContent     = question.word.en;
    this.quizOptions.innerHTML    = "";

    question.options.forEach(opt => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6";
      col.innerHTML = `
        <button type="button" class="btn btn-soft w-100 py-3 text-start quiz-opt">
          ${escapeHtml(opt)}
        </button>
      `;
      col.querySelector("button").addEventListener("click", () => onChoose(opt));
      this.quizOptions.appendChild(col);
    });
  }

  // Показує підсумковий екран після останнього питання
  renderFinished(score, total) {
    this.quizWord.textContent  = "Готово!";
    this.quizOptions.innerHTML = `
      <div class="col-12">
        <div class="alert alert-success mb-0">
          ✅ Вікторина завершена. Рахунок: <b>${score}</b> / <b>${total}</b>
        </div>
      </div>
    `;
  }

  // Підсвічує правильну/неправильну відповідь після вибору
  highlightAnswer(correct, chosen) {
    this.quizOptions.querySelectorAll("button.quiz-opt").forEach(btn => {
      const txt = btn.textContent.trim();
      if (txt === correct) btn.className = "btn btn-accent w-100 py-3 text-start quiz-opt";
      if (txt === chosen && chosen !== correct) btn.className = "btn btn-danger w-100 py-3 text-start quiz-opt";
      btn.disabled = true;
    });
  }

  // Показує текстовий фідбек і вмикає/вимикає кнопку "Далі"
  showFeedback(isCorrect, correct) {
    this.quizFeedback.textContent = isCorrect
      ? "✅ Правильно!"
      : `❌ Ні. Правильно: ${correct}`;
    this.nextQuestionBtn.disabled = isCorrect;
  }

  // Оновлює текст кнопки режиму "тільки невивчені"
  setOnlyUnknownLabel(isUnknown) {
    this.onlyUnknownBtn.textContent = isUnknown ? "Тільки невивчені ✅" : "Тільки невивчені";
  }
}
