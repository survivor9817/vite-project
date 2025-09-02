// feedback UI
const feedbackBtns = {
  correct: document.querySelector(`button[name*="correct"]`),
  incorrect: document.querySelector(`button[name*="incorrect"]`),
  like: document.querySelector(`button[name*="like"]`),
  star: document.querySelector(`button[name*="star"]`),
  report: document.querySelector(`button[name*="report"]`),
};

const feedbackMsgs = {
  correct: document.querySelector(".feedback-msg--correct"),
  incorrect: document.querySelector(".feedback-msg--incorrect"),
  like: document.querySelector(".feedback-msg--like"),
  star: document.querySelector(".feedback-msg--star"),
  report: document.querySelector(".feedback-msg--report"),
};

export class FeedbackUI {
  constructor() {
    this.prevMsg = null;
    this.prevMsgTimeoutID = null;
  }

  updateBtns(feedbackObj) {
    Object.keys(feedbackObj).forEach((key) => {
      const btn = feedbackBtns[key];
      if (btn) {
        if (feedbackObj[key]) {
          this.fillBtn(btn);
        } else {
          this.emptyBtn(btn);
        }
      }
    });
  }

  showRelatedMsg(clickedBtn) {
    const feedbackMsg = feedbackMsgs[clickedBtn.name];

    const isOn = clickedBtn.classList.contains("filled");
    if (!isOn) {
      this.hideMsg(this.prevMsg);
      this.showMsg(feedbackMsg);
      this.prevMsgTimeoutID = setTimeout(() => {
        this.hideMsg(feedbackMsg);
      }, 1500);
    } else if (isOn && this.prevMsg === feedbackMsg) {
      this.hideMsg(feedbackMsg);
    }

    this.prevMsg = feedbackMsg;
  }

  fillBtn(feedbackBtnEl) {
    feedbackBtnEl.classList.add("filled");
  }

  emptyBtn(feedbackBtnEl) {
    feedbackBtnEl.classList.remove("filled");
  }

  hideMsg(feedbackMsgEl) {
    feedbackMsgEl?.classList.remove("feedback-msg-pop-in");
    if (this.prevMsgTimeoutID) clearTimeout(this.prevMsgTimeoutID);
  }

  showMsg(feedbackMsgEl) {
    feedbackMsgEl?.classList.add("feedback-msg-pop-in");
  }
}
