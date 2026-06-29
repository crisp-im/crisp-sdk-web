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

/**
 * Handler for a Hugo Widget Tool call
 */
/* eslint-disable no-unused-vars */
export type HugoToolHandler = (
  args: Record<string, unknown>
) => unknown | Promise<unknown>;
/* eslint-enable no-unused-vars */

/**************************************************************************
 * CONSTANTS
 ***************************************************************************/

const TOOL_EVENT_PREFIX = "hugo:tool:";

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Crisp Hugo (AI agent) management
 */
export default class CrispHugo {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Registers a handler for a Hugo Widget Tool
   */
  onTool(name: string, handler: HugoToolHandler) {
    this.parent.createSingletonIfNecessary();

    this.offTool(name);

    window.$crisp.push(["on", `${TOOL_EVENT_PREFIX}${name}`, handler]);
  }

  /**
   * Unregisters a previously registered Hugo Widget Tool handler
   */
  offTool(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["off", `${TOOL_EVENT_PREFIX}${name}`]);
  }
}
