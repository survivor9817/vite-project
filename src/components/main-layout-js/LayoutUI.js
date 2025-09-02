const fehrestSidebar = document.querySelector(".sidebar-right");
const menuSidebar = document.querySelector(".sidebar-left");
const fehrestBackdrop = document.querySelector(".fehrest-backdrop");
const menuBackdrop = document.querySelector(".menu-backdrop");

const activeTabIndicator = document.querySelector("#ActiveTabIndicator");
const tabsContainer = document.querySelector("#TabsContainer");
const tabsCount = tabsContainer.children.length;

export class LayoutUI {
  showFehrest() {
    fehrestSidebar.classList.add("opened-sidebar");
  }

  hideFehrest() {
    fehrestSidebar.classList.remove("opened-sidebar");
  }

  showMenu() {
    menuSidebar.classList.add("opened-sidebar");
  }

  hideMenu() {
    menuSidebar.classList.remove("opened-sidebar");
  }

  showFehrestBackdrop() {
    fehrestBackdrop.classList.add("backdrop-visible");
  }

  hideFehrestBackdrop() {
    fehrestBackdrop.classList.remove("backdrop-visible");
  }

  showMenuBackdrop() {
    menuBackdrop.classList.add("backdrop-visible");
  }

  hideMenuBackdrop() {
    menuBackdrop.classList.remove("backdrop-visible");
  }

  switchToTab(index) {
    tabsContainer.style.transform = `translateX(${index * (100 / tabsCount)}%)`;
    activeTabIndicator.style.transform = `translateX(${index * -100}%)`;
  }
}
