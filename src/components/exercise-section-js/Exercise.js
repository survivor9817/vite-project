import { Feedback } from "./Feedback.js";
import { ExerciseUI } from "./ExerciseUI.js";

// make it question
export class Exercise {
  constructor(bookName, filters, questionsArr) {
    this.sessionId = this.generateSessionId();
    this.startTime = new Date();
    this.endTime = null;
    this.status = "in-progress";

    this.bookName = bookName;
    this.filters = filters;
    this.questions = questionsArr || [];
    this.observingQuestionIndex = 0;
    this.observingQuestionID = questionsArr[this.observingQuestionIndex].id;
    this.questionsCount = this.questions ? this.questions.length : 0;
    this.feedbackResults = {};
    this.questionIDs = this.questions.map(({ id }) => id) || [];
  }

  ui = new ExerciseUI();

  generateSessionId() {
    return "sess_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  }

  goToQuestion(indexNumber) {
    if (indexNumber < 0 || indexNumber >= this.questionsCount) return;

    const indexBefore = this.observingQuestionIndex;
    this.observingQuestionIndex = indexNumber;
    const indexAfter = this.observingQuestionIndex;

    this.observingQuestionID = this.questions[this.observingQuestionIndex].id;

    const index = this.observingQuestionIndex;
    const totalNumber = this.questionsCount;
    const data = this.questions[index];
    const feedbackObj = this.getCurrentFeedback();
    this.ui.updateProgressBar(index, totalNumber);
    this.ui.renderExerciseInfo(index, totalNumber, data, feedbackObj);

    if (indexAfter !== indexBefore) this.ui.hideAnswer();

    this.ui.hideMsg(this.ui.prevMsg);
  }

  goToNextQuestion() {
    const highestIndex = this.questionsCount - 1;
    const lastIndex = this.observingQuestionIndex;
    const nextIndex = Math.min(highestIndex, lastIndex + 1);
    if (lastIndex === highestIndex && nextIndex === highestIndex) return;
    this.goToQuestion(nextIndex);
  }

  goToPrevQuestion() {
    const lastIndex = this.observingQuestionIndex;
    const prevIndex = Math.max(0, this.observingQuestionIndex - 1);
    if (lastIndex === 0 && prevIndex === 0) return;
    this.goToQuestion(prevIndex);
  }

  saveFeedback(questionId, feedbackObj) {
    this.feedbackResults[questionId] = feedbackObj;
  }

  getFeedback(questionId) {
    return this.feedbackResults[questionId] || new Feedback(); // toosh bezarim behtare
  }

  getCurrentFeedback() {
    const qID = this.observingQuestionID;
    return this.getFeedback(qID);
  }

  // calls on click on each feedback btn
  handleFeedbackChanges(clickedBtn) {
    const feedbackObj = this.getCurrentFeedback();
    feedbackObj.updateFeedbackObj(clickedBtn);
    this.saveFeedback(this.observingQuestionID, feedbackObj);

    this.ui.showRelatedMsg(clickedBtn); // first
    this.ui.updateBtns(feedbackObj); // second
  }

  getDuration() {
    const durationInMs = Math.abs(this.endTime - this.startTime);
    const durationInMinutes = Math.floor(durationInMs / (1000 * 60));
    return durationInMinutes;
  }

  // init() {}

  endSession() {
    this.endTime = new Date();
    this.status = "completed";
    this.ui.showFiltersView();
    console.log(this);
    console.log(this.getDuration());
  }
}
