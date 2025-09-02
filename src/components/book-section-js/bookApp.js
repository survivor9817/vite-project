import { booksData } from "../data/booksData.js";
import { renderBookNames } from "./1.renderBookNames.js";
import { bindings } from "./5.pageNavi.js";
import { Book } from "./6.book.js";

const bookNames = Object.keys(booksData);
renderBookNames(bookNames);

const bookSelectorEl = document.querySelector("#BookSelector");
const lastBookRead = localStorage.getItem("lastBookRead");
const name = lastBookRead || bookSelectorEl.value;
const data = booksData[name];
export let book = new Book(name, data);
book.render();
book.bindings();

bookSelectorEl.addEventListener("input", () => {
  const name = bookSelectorEl.value;
  const data = booksData[name];
  book = new Book(name, data);
  book.render();
});
