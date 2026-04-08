// controllers/ProfileController.js — керує сторінкою профілю (profile.html)

import { $ } from "../helpers.js";

export class ProfileController {
  constructor(userModel, wordModel, progressModel, view) {
    this.userModel     = userModel;
    this.wordModel     = wordModel;
    this.progressModel = progressModel;
    this.view          = view;
  }

  // Перевіряє сесію, збирає статистику і передає у View
  init() {
    const user = this.userModel.currentUser();
    if (!user) { alert("Спочатку увійди"); location.href = "index.html"; return; }

    $("#logoutBtn")?.addEventListener("click", () => this.userModel.logout());

    const prog     = this.progressModel.get(user.email);
    const known    = Object.keys(prog.known || {}).length;
    const total    = this.wordModel.allWordsCount();
    const qCorrect = prog.quiz?.correct ?? 0;
    const qTotal   = prog.quiz?.total   ?? 0;

    this.view.render(user, known, total, qCorrect, qTotal);
  }
}
