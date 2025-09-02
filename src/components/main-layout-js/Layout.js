import { getLocalData } from "../utils/getLocalData.js";
import { LayoutUI } from "./LayoutUI.js";

export class Layout {
  constructor() {
    this.state = {
      activeTab: getLocalData("activeTab", 0), // tab index : 0, 1, 2
      isFehrestOpen: getLocalData("isFehrestOpen", false),
      isMenuOpen: getLocalData("isMenuOpen", false),
      wasFehrestOpened: getLocalData("wasFehrestOpened", false),

      mediaQuery: window.matchMedia("(max-width: 1440px)"),
    };

    this.ui = new LayoutUI();
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    if (this.state[key] === value) return;
    this.state[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
    this.renderUI();
  }

  saveFehrestState() {
    if (this.state.activeTab === 0) {
      this.set("wasFehrestOpened", this.state.isFehrestOpen);
    }
  }

  // sidebars
  toggleFehrest() {
    this.state.isFehrestOpen ? this.closeFehrest() : this.openFehrest();
  }

  toggleMenu() {
    this.state.isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  openFehrest() {
    this.set("isFehrestOpen", true);
    history.pushState({ isFehrestVisible: true }, "");
    if (this.state.activeTab !== 0) this.switchToTab(0);
  }

  openMenu() {
    this.set("isMenuOpen", true);
    history.pushState({ isMenuVisible: true }, "");
  }

  closeFehrest() {
    this.set("isFehrestOpen", false);
  }

  closeMenu() {
    this.set("isMenuOpen", false);
  }

  onPopstate() {
    if (this.state.isMenuOpen) {
      this.closeMenu();
    } else if (this.state.isFehrestOpen) {
      this.closeFehrest();
    }
  }

  // tabs
  switchToTab(index) {
    this.set("activeTab", index);
  }

  goToBook() {
    this.switchToTab(0);
    if (this.state.wasFehrestOpened) {
      this.toggleFehrest();
      this.set("wasFehrestOpened", false);
    }
  }

  goToExercise() {
    this.saveFehrestState();
    this.closeFehrest();
    this.switchToTab(1);
  }

  goToAI() {
    this.saveFehrestState();
    this.closeFehrest();
    this.switchToTab(2);
  }

  renderUI() {
    this.ui.switchToTab(this.state.activeTab);

    if (this.state.isFehrestOpen) {
      this.ui.showFehrest();
      this.state.mediaQuery.matches
        ? this.ui.showFehrestBackdrop()
        : this.ui.hideFehrestBackdrop();
    } else {
      this.ui.hideFehrest();
      this.ui.hideFehrestBackdrop();
    }

    if (this.state.isMenuOpen) {
      this.ui.showMenu();
      this.ui.showMenuBackdrop();
    } else {
      this.ui.hideMenu();
      this.ui.hideMenuBackdrop();
    }
  }
}
