import { book } from "./bookApp.js";
import { convertToEnglishDigits } from "../utils/convertToEnglishDigits.js";

const fehrestContainer = document.querySelector("#fehrestList");
const pageInputNumberEl = document.querySelector("#PageInputNumber");
const pageInputRangeEl = document.querySelector("#PageInputRange");
const PrevPageBtn = document.querySelector("#PrevPageBtn");
const NextPageBtn = document.querySelector("#NextPageBtn");

function handlePageNumberInput() {
  const value = +convertToEnglishDigits(pageInputNumberEl.value);
  const max = +book.maxPageNumber;
  if (value > max || isNaN(value)) {
    pageInputNumberEl.value = pageInputNumberEl.value.slice(0, -1);
    pageInputNumberEl.style.backgroundColor = "rgb(255, 124, 124)";
    setTimeout(() => {
      pageInputNumberEl.style.backgroundColor = "white";
    }, 300);
  } else {
    book.goToPage(value);
  }
}

function bindings() {
  PrevPageBtn.addEventListener("click", () => book.goToPrevPage());

  NextPageBtn.addEventListener("click", () => book.goToNextPage());

  pageInputRangeEl.addEventListener("input", () => {
    book.goToPage(pageInputRangeEl.value);
  });

  pageInputNumberEl.addEventListener("input", () => {
    handlePageNumberInput();
  });

  fehrestContainer.addEventListener("click", (event) => {
    const item = event.target.closest("#fehrestList li");
    if (item) book.goToPage(+item.dataset.refPage);
  });

  let observingPageNumberOnFocus = book.observingPageNumber;
  pageInputNumberEl.addEventListener("focus", () => {
    observingPageNumberOnFocus = book.observingPageNumber;
    pageInputNumberEl.select();
  });

  pageInputNumberEl.addEventListener("blur", () => {
    if (pageInputNumberEl.value === "") {
      book.goToPage(observingPageNumberOnFocus);
    }
  });
}

export { bindings };
