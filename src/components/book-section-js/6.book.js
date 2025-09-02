import { toFaNums } from "../utils/toFaNums.js";
import { renderFehrest } from "./2.renderFehrest.js";
import { renderContent } from "./3.renderContent.js";
import { ScrollSpy } from "./4.scrollspy.js";
import { convertToEnglishDigits } from "../utils/convertToEnglishDigits.js";

const fehrestContainer = document.querySelector("#fehrestList");

const bookSelectorEl = document.querySelector("#BookSelector");
const pageInputNumberEl = document.querySelector("#PageInputNumber");
const pageInputRangeEl = document.querySelector("#PageInputRange");

const PrevPageBtn = document.querySelector("#PrevPageBtn");
const NextPageBtn = document.querySelector("#NextPageBtn");

export class Book {
  constructor(selectedBookName, { fehrest, content, maxPageNumber }) {
    this.name = selectedBookName;
    this.fehrestArr = fehrest;
    // this.fehrestPages = this.fehrestArr.map((item) => item.refPage);
    this.contentArr = content;
    this.maxPageNumber = maxPageNumber;

    this.observingPageNumber = 1;

    this.scrollSpy = new ScrollSpy(fehrest);
  }

  render() {
    localStorage.setItem("lastBookRead", this.name);
    bookSelectorEl.value = this.name;
    renderFehrest(this.fehrestArr);
    renderContent(this.contentArr);
    pageInputNumberEl.max = this.maxPageNumber;
    pageInputRangeEl.max = this.maxPageNumber;
    this.scrollSpy.observePages();
    this.goToPage(localStorage.getItem(this.name) || 1);
  }

  updateObservingPageNumber(newPageNumber) {
    if (!newPageNumber || isNaN(newPageNumber)) return;
    localStorage.setItem(this.name, newPageNumber);
    this.observingPageNumber = +newPageNumber;
    this.updatePageNumberUI(+newPageNumber);
  }

  updatePageNumberUI(newPageNumber) {
    pageInputNumberEl.value = toFaNums(newPageNumber);
    pageInputRangeEl.value = newPageNumber;
  }

  // ---- Navigation methods ----
  goToPage(number) {
    if (!number || isNaN(number)) return;
    this.updateObservingPageNumber(+number);
    const targetPage = document.querySelector(`#page${number}`);
    if (targetPage) targetPage.scrollIntoView();
  }

  goToPrevPage() {
    const newPage = Math.max(1, +this.observingPageNumber - 1);
    this.goToPage(newPage);
  }

  goToNextPage() {
    const maxPage = this.maxPageNumber || 999;
    const newPage = Math.min(+maxPage, +this.observingPageNumber + 1);
    this.goToPage(newPage);
  }

  // bindings and activate btns of book.
  handlePageNumberInput() {
    const value = +convertToEnglishDigits(pageInputNumberEl.value);
    const max = +this.maxPageNumber;
    if (value > max || isNaN(value)) {
      pageInputNumberEl.value = pageInputNumberEl.value.slice(0, -1);
      pageInputNumberEl.style.backgroundColor = "rgb(255, 124, 124)";
      setTimeout(() => {
        pageInputNumberEl.style.backgroundColor = "white";
      }, 300);
    } else {
      this.goToPage(value);
    }
  }

  bindings() {
    PrevPageBtn.addEventListener("click", () => this.goToPrevPage());
    NextPageBtn.addEventListener("click", () => this.goToNextPage());

    pageInputRangeEl.addEventListener("input", () => {
      this.goToPage(+pageInputRangeEl.value);
    });

    pageInputNumberEl.addEventListener("input", () => {
      this.handlePageNumberInput();
    });

    fehrestContainer.addEventListener("click", (event) => {
      const item = event.target.closest("#fehrestList li div");
      if (item) this.goToPage(+item.dataset.refPage);
    });

    let observingPageNumberOnFocus = this.observingPageNumber;
    pageInputNumberEl.addEventListener("focus", () => {
      observingPageNumberOnFocus = this.observingPageNumber;
      pageInputNumberEl.select();
    });

    pageInputNumberEl.addEventListener("blur", () => {
      const value = pageInputNumberEl.value.trim();
      if (value === "") {
        this.goToPage(observingPageNumberOnFocus);
      }
    });
  }
}
