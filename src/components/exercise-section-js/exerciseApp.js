import { Exercise } from "./Exercise.js";
import { exerciseData } from "../data/exerciseData.js";
import { book } from "../book-section-js/bookApp.js";
import { FilterUI } from "./FilterUI.js";

// # 1 - add filter options to filter select elements and
// # 2 - The logic behind how filters are displayed
const filterUI = new FilterUI();
filterUI.init();

const bookSelectorEl = document.getElementById("BookSelector");
bookSelectorEl.addEventListener("input", () => {
  filterUI.reset();
});

// # 3 - how start exercise button works
let filters = {};
let questionsData = exerciseData;
let exercise = null;

const startFilterForm = document.querySelector(".filter-section");
startFilterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // const formData = new FormData(startFilterForm);
  // filters = {
  //   where: formData.get("Where"),
  //   level: formData.get("Level"),
  //   source: formData.get("Source"),
  // };
  const bookName = book.name;
  filters = filterUI.getSelectedFilters();
  exercise = new Exercise(bookName, filters, questionsData);
  exercise.ui.showQuestionsView();
  exercise.goToQuestion(0);
});

// # 4 - what next btn does
const nextExerciseBtn = document.querySelector(".btn--exercise-next");
nextExerciseBtn.addEventListener("click", () => {
  if (exercise.observingQuestionIndex === exercise.questionsCount - 1) {
    filterUI.reset();
    exercise.endSession();
  } else {
    exercise.goToNextQuestion();
  }
});

// # 5 - what previous btn does
const prevExerciseBtn = document.querySelector(".btn--exercise-prev");
prevExerciseBtn.addEventListener("click", () => {
  exercise.goToPrevQuestion();
});

// # 6 - reset view of tags when unhover their container. necessary for mobile.
const tagsContainer = document.querySelector(".tags-container");
tagsContainer.addEventListener("mouseleave", () => {
  tagsContainer.scrollLeft = 0;
});

// # 7 - show or hide the answer
const showAnswerBtn = document.querySelector("#ShowAnswerBtn");
showAnswerBtn.addEventListener("click", () => {
  exercise.ui.toggleAnswer();
});

// # 8 - input buttons behavior MOOOOOOOOOOOOVE TO addQ
const feedbackBtnsContainer = document.querySelector(".exercise-feedback-btns");
feedbackBtnsContainer.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest("button");
  if (!clickedBtn) return;
  exercise.handleFeedbackChanges(clickedBtn);
});

// # 9 -
