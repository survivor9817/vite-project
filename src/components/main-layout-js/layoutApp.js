import { Layout } from "./Layout.js";

const fehrestBackdrop = document.querySelector(".fehrest-backdrop");
const menuBackdrop = document.querySelector(".menu-backdrop");
const fehrestBtn = document.querySelector("#FehrestBtn");
const menuBtn = document.querySelector("#MenuBtn");
const fehrestCloserBtn = document.querySelector("#FehrestCloserBtn");
const menuCloserBtn = document.querySelector("#MenuCloserBtn");
const bookTabBtn = document.querySelector("#BookTabBtn");
const exerciseTabBtn = document.querySelector("#ExerciseTabBtn");
const yavarTabBtn = document.querySelector("#YavarTabBtn");

const layout = new Layout();
layout.renderUI();

export const goToBook = () => {
  layout.goToBook();
};

// bindings
const bindings = [
  { el: exerciseTabBtn, handler: () => layout.goToExercise() },
  { el: bookTabBtn, handler: () => layout.goToBook() },
  { el: fehrestBtn, handler: () => layout.toggleFehrest() },
  { el: menuBtn, handler: () => layout.toggleMenu() },
  { el: yavarTabBtn, handler: () => layout.goToAI() },
  { el: fehrestCloserBtn, handler: () => layout.closeFehrest() },
  { el: fehrestBackdrop, handler: () => layout.closeFehrest() },
  { el: menuCloserBtn, handler: () => layout.closeMenu() },
  { el: menuBackdrop, handler: () => layout.closeMenu() },
];

bindings.forEach(({ el, handler }) => {
  if (el) el.addEventListener("click", handler);
});

window.addEventListener("popstate", () => {
  layout.onPopstate();
});

layout.state.mediaQuery.addEventListener("change", () => {
  if (layout.state.isFehrestOpen) {
    layout.state.mediaQuery.matches
      ? layout.ui.showFehrestBackdrop()
      : layout.ui.hideFehrestBackdrop();
  }
});
