import { toFaNums } from "../utils/toFaNums.js";
import { FeedbackUI } from "./FeedbackUI.js";

const exerciseTabContainer = document.querySelector("#ExerciseTabContainer");
const filtersContainer = document.querySelector(".exercise-filters");
const exercisesContainer = document.querySelector("#ExercisesContainer");

const progressBarEl = document.querySelector(".progress-bar");

const indexEl = document.querySelector(".exercise-number");
const tagsEl = document.querySelector(".tags-list");
const questionEl = document.querySelector(".question-container");
const authorEl = document.querySelector("#AuthorFullName");
const detailsEl = document.querySelector(".exercise-details");
const answerEl = document.querySelector(".descriptive-answer");
const refsEl = document.querySelector(".ref-list");

export class ExerciseUI extends FeedbackUI {
  showQuestionsView() {
    filtersContainer.parentElement.style.display = "none";
    exercisesContainer.style.display = "flex";
  }

  showFiltersView() {
    exercisesContainer.style.display = "none";
    filtersContainer.parentElement.style.display = "flex";
    this.hideAnswer();
    progressBarEl.style.width = `0%`;
  }

  toggleAnswer() {
    exerciseTabContainer.classList.toggle("open");
  }

  hideAnswer() {
    exerciseTabContainer.classList.remove("open");
  }

  renderTags(tags) {
    const tagsHTML = tags.map((tag) => `<li class="tag">${tag}</li>`).join("");
    tagsEl.innerHTML = tagsHTML;
  }

  renderRefPageList(bookName, refs) {
    const refPagesHTML = Object.entries(refs)
      .map(
        ([refPage, { start, end }]) =>
          `<li class="ref-page" data-ref-page="${refPage}">${refPage}</li>`
      )
      .join("");

    const refBookItemHTML = `
    <li class="ref-book horizontally-scrollable">
      <span class="book">${bookName}</span>
      <ul class="pages horizontally-scrollable">
        ${refPagesHTML}
      </ul>
    </li>
  `;

    refsEl.innerHTML = refBookItemHTML;
  }

  renderExerciseInfo(index = 0, questionsCount, questionData, feedbackObj) {
    if (!questionData) return;

    const currentIndex = toFaNums(index + 1);
    const total = toFaNums(questionsCount);
    indexEl.textContent = `تمرین شماره ${currentIndex} از ${total}`;

    const {
      id,
      bookName,
      question,
      answerKey,
      descriptiveAnswer,
      author,
      source,
      date,
      score,
      tags,
      refs,
    } = questionData;

    this.renderTags(tags);
    questionEl.innerHTML = question;
    detailsEl.textContent = `${source} - ${date} - ${toFaNums(score)} نمره`;
    setTimeout(() => {
      authorEl.textContent = author;
      this.updateBtns(feedbackObj);
      answerEl.innerHTML = descriptiveAnswer;
      this.renderRefPageList(bookName, refs);
    }, 600);
  }

  updateProgressBar(currentIndex, questionsCount) {
    const width = (100 / questionsCount) * (currentIndex + 1);
    setTimeout(() => {
      progressBarEl.style.width = `${width}%`;
    }, 10);
  }
}
