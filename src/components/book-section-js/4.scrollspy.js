import { book } from "./bookApp.js";

const fehrestList = document.querySelector(".fehrest-list");

export class ScrollSpy {
  constructor(fehrestPages) {
    this.fehrestArr = fehrestPages;
    this.fehrestPages = fehrestPages.map((item) => item.refPage);

    this.lastRefPage = null;
    this.lastActives = [];
    this.lastExpandeds = [];

    this.observer = null;
    this.observerOptions = {
      root: document.querySelector(".book-section"),
      rootMargin: "-49% 0% -49% 0%",
      threshold: 0,
    };
  }

  toggle(el, className) {
    el?.classList.toggle(className);
  }

  findRefTitlePageNumber(pageNumber) {
    if (this.fehrestPages.includes(pageNumber)) return pageNumber;
    return Math.max(...this.fehrestPages.filter((page) => page < pageNumber));
  }

  updateFehrestUI(observingPageNumber) {
    const refPage = this.findRefTitlePageNumber(observingPageNumber);

    if (refPage === this.lastRefPage) return;
    this.lastRefPage = refPage;

    this.lastActives.forEach((LI) => this.toggle(LI, "active"));
    this.lastExpandeds.forEach((OL) => this.toggle(OL, "expanded"));

    const LI = fehrestList.querySelector(`div[data-ref-page="${refPage}"]`);
    const siblingOL = LI.nextElementSibling;
    const parentOL = LI.closest("ol.articles");
    const higherLI = parentOL?.previousElementSibling;

    this.lastActives = [LI, higherLI];
    this.lastExpandeds = [parentOL, siblingOL];

    this.toggle(LI, "active");
    if (siblingOL) {
      this.toggle(siblingOL, "expanded");
    } else {
      this.toggle(parentOL, "expanded");
      this.toggle(higherLI, "active");
    }
  }

  observerCallback(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const observedPageNumber = +entry.target.id.replace("page", "");
      book.updateObservingPageNumber(observedPageNumber);
      this.updateFehrestUI(book.observingPageNumber);
    });
  }

  observePages() {
    if (this.observer) this.observer.disconnect();

    this.lastRefPage = null;

    this.observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      this.observerOptions
    );

    const pages = document.querySelectorAll(".book-section .page");
    pages.forEach((page) => this.observer.observe(page));
  }
}
