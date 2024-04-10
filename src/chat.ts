import { CrispClass as Crisp } from "./index";

export default class CrispChat {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  show() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:show"]);
  }

  hide() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:hide"]);
  }

  open() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:open"]);
  }

  close() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["do", "chat:close"]);
    }
  }

  setHelpdeskView() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "helpdesk:search"]);
  }

  openHelpdeskArticle(
    locale: string,
    slug: string,
    title?: string,
    category?: string
  ) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "helpdesk:article:open", [
      locale,
      slug,
      title,
      category
    ]]);
  }

  queryHelpdesk(query: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "helpdesk:query", [query]]);
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

    this.offChatInitiated();

    window.$crisp.push(["on", "chat:initiated", callback]);
  }

  offChatInitiated() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:initiated"]);
  }

  onChatOpened(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    this.offChatOpened();

    window.$crisp.push(["on", "chat:opened", callback]);
  }

  offChatOpened() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:opened"]);
  }

  onChatClosed(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    this.offChatClosed();

    window.$crisp.push(["on", "chat:closed", callback]);
  }

  offChatClosed() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:closed"]);
  }

  onHelpdeskQueried(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offHelpdeskQueried();

    window.$crisp.push(["on", "helpdesk:queried", callback]);
  }

  offHelpdeskQueried() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "helpdesk:queried"]);
  }
}
