// app.js — точка входу. Визначає яка сторінка відкрита і запускає потрібний Controller.
// Підключення у HTML: <script type="module" src="src/app.js"></script>

import { UserModel }          from "./models/UserModel.js";
import { WordModel }           from "./models/WordModel.js";
import { ProgressModel }       from "./models/ProgressModel.js";

import { AuthView }            from "./views/AuthView.js";
import { StudyView }           from "./views/StudyView.js";
import { QuizView }            from "./views/QuizView.js";
import { ProfileView }         from "./views/ProfileView.js";

import { AuthController }      from "./controllers/AuthController.js";
import { StudyController }     from "./controllers/StudyController.js";
import { QuizController }      from "./controllers/QuizController.js";
import { ProfileController }   from "./controllers/ProfileController.js";

import { $ }                   from "./helpers.js";

// Моделі створюються один раз і передаються у потрібні контролери
const userModel     = new UserModel();
const wordModel     = new WordModel();
const progressModel = new ProgressModel();

// index.html — авторизація
if ($("#showLoginBtn")) {
  new AuthController(userModel, new AuthView()).init();
}

// app.html — вивчення + вікторина
else if ($("#levelSelect")) {
  const quizCtrl  = new QuizController(wordModel, progressModel, new QuizView());
  const studyCtrl = new StudyController(userModel, wordModel, progressModel, new StudyView(), quizCtrl);
  // QuizController потребує доступу до StudyController (поточні слова, стан, юзер)
  quizCtrl.setStudyController(studyCtrl);
  studyCtrl.init();
  quizCtrl.init();
}

// profile.html — профіль
else if ($("#kKnown")) {
  new ProfileController(userModel, wordModel, progressModel, new ProfileView()).init();
}
