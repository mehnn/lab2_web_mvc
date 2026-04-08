// controllers/AuthController.js — керує входом і реєстрацією (index.html)

export class AuthController {
  constructor(userModel, view) {
    this.model = userModel;
    this.view  = view;
  }

  // Ініціалізація: якщо сесія активна — одразу редірект в додаток
  init() {
    if (this.model.currentUser()) {
      location.href = "app.html";
      return;
    }
    this.view.setMode("login");
    this.view.showLoginBtn.addEventListener("click", () => this.view.setMode("login"));
    this.view.showRegBtn.addEventListener("click",   () => this.view.setMode("register"));
    this.view.loginForm?.addEventListener("submit",  (e) => this._onLogin(e));
    this.view.regForm?.addEventListener("submit",    (e) => this._onRegister(e));
  }

  // Обробник форми входу
  _onLogin(e) {
    e.preventDefault();
    try {
      this.model.login(this.view.getLoginData());
      location.href = "app.html";
    } catch (err) {
      this.view.showError(err.message);
    }
  }

  // Обробник форми реєстрації — після успіху автоматично входить
  _onRegister(e) {
    e.preventDefault();
    try {
      const data = this.view.getRegisterData();
      this.model.register(data);
      this.model.login({ email: data.email, password: data.password });
      location.href = "app.html";
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}
