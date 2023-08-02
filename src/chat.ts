import { CrispClass as Crisp } from "./index";

export default class CrispChat {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  show() {
    this.parent.autoInjectIfNecessasy();

    window.$crisp.push(["do", "chat:show"]);
  }

  hide() {
    this.parent.autoInjectIfNecessasy();

    window.$crisp.push(["do", "chat:hide"]);
  }

  open() {
    this.parent.autoInjectIfNecessasy();

    window.$crisp.push(["do", "chat:open"]);
  }

  close() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["do", "chat:close"]);
    }
  }

  unreadCount(): number {
    if (!this.parent.isCrispInjected()) {
      return 0;
    }

    return window.$crisp.get("chat:unread:count");
  }

  isChatOpened(): boolean {
    if (!this.parent.isCrispInjected()) {
      return false;
    }

    return window.$crisp.is("chat:opened");
  }

  isVisible(): boolean {
    if (!this.parent.isCrispInjected()) {
      return false;
    }

    return window.$crisp.is("chat:visible");
  }

  onChatInitiated(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:initiated"]);
    window.$crisp.push(["on", "chat:initiated", callback]);
  }

  onChatOpened(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:opened"]);
    window.$crisp.push(["on", "chat:opened", callback]);
  }

  onChatClosed(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:closed"]);
    window.$crisp.push(["on", "chat:closed", callback]);
  }
}
