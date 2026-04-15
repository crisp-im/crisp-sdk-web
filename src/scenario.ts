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

export default class CrispScenario {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  run(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "bot:scenario:run", [name]]);
  }
}
