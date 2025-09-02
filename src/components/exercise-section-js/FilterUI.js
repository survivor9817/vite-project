import { options } from "../data/filterOptionsData.js";

const startExerciseBtnContainer = document.querySelector(".btn-container");
const filtersContainer = document.querySelector(".exercise-filters");
const filterSelectors = document.querySelectorAll(".filter-criteria select");

const whereSelectEl = document.querySelector("#Where");
// const levelSelectEl = document.querySelector("#Level");
// const sourceSelectEl = document.querySelector("#Source");

export class FilterUI {
  constructor() {
    this.heightOfStep = ["112px", "200px", "286px", "306px"];
    this.selectedFilters = {};
  }

  getSelectedFilters() {
    return this.selectedFilters;
  }

  // in mitoone ye parameter dashte bashe be naame options data
  init() {
    this.renderOptions(whereSelectEl, options.Where);

    filterSelectors.forEach((filterSelector, index) => {
      filterSelector.addEventListener("input", () => {
        this.selectedFilters[filterSelector.name] = filterSelector.value;
        this.updateLabelPosition(filterSelector);

        const nextSelectEl = filterSelectors[index + 1];
        const nextSelectOptions = nextSelectEl && options[nextSelectEl.name];
        if (nextSelectEl) this.renderOptions(nextSelectEl, nextSelectOptions);

        this.stepsHandler(filterSelector);
      });
    });
  }

  reset() {
    this.hideStartBtn();

    this.selectedFilters = {};
    filterSelectors.forEach((filterSelector) => {
      filterSelector.value = "";
      this.updateLabelPosition(filterSelector);
    });

    filtersContainer.style.height = this.heightOfStep[0];

    filterSelectors[0].focus({
      preventScroll: true,
    });
  }

  renderOptions(selectEl, optionsArray) {
    const fragment = document.createDocumentFragment();

    optionsArray.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      fragment.appendChild(optionElement);
    });

    selectEl.appendChild(fragment);
  }

  updateLabelPosition(selectEl) {
    const label = selectEl.previousElementSibling;
    if (selectEl.value) {
      label.classList.add("up");
    } else {
      label.classList.remove("up");
    }
  }

  //  esme ino mitoni behtar koni
  stepsHandler(selectEl) {
    const stepNumber = parseInt(selectEl.dataset.step, 10);
    const nextSelectEl = filterSelectors[stepNumber];
    if (nextSelectEl && nextSelectEl.value === "") {
      filtersContainer.style.height = this.heightOfStep[stepNumber];
      nextSelectEl.focus({
        preventScroll: true,
      });
    } else if (stepNumber === 3) {
      filtersContainer.style.height = this.heightOfStep[stepNumber];
      this.showStartBtn();
      selectEl.blur();
    }
  }

  showStartBtn() {
    startExerciseBtnContainer.style.visibility = "visible";
    startExerciseBtnContainer.style.opacity = "1";
    startExerciseBtnContainer.style.transform = "translateY(-27px)";
  }

  hideStartBtn() {
    startExerciseBtnContainer.style.visibility = "none";
    startExerciseBtnContainer.style.opacity = "0";
    startExerciseBtnContainer.style.transform = "translateY(0px)";
  }
}
