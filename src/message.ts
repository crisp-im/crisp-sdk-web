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
 * TYPES
 ***************************************************************************/

export type FileMessage = {
  url: string,
  type: string,
  name: string
};

export type AnimationMessage = {
  url: string,
  type: string
};

export type AudioMessage = {
  url: string,
  type: string,
  duration: number
};

export type PickerMessage = {
  id: string,
  text: string,
  choices: PickerMessageChoices[]
};

export type PickerMessageChoices = {
  value: string,
  label: string,
  selected: boolean
};

export type FieldMessage = {
  id: string,
  text: string,
  explain: string
};

export type CarouselMessageTargets = {
  title: string,
  description?: string,
  image?: string
  actions: CarouselMessageTargetsActions[]
};

export type CarouselMessageTargetsActions = {
  label: string,
  url: string
};

export type CarouselMessage = {
  text: string,
  targets: CarouselMessageTargets[]
};

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Crisp message management
 */
export default class CrispMessage {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Sets the message input text
   */
  setMessageText(content: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "message:text", [content]]);
  }

  /**
   * Sends a message
   */
  send(
    type: string,
    content: string | FileMessage | AnimationMessage | AudioMessage
  ) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:send", [type, content]]);
  }

  /**
   * Sends a text message
   */
  sendText(content: string) {
    this.send("text", content);
  }

  /**
   * Sends a file message
   */
  sendFile(content: FileMessage) {
    this.send("file", content);
  }

  /**
   * Sends an animation message
   */
  sendAnimation(content: AnimationMessage) {
    this.send("animation", content);
  }

  /**
   * Sends an audio message
   */
  sendAudio(content: AudioMessage) {
    this.send("audio", content);
  }

  /**
   * Shows a message in the chat
   */
  show(
    type: string,
    content: string | FileMessage | AnimationMessage | AudioMessage |
      FieldMessage | PickerMessage | CarouselMessage
  ) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:show", [type, content]]);
  }

  /**
   * Shows a text message
   */
  showText(content: string) {
    this.show("text", content);
  }

  /**
   * Shows a file message
   */
  showFile(content: FileMessage) {
    this.show("file", content);
  }

  /**
   * Shows an animation message
   */
  showAnimation(content: AnimationMessage) {
    this.show("animation", content);
  }

  /**
   * Shows an audio message
   */
  showAudio(content: AudioMessage) {
    this.show("audio", content);
  }

  /**
   * Shows a picker message
   */
  showPicker(content: PickerMessage) {
    this.show("picker", content);
  }

  /**
   * Shows a field message
   */
  showField(content: FieldMessage) {
    this.show("field", content);
  }

  /**
   * Shows a carousel message
   */
  showCarousel(content: CarouselMessage) {
    this.show("carousel", content);
  }

  /**
   * Marks all messages as read
   */
  markAsRead() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:read"]);
  }

  /**
   * Starts a message thread
   */
  startThread(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:thread:start", [name]]);
  }

  /**
   * Ends a message thread
   */
  endThread(name?: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:thread:end", [name]]);
  }

  /**
   * Registers a callback for message sent event
   */
  onMessageSent(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageSent();

    window.$crisp.push(["on", "message:sent", callback]);
  }

  /**
   * Unregisters the message sent callback
   */
  offMessageSent() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:sent"]);
  }

  /**
   * Registers a callback for message received event
   */
  onMessageReceived(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageReceived();

    window.$crisp.push(["on", "message:received", callback]);
  }

  /**
   * Unregisters the message received callback
   */
  offMessageReceived() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:received"]);
  }

  /**
   * Registers a callback for message compose sent event
   */
  onMessageComposeSent(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageComposeSent();

    window.$crisp.push(["on", "message:compose:sent", callback]);
  }

  /**
   * Unregisters the message compose sent callback
   */
  offMessageComposeSent() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:sent"]);
  }

  /**
   * Registers a callback for message compose received event
   */
  onMessageComposeReceived(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageComposeReceived();

    window.$crisp.push(["on", "message:compose:received", callback]);
  }

  /**
   * Unregisters the message compose received callback
   */
  offMessageComposeReceived() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:received"]);
  }
}
