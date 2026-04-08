// models/WordModel.js — словниковий каталог (A1/A2/B1, теми, слова)

export class WordModel {
  constructor() {
    // Структура: catalog[рівень][тема] = [{en, ua}, ...]
    this.catalog = {
      A1: {
        Everyday: [
          { en: "book", ua: "книга" }, { en: "sun", ua: "сонце" }, { en: "water", ua: "вода" },
          { en: "house", ua: "будинок" }, { en: "friend", ua: "друг" }, { en: "school", ua: "школа" },
          { en: "phone", ua: "телефон" }, { en: "time", ua: "час" }, { en: "day", ua: "день" },
          { en: "night", ua: "ніч" }, { en: "family", ua: "родина" }, { en: "city", ua: "місто" },
          { en: "street", ua: "вулиця" }, { en: "door", ua: "двері" }, { en: "window", ua: "вікно" },
          { en: "table", ua: "стіл" }, { en: "chair", ua: "стілець" }, { en: "pen", ua: "ручка" },
          { en: "bag", ua: "сумка" }, { en: "key", ua: "ключ" }, { en: "name", ua: "ім'я" },
          { en: "number", ua: "номер" }, { en: "music", ua: "музика" }, { en: "picture", ua: "картинка" }
        ],
        Food: [
          { en: "apple", ua: "яблуко" }, { en: "banana", ua: "банан" }, { en: "bread", ua: "хліб" },
          { en: "milk", ua: "молоко" }, { en: "cheese", ua: "сир" }, { en: "tea", ua: "чай" },
          { en: "coffee", ua: "кава" }, { en: "salt", ua: "сіль" }, { en: "sugar", ua: "цукор" },
          { en: "orange", ua: "апельсин" }, { en: "egg", ua: "яйце" }, { en: "meat", ua: "м'ясо" },
          { en: "fish", ua: "риба" }, { en: "rice", ua: "рис" }, { en: "soup", ua: "суп" },
          { en: "cake", ua: "торт" }, { en: "chocolate", ua: "шоколад" }, { en: "carrot", ua: "морква" }
        ],
        Travel: [
          { en: "ticket", ua: "квиток" }, { en: "train", ua: "поїзд" }, { en: "bus", ua: "автобус" },
          { en: "map", ua: "карта" }, { en: "hotel", ua: "готель" }, { en: "airport", ua: "аеропорт" },
          { en: "station", ua: "станція" }, { en: "passport", ua: "паспорт" }, { en: "luggage", ua: "багаж" },
          { en: "left", ua: "ліворуч" }, { en: "right", ua: "праворуч" }, { en: "near", ua: "поруч" },
          { en: "far", ua: "далеко" }, { en: "road", ua: "дорога" }, { en: "stop", ua: "зупинка" }
        ],
        Work: [
          { en: "job", ua: "робота" }, { en: "task", ua: "завдання" }, { en: "team", ua: "команда" },
          { en: "boss", ua: "керівник" }, { en: "office", ua: "офіс" }, { en: "meeting", ua: "зустріч" },
          { en: "plan", ua: "план" }, { en: "email", ua: "електронний лист" }, { en: "call", ua: "дзвінок" },
          { en: "break", ua: "перерва" }, { en: "today", ua: "сьогодні" }, { en: "tomorrow", ua: "завтра" }
        ]
      },
      A2: {
        Everyday: [
          { en: "weather", ua: "погода" }, { en: "message", ua: "повідомлення" }, { en: "weekend", ua: "вихідні" },
          { en: "decision", ua: "рішення" }, { en: "problem", ua: "проблема" }, { en: "idea", ua: "ідея" },
          { en: "choice", ua: "вибір" }, { en: "reason", ua: "причина" }, { en: "history", ua: "історія" },
          { en: "important", ua: "важливий" }, { en: "usually", ua: "зазвичай" }, { en: "sometimes", ua: "іноді" },
          { en: "quickly", ua: "швидко" }, { en: "comfortable", ua: "зручний" }, { en: "successful", ua: "успішний" }
        ],
        Food: [
          { en: "recipe", ua: "рецепт" }, { en: "breakfast", ua: "сніданок" }, { en: "delicious", ua: "смачний" },
          { en: "healthy", ua: "корисний" }, { en: "ingredients", ua: "інгредієнти" }, { en: "dessert", ua: "десерт" },
          { en: "spicy", ua: "гострий" }, { en: "sweet", ua: "солодкий" }, { en: "hungry", ua: "голодний" },
          { en: "thirsty", ua: "спраглий" }, { en: "menu", ua: "меню" }, { en: "order", ua: "замовляти" }
        ],
        Travel: [
          { en: "direction", ua: "напрямок" }, { en: "journey", ua: "подорож" }, { en: "reservation", ua: "бронювання" },
          { en: "tourist", ua: "турист" }, { en: "guide", ua: "гід" }, { en: "museum", ua: "музей" },
          { en: "bridge", ua: "міст" }, { en: "square", ua: "площа" }, { en: "crowded", ua: "людний" },
          { en: "safe", ua: "безпечний" }, { en: "dangerous", ua: "небезпечний" }
        ],
        Work: [
          { en: "project", ua: "проєкт" }, { en: "deadline", ua: "дедлайн" }, { en: "report", ua: "звіт" },
          { en: "result", ua: "результат" }, { en: "improve", ua: "покращувати" }, { en: "discuss", ua: "обговорювати" },
          { en: "agree", ua: "погоджуватися" }, { en: "explain", ua: "пояснювати" }, { en: "schedule", ua: "розклад" },
          { en: "experience", ua: "досвід" }, { en: "priority", ua: "пріоритет" }
        ]
      },
      B1: {
        Everyday: [
          { en: "relationship", ua: "стосунки" }, { en: "opportunity", ua: "можливість" }, { en: "confidence", ua: "впевненість" },
          { en: "challenge", ua: "виклик" }, { en: "achievement", ua: "досягнення" }, { en: "responsibility", ua: "відповідальність" },
          { en: "environment", ua: "середовище" }, { en: "influence", ua: "вплив" }, { en: "recommend", ua: "рекомендувати" },
          { en: "consider", ua: "розглядати" }, { en: "manage", ua: "керувати" }, { en: "nevertheless", ua: "проте" }
        ],
        Food: [
          { en: "nutrition", ua: "харчування" }, { en: "portion", ua: "порція" }, { en: "allergy", ua: "алергія" },
          { en: "balance", ua: "баланс" }, { en: "organic", ua: "органічний" }, { en: "freshness", ua: "свіжість" },
          { en: "texture", ua: "текстура" }, { en: "consume", ua: "споживати" }, { en: "preserve", ua: "зберігати" }
        ],
        Travel: [
          { en: "accommodation", ua: "житло" }, { en: "itinerary", ua: "маршрут" }, { en: "sightseeing", ua: "огляд визначних місць" },
          { en: "destination", ua: "пункт призначення" }, { en: "transportation", ua: "транспорт" }, { en: "unexpected", ua: "неочікуваний" },
          { en: "postpone", ua: "відкласти" }, { en: "cancel", ua: "скасувати" }, { en: "explore", ua: "досліджувати" }
        ],
        Work: [
          { en: "performance", ua: "ефективність" }, { en: "prioritize", ua: "розставляти пріоритети" }, { en: "collaboration", ua: "співпраця" },
          { en: "feedback", ua: "зворотний зв'язок" }, { en: "negotiate", ua: "домовлятися" }, { en: "estimate", ua: "оцінювати" },
          { en: "requirement", ua: "вимога" }, { en: "stakeholder", ua: "зацікавлена сторона" }, { en: "progress", ua: "прогрес" }
        ]
      }
    };
  }

  // Повертає список рівнів: ['A1', 'A2', 'B1']
  getLevels() {
    return Object.keys(this.catalog);
  }

  // Повертає теми для заданого рівня
  getTopics(level) {
    return Object.keys(this.catalog[level] ?? {});
  }

  // Повертає слова теми, додаючи унікальний id кожному слову
  getWords(level, topic) {
    return (this.catalog[level]?.[topic] ?? []).map(w => ({
      ...w,
      id: `${level}|${topic}|${w.en.toLowerCase()}`
    }));
  }

  // Загальна кількість слів у всьому каталозі
  allWordsCount() {
    let total = 0;
    for (const level of this.getLevels())
      for (const topic of this.getTopics(level))
        total += this.catalog[level][topic].length;
    return total;
  }
}
