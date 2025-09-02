// fehrestOfSelectedBook is an array of objects that represent data of
// each season of the book.

// indent 0 haa chapter
// indent 1 haa article
// OL is articles container and has articles class
// OL is inside of li.chapter
// indent 0 haa chapter hastand

const fehrestListContainer = document.querySelector("#fehrestList");

function renderFehrest(fehrestOfSelectedBook) {
  fehrestListContainer.replaceChildren();

  const fragment = document.createDocumentFragment();
  let lastOL = null;

  fehrestOfSelectedBook.forEach(({ id, refTitle, refPage, indent }, index) => {
    const nextListItem = fehrestOfSelectedBook[index + 1];
    const isNewSection = indent === 0;
    const hasSubsection =
      nextListItem && indent >= 0 && indent === nextListItem.indent - 1;
    const isChapter = id.split("-").pop() === "0";
    const isArticle = id.split("-").pop() !== "0";

    const newA = document.createElement("div");
    newA.append(refTitle);
    newA.dataset.refPage = refPage;
    newA.dataset.id = id;
    isChapter ? newA.classList.add("chapter") : newA.classList.add("article");

    const newLI = document.createElement("li");
    newLI.append(newA);

    if (isNewSection && hasSubsection) {
      const newOL = document.createElement("ol");
      newOL.classList.add("articles");
      newLI.append(newOL);
      fragment.append(newLI);
      lastOL = newOL;
    } else if (isNewSection) {
      fragment.append(newLI);
    } else if (isArticle) {
      lastOL.append(newLI);
    }
  });

  fehrestListContainer.append(fragment);
}

export { renderFehrest };
