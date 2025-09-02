export class Feedback {
  constructor(feedbackObj = {}) {
    const { correct, incorrect, like, star, report } = feedbackObj;
    this.correct = correct || false;
    this.incorrect = incorrect || false;
    this.like = like || false;
    this.star = star || false;
    this.report = report || false;
  }

  updateFeedbackObj(clickedBtn) {
    const name = clickedBtn.name;
    if (name === "correct") {
      this.markCorrect();
    } else if (name === "incorrect") {
      this.markIncorrect();
    } else {
      this.toggle(name);
    }
  }

  toggle(feedbackName) {
    this[feedbackName] = !this[feedbackName];
  }

  markCorrect() {
    this.correct = !this.correct;
    this.incorrect = false;
  }

  markIncorrect() {
    this.incorrect = !this.incorrect;
    this.correct = false;
  }
}
