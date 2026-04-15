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

/* eslint-disable no-unused-vars */
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
/* eslint-enable no-unused-vars */

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Crisp session management
 */
export default class CrispSession {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Resets the current session
   */
  reset(reload = false) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["do", "session:reset", [reload]]);
    }
  }

  /**
   * Sets session segments
   */
  setSegments(segments: string[], overwrite = false) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "session:segments", [segments, overwrite]]);
  }

  /**
   * Sets session data
   */
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

  /**
   * Pushes an event to the session
   */
  pushEvent(
    name: string,
    data: object = {},
    color: EventsColors = EventsColors.Blue
  ) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["set", "session:event", [[[name, data, color]]]]);
    }
  }

  /**
   * Gets session data by key
   */
  getData(key: string): string | boolean | number | undefined {
    if (!this.parent.isCrispInjected()) {
      return undefined;
    }

    return window.$crisp.get("session:data", key);
  }

  /**
   * Gets the session identifier
   */
  getIdentifier(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("session:identifier");
  }

  /**
   * Registers a callback for session loaded event
   */
  onLoaded(callback: Function) {
    this.parent.createSingletonIfNecessary();

    this.offLoaded();

    window.$crisp.push(["on", "session:loaded", callback]);
  }

  /**
   * Unregisters the session loaded callback
   */
  offLoaded() {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", "session:loaded"]);
  }

  /**
   * Checks if a value is valid for session data
   */
  private isValidDataValue(value: unknown): boolean {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  }
}
