// views/StudyView.js — картка слова, таблиця та статистика (app.html)

import { $, escapeHtml } from "../helpers.js";

export class StudyView {
  constructor() {
    // Фільтри рівня/теми та прогрес-бар
    this.levelSel       = $("#levelSelect");
    this.topicSel       = $("#topicSelect");
    this.statsBadge     = $("#statsBadge");
    this.progressBar    = $("#progressBar");
    this.progressText   = $("#progressText");

    // Елементи картки слова
    this.cardIndexText  = $("#cardIndexText");
    this.cardTopicBadge = $("#cardTopicBadge");
    this.cardEn         = $("#cardEn");
    this.cardUa         = $("#cardUa");
    this.cardUaWrap     = $("#cardUaWrap");
    this.flipBtn        = $("#flipBtn");
    this.prevCardBtn    = $("#prevCardBtn");
    this.nextCardBtn    = $("#nextCardBtn");
    this.knowBtn        = $("#knowBtn");
    this.dontKnowBtn    = $("#dontKnowBtn");

    // Таблиця слів та перемикач режимів
    this.wordsListTbody = $("#wordsListTbody");
    this.listCountBadge = $("#listCountBadge");
    this.tabStudy       = $("#tabStudy");
    this.tabQuiz        = $("#tabQuiz");
    this.studySection   = $("#studySection");
    this.quizSection    = $("#quizSection");
  }

  // Заповнює select рівнів
  fillLevels(levels, current) {
    this.levelSel.innerHTML = "";
    levels.forEach(l => {
      const opt = document.createElement("option");
      opt.value = l; opt.textContent = l;
      this.levelSel.appendChild(opt);
    });
    this.levelSel.value = current;
  }

  // Заповнює select тем
  fillTopics(topics, current) {
    this.topicSel.innerHTML = "";
    topics.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t; opt.textContent = t;
      this.topicSel.appendChild(opt);
    });
    this.topicSel.value = current;
  }

  // Оновлює бейдж та прогрес-бар по поточній темі
  renderStats(knownCount, total) {
    const pct = total ? Math.round((knownCount / total) * 100) : 0;
    this.statsBadge.textContent   = `${knownCount}/${total} вивчено`;
    this.progressBar.style.width  = `${pct}%`;
    this.progressText.textContent = `Прогрес: ${pct}%`;
  }

  // Малює таблицю слів із позначками "вивчено"
  renderList(words, knownMap) {
    this.listCountBadge.textContent = `${words.length} слів`;
    this.wordsListTbody.innerHTML = "";
    words.forEach(w => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="fw-semibold">${escapeHtml(w.en)}</td>
        <td>${escapeHtml(w.ua)}</td>
        <td>${knownMap[w.id] ? "✅ Вивчено" : "—"}</td>
      `;
      this.wordsListTbody.appendChild(tr);
    });
  }

  // Відображає поточну картку слова
  renderCard(word, index, total, level, topic) {
    this.cardIndexText.textContent  = `${index + 1}/${total}`;
    this.cardTopicBadge.textContent = `${level} • ${topic}`;
    this.cardEn.textContent = word.en;
    this.cardUa.textContent = word.ua;
    this.cardUaWrap.classList.add("d-none");
    this.flipBtn.textContent  = "Показати переклад";
    this.prevCardBtn.disabled = index === 0;
    this.nextCardBtn.disabled = index === total - 1;
  }

  // Перемикає показ/сховок перекладу
  toggleTranslation() {
    const hidden = this.cardUaWrap.classList.contains("d-none");
    this.cardUaWrap.classList.toggle("d-none", !hidden);
    this.flipBtn.textContent = hidden ? "Сховати переклад" : "Показати переклад";
  }

  // Перемикає вкладки "Вивчення" / "Вікторина"
  setMode(mode) {
    const isStudy = mode === "study";
    this.tabStudy.classList.toggle("active", isStudy);
    this.tabQuiz.classList.toggle("active",  !isStudy);
    this.studySection.classList.toggle("d-none", !isStudy);
    this.quizSection.classList.toggle("d-none",   isStudy);
  }
}
