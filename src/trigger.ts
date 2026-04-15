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
 * Crisp trigger management
 */
export default class CrispTrigger {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Runs a trigger by name
   */
  run(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "trigger:run", [name]]);
  }
}
