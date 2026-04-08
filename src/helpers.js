// helpers.js — загальні утиліти для всього додатку

// Скорочення для document.querySelector
export const $ = (sel) => document.querySelector(sel);

// Безпечне читання JSON з localStorage
export function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

// Запис JSON у localStorage
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Перемішування масиву алгоритмом Фішера-Єйтса
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Екранування HTML-символів для безпечної вставки в DOM
export function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
