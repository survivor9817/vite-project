const bookSection = document.querySelector("#BookSection");
function generatePages(contentsOfSelectedBook) {
  bookSection.replaceChildren();
  const fragment = document.createDocumentFragment();

  contentsOfSelectedBook.forEach(({ id, content }) => {
    const newPage = document.createElement("section");
    newPage.classList.add("page");
    newPage.id = `page${id}`;
    const newP = document.createElement("div");
    // newP.append(content);
    newP.innerHTML = content;
    newPage.append(newP);

    fragment.append(newPage);
  });
  bookSection.append(fragment);
}

function addPageLabels() {
  const pages = document.querySelectorAll("#BookSection .page");
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  pages.forEach((page, index) => {
    const pageLabel = document.createElement("div");
    pageLabel.append(`صفحه ${persianNumberFormat.format(index + 1)}`);
    page.prepend(pageLabel);
  });
}

function renderContent(contentsOfSelectedBook) {
  generatePages(contentsOfSelectedBook);
  addPageLabels();
}

export { renderContent };
