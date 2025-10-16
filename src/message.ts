import { CrispClass as Crisp } from "./index";

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

export default class CrispMessage {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  setMessageText(content: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "message:text", [content]]);
  }

  send(
    type: string,
    content: string | FileMessage | AnimationMessage | AudioMessage
  ) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:send", [type, content]]);
  }

  sendText(content: string) {
    this.send("text", content);
  }

  sendFile(content: FileMessage) {
    this.send("file", content);
  }

  sendAnimation(content: AnimationMessage) {
    this.send("animation", content);
  }

  sendAudio(content: AudioMessage) {
    this.send("audio", content);
  }

  show(
    type: string,
    content: string | FileMessage | AnimationMessage | AudioMessage | FieldMessage | PickerMessage | CarouselMessage
  ) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:show", [type, content]]);
  }

  showText(content: string) {
    this.show("text", content);
  }

  showFile(content: FileMessage) {
    this.show("file", content);
  }

  showAnimation(content: AnimationMessage) {
    this.show("animation", content);
  }

  showAudio(content: AudioMessage) {
    this.show("audio", content);
  }

  showPicker(content: PickerMessage) {
    this.show("picker", content);
  }

  showField(content: FieldMessage) {
    this.show("field", content);
  }

  showCarousel(content: CarouselMessage) {
    this.show("carousel", content);
  }

  markAsRead() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:read"]);
  }

  startThread(name: String) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:thread:start", [name]]);
  }

  endThread(name?: String) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "message:thread:end", [name]]);
  }

  onMessageSent(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageSent();

    window.$crisp.push(["on", "message:sent", callback]);
  }

  offMessageSent() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:sent"]);
  }

  onMessageReceived(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageReceived();

    window.$crisp.push(["on", "message:received", callback]);
  }

  offMessageReceived() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:received"]);
  }

  onMessageComposeSent(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageComposeSent();

    window.$crisp.push(["on", "message:compose:sent", callback]);
  }

  offMessageComposeSent() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:sent"]);
  }

  onMessageComposeReceived(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offMessageComposeReceived();

    window.$crisp.push(["on", "message:compose:received", callback]);
  }

  offMessageComposeReceived() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:received"]);
  }
}
