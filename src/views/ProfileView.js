// views/ProfileView.js — сторінка профілю з даними та статистикою (profile.html)

import { $ } from "../helpers.js";

export class ProfileView {

  // Заповнює DOM даними користувача і його прогресом
  render(user, known, total, quizCorrect, quizTotal) {
    const pct = total     ? Math.round((known       / total)     * 100) : 0;
    const acc = quizTotal ? Math.round((quizCorrect / quizTotal) * 100) : 0;

    // Персональні дані
    if ($("#pName"))   $("#pName").textContent   = user.name   || "-";
    if ($("#pEmail"))  $("#pEmail").textContent  = user.email  || "-";
    if ($("#pGender")) $("#pGender").textContent = user.gender || "-";
    if ($("#pDob"))    $("#pDob").textContent    = user.dob    || "-";

    // KPI-картки
    if ($("#kKnown")) $("#kKnown").textContent = String(known);
    if ($("#kTotal")) $("#kTotal").textContent = String(total);
    if ($("#kPct"))   $("#kPct").textContent   = String(pct);
    if ($("#kAcc"))   $("#kAcc").textContent   = String(acc);
    if ($("#kQuiz"))  $("#kQuiz").textContent  = `${quizCorrect}/${quizTotal}`;

    // Прогрес-бар по всій базі слів
    const bar = $("#progressBarAll");
    if (bar) bar.style.width = `${pct}%`;
  }
}
