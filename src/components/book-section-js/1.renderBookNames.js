// bookNames is an array

function renderBookNames(bookNames) {
  const bookSelector = document.querySelector("#BookSelector");
  const fragment = document.createDocumentFragment();

  bookNames.forEach((bookName) => {
    const newBookOption = document.createElement("option");
    newBookOption.classList.add("book-option");
    newBookOption.value = bookName;
    newBookOption.textContent = bookName;
    fragment.appendChild(newBookOption);
  });

  bookSelector.appendChild(fragment);
}

export { renderBookNames };
