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
 * Scenario variables forwarded to workflow templates. Values must be strings,
 * numbers or booleans (they are coerced to strings by the workflow runtime)
 * and become available inside the scenario as `{{ key }}` templates.
 */
export type ScenarioVariables = Record<string, string | number | boolean>;

/**
 * Crisp scenario management
 */
export default class CrispScenario {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Runs a bot scenario by name, with optional template variables
   */
  run(name: string, variables?: ScenarioVariables) {
    this.parent.createSingletonIfNecessary();

    if (variables && typeof variables === "object") {
      window.$crisp.push(["do", "bot:scenario:run", [name, variables]]);
    } else {
      window.$crisp.push(["do", "bot:scenario:run", [name]]);
    }
  }
}
