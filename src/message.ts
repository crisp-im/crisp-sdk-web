
import {CrispClass as Crisp} from "./index";

type FileMessage = {
  url: string,
  type: string,
  name: string
};

type AnimationMessage = {
  url: string,
  type: string
};

type AudioMessage = {
  url: string,
  type: string,
  duration: number
};

type PickerMessage = {
  id: string,
  text: string,
  choices: PickerMessageChoices[]
};

type PickerMessageChoices = {
  value: string,
  label: string,
  selected: boolean
};

type FieldMessage = {
  id: string,
  text: string,
  explain: string
};

type CarouselMessageTargets = {
  title: string,
  label: string,
  description: boolean,
  image?: string
  actions: CarouselMessageTargetsActions[]
};

type CarouselMessageTargetsActions = {
  label: string,
  url: string
};

type CarouselMessage = {
  text: string,
  targets: CarouselMessageTargets[]
};

class CrispMessage {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  send(type: string, content: string | FileMessage | AnimationMessage | AudioMessage) {
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

  show(type: string, content: string | FileMessage | AnimationMessage | AudioMessage | FieldMessage | PickerMessage | CarouselMessage) {
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

  onMessageSent(callback : Function) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:sent"]);
    window.$crisp.push(["on", "message:sent", callback]);
  }

  onMessageReceived(callback : Function) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:received"]);
    window.$crisp.push(["on", "message:received", callback]);
  }

  onMessageComposeSent(callback : Function) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:sent"]);
    window.$crisp.push(["on", "message:compose:sent", callback]);
  }

  onMessageComposeReceive(callback : Function) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "message:compose:received"]);
    window.$crisp.push(["on", "message:compose:received", callback]);
  }
}

export default CrispMessage;

export type {
  FileMessage,
  AnimationMessage,
  AudioMessage,
  PickerMessage,
  PickerMessageChoices,
  FieldMessage
}