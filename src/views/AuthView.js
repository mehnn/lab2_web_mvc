// views/AuthView.js — форми входу та реєстрації (index.html)

import { $ } from "../helpers.js";

export class AuthView {
  constructor() {
    // Блоки форм і кнопки перемикання
    this.loginBox     = $("#loginBox");
    this.registerBox  = $("#registerBox");
    this.showLoginBtn = $("#showLoginBtn");
    this.showRegBtn   = $("#showRegisterBtn");
    this.loginForm    = $("#loginForm");
    this.regForm      = $("#regForm");
  }

  // Перемикає видимість між формою входу і реєстрації
  setMode(mode) {
    const isLogin = mode === "login";
    this.loginBox.classList.toggle("d-none", !isLogin);
    this.registerBox.classList.toggle("d-none", isLogin);
    this.showLoginBtn.classList.toggle("btn-brand", isLogin);
    this.showLoginBtn.classList.toggle("btn-soft",  !isLogin);
    this.showRegBtn.classList.toggle("btn-brand",   !isLogin);
    this.showRegBtn.classList.toggle("btn-soft",    isLogin);
  }

  // Зчитує дані з форми входу
  getLoginData() {
    return {
      email:    $("#loginEmail").value.trim().toLowerCase(),
      password: $("#loginPass").value
    };
  }

  // Зчитує дані з форми реєстрації
  getRegisterData() {
    return {
      name:     $("#regName").value.trim(),
      email:    $("#regEmail").value.trim().toLowerCase(),
      gender:   $("input[name=gender]:checked")?.value ?? "",
      dob:      $("#regDob").value,
      password: $("#regPass").value
    };
  }

  showError(msg) { alert("❌ " + msg); }
}
