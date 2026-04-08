// models/ProgressModel.js — прогрес користувача (вивчені слова + статистика вікторини)

import { load, save } from "../helpers.js";

export class ProgressModel {

  // Ключ у localStorage прив'язаний до email користувача
  _key(email) { return `progress::${email}`; }

  // Повертає прогрес або порожній об'єкт за замовчуванням
  get(email) {
    return load(this._key(email), { known: {}, quiz: { correct: 0, total: 0 } });
  }

  // Зберігає прогрес
  set(email, progress) {
    save(this._key(email), progress);
  }

  // Скидає весь прогрес користувача
  reset(email) {
    this.set(email, { known: {}, quiz: { correct: 0, total: 0 } });
  }

  // Додає або знімає позначку "вивчено" для конкретного слова
  markKnown(email, wordId, isKnown) {
    const p = this.get(email);
    if (isKnown) p.known[wordId] = true;
    else delete p.known[wordId];
    this.set(email, p);
  }

  // Записує результат однієї відповіді у вікторині
  recordQuizAnswer(email, isCorrect) {
    const p = this.get(email);
    p.quiz.total += 1;
    if (isCorrect) p.quiz.correct += 1;
    this.set(email, p);
  }
}
