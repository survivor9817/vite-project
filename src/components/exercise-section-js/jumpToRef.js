import { goToBook } from "../main-layout-js/layoutApp.js";
import { book } from "../book-section-js/bookApp.js";

// badan bayad ba event delegation anjaamesh bedi. in movaghate
const exerciseTabContainer = document.querySelector("#ExerciseTabContainer");

exerciseTabContainer.addEventListener("click", (e) => {
  const refItem = e.target.closest(".ref-page");
  if (refItem) {
    goToBook();
    const pageNumber = parseInt(refItem.dataset.refPage, 10);
    book.goToPage(pageNumber);
    // highlightRef(refId);
  }
});
