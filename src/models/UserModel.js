// models/UserModel.js — робота з користувачами: реєстрація, вхід, сесія

import { load, save } from "../helpers.js";

export class UserModel {

  // Зберігає нового користувача в масиві users у localStorage
  register({ name, email, gender, dob, password }) {
    const users = load("users", []);
    if (!name || !email || !password) throw new Error("Заповни ім'я, email та пароль");
    if (users.some(u => u.email === email)) throw new Error("Користувач з таким email вже існує");
    users.push({ name, email, gender, dob, password });
    save("users", users);
  }

  // Перевіряє email/пароль і записує сесію
  login({ email, password }) {
    const users = load("users", []);
    const u = users.find(x => x.email === email && x.password === password);
    if (!u) throw new Error("Невірний email або пароль");
    save("session", { email: u.email });
  }

  // Видаляє сесію та повертає на головну сторінку
  logout() {
    localStorage.removeItem("session");
    location.href = "index.html";
  }

  // Повертає об'єкт поточного користувача або null
  currentUser() {
    const sess = load("session", null);
    if (!sess) return null;
    const users = load("users", []);
    return users.find(u => u.email === sess.email) ?? null;
  }
}
