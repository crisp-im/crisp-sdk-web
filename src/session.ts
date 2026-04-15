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
 * ENUMERATIONS
 ***************************************************************************/

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

/**************************************************************************
 * CLASS
 ***************************************************************************/

export default class CrispSession {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  reset(reload = false) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["do", "session:reset", [reload]]);
    }
  }

  setSegments(segments: string[], overwrite = false) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "session:segments", [segments, overwrite]]);
  }

  setData(data: object) {
    const payload: Array<[string, unknown]> = [];

    Object.entries(data).forEach((item) => {
      if (this.isValidDataValue(item[1])) {
        payload.push([item[0], item[1]]);
      }
    });

    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "session:data", [payload]]);
  }

  pushEvent(
    name: string,
    data: object = {},
    color: EventsColors = EventsColors.Blue
  ) {
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

    this.offLoaded();

    window.$crisp.push(["on", "session:loaded", callback]);
  }

  offLoaded() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "session:loaded"]);
  }

  private isValidDataValue(value: unknown): boolean {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  }
}
