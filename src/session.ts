import { CrispClass as Crisp } from "./index";

export enum EventsColors {
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
  Pink = "pink",
  Brown = "brown",
  Grey = "grey",
  Black = "black"
}

export default class CrispSession {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  reset(reload = false) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.do("session:reset", [reload]);
    }
  }

  setSegments(segments: string[], overwrite: boolean) {
    this.parent.createSingletonIfNecessary();

    $crisp.push(["set", "session:segments", [segments, overwrite]]);
  }

  setData(data: object) {
    const _payload = [];

    Object.entries(data).forEach(item => {
      if (this.isValidDataValue(item[0])) {
        _payload.push([item[0], item[1]]);
      }
    });

    this.parent.createSingletonIfNecessary();

    $crisp.push(["set", "session:data", [_payload]]);
  }

  pushEvent(name: string, data: object = {}, color: EventsColors = EventsColors.Blue) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["set", "session:event", [[[name, data, color]]]]);
    }
  }

  getData(key: string): string | boolean | number | undefined {
    if (!this.parent.isCrispInjected()) {
      return undefined;
    }

    return window.$crisp.get("session:data", key);
  }

  getIdentifier(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("session:identifier");
  }


  onLoaded(callback: Function) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "session:loaded"]);
    window.$crisp.push(["on", "session:loaded", callback]);
  }

  private isValidDataValue(value: string): boolean {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  }
}
