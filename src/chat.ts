/*
 * This file is part of crisp-sdk-web
 *
 * Copyright (c) 2025 Crisp IM SAS
 * All rights belong to Crisp IM SAS
 */

/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// PROJECT: MAIN
import { CrispClass as Crisp } from "./index";

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Crisp chat management
 */
export default class CrispChat {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Shows the chat widget
   */
  show() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:show"]);
  }

  /**
   * Hides the chat widget
   */
  hide() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:hide"]);
  }

  /**
   * Opens the chat widget
   */
  open() {
    this.parent.autoInjectIfNecessary();

    window.$crisp.push(["do", "chat:open"]);
  }

  /**
   * Closes the chat widget
   */
  close() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["do", "chat:close"]);
    }
  }

  /**
   * Sets an overlay view with a custom callback
   */
  setOverlayView(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "overlay:open", [callback]]);
  }

  /**
   * Sets the helpdesk view
   */
  setHelpdeskView() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "helpdesk:search"]);
  }

  /**
   * Opens a helpdesk article
   */
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

  /**
   * Queries the helpdesk
   */
  queryHelpdesk(query: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "helpdesk:query", [query]]);
  }

  /**
   * Gets the unread message count
   */
  unreadCount(): number {
    if (!this.parent.isCrispInjected()) {
      return 0;
    }

    return window.$crisp.get("chat:unread:count");
  }

  /**
   * Checks if the chat is opened
   */
  isChatOpened(): boolean {
    if (!this.parent.isCrispInjected()) {
      return false;
    }

    return window.$crisp.is("chat:opened");
  }

  /**
   * Checks if the chat is visible
   */
  isVisible(): boolean {
    if (!this.parent.isCrispInjected()) {
      return false;
    }

    return window.$crisp.is("chat:visible");
  }

  /**
   * Registers a callback for chat initiated event
   */
  onChatInitiated(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    this.offChatInitiated();

    window.$crisp.push(["on", "chat:initiated", callback]);
  }

  /**
   * Unregisters the chat initiated callback
   */
  offChatInitiated() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:initiated"]);
  }

  /**
   * Registers a callback for chat opened event
   */
  onChatOpened(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    this.offChatOpened();

    window.$crisp.push(["on", "chat:opened", callback]);
  }

  /**
   * Unregisters the chat opened callback
   */
  offChatOpened() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:opened"]);
  }

  /**
   * Registers a callback for chat closed event
   */
  onChatClosed(callback: () => void) {
    this.parent.createSingletonIfNecessary();

    this.offChatClosed();

    window.$crisp.push(["on", "chat:closed", callback]);
  }

  /**
   * Unregisters the chat closed callback
   */
  offChatClosed() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "chat:closed"]);
  }

  /**
   * Registers a callback for helpdesk queried event
   */
  onHelpdeskQueried(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offHelpdeskQueried();

    window.$crisp.push(["on", "helpdesk:queried", callback]);
  }

  /**
   * Unregisters the helpdesk queried callback
   */
  offHelpdeskQueried() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "helpdesk:queried"]);
  }
}
