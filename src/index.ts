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
import CrispMessage from "./message";

export {
  AnimationMessage,
  AudioMessage,
  FileMessage,
  PickerMessage,
  PickerMessageChoices,
  FieldMessage
} from "./message";

import CrispUser from "./user";

export {
  CompanyData,
  CompanyDataEmployment,
  CompanyDataGeolocation
} from "./user";

import CrispTrigger from "./trigger";
import CrispScenario from "./scenario";
import CrispSession from "./session";

export {
  EventsColors
} from "./session";

import CrispChat from "./chat";

/**************************************************************************
 * TYPES
 ***************************************************************************/

/* eslint-disable no-unused-vars, crisp/no-snake-case, @typescript-eslint/no-explicit-any */
declare global {
  var $crisp: any;
  var CRISP_WEBSITE_ID: string;
  var CRISP_TOKEN_ID: string;
  var CRISP_RUNTIME_CONFIG: any;
  var CRISP_COOKIE_DOMAIN: string;
  var CRISP_COOKIE_EXPIRE: number;
}

export type Options = {
  clientUrl?: string
  autoload?: boolean,
  tokenId?: string
  locale?: string
  sessionMerge?: boolean
  cookieDomain?: string
  cookieExpire?: number
  lockMaximized?: boolean
  lockFullview?: boolean
  safeMode?: boolean
};

/**************************************************************************
 * ENUMERATIONS
 ***************************************************************************/

/* eslint-disable no-unused-vars */
export enum ChatboxColors {
  Default = "default",
  Amber = "amber",
  Black = "black",
  Blue = "blue",
  BlueGrey = "blue_grey",
  LightBlue = "light_blue",
  Brown = "brown",
  Cyan = "cyan",
  Green = "green",
  LightGreen = "light_green",
  Grey = "grey",
  Indigo = "indigo",
  Orange = "orange",
  DeepOrange = "deep_orange",
  Pink = "pink",
  Purple = "purple",
  DeepPurple = "deep_purple",
  Red = "red",
  Teal = "teal"
}

export enum ChatboxPosition {
  Left = "left",
  Right = "right"
}
/* eslint-enable no-unused-vars */

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Main Crisp SDK class
 */
class Crisp {
  private clientUrl: string = "https://client.crisp.chat/l.js";
  private websiteId: string = "";
  private autoload: boolean = true;
  private tokenId?: string;
  private locale?: string;
  private sessionMerge?: boolean;
  private cookieDomain?: string;
  private cookieExpire?: number;
  private lockFullview?: boolean;
  private lockMaximized?: boolean;
  private safeMode?: boolean;

  private injected: boolean = false;

  chat: CrispChat;
  session: CrispSession;
  user: CrispUser;
  message: CrispMessage;
  trigger: CrispTrigger;
  scenario: CrispScenario;

  /**
   * Constructor
   */
  constructor() {
    this.chat = new CrispChat(this);
    this.session = new CrispSession(this);
    this.user = new CrispUser(this);
    this.message = new CrispMessage(this);
    this.trigger = new CrispTrigger(this);
    this.scenario = new CrispScenario(this);
  }

  /**
   * Configures the Crisp SDK
   */
  configure(websiteId: string, options: Options = {}) {
    this.websiteId = websiteId;
    this.tokenId = options.tokenId;
    this.locale = options.locale;
    this.sessionMerge = options.sessionMerge;
    this.cookieDomain = options.cookieDomain;
    this.cookieExpire = options.cookieExpire;
    this.lockFullview = options.lockFullview;
    this.lockMaximized = options.lockMaximized;
    this.safeMode = options.safeMode;

    if (options.clientUrl !== undefined) {
      this.clientUrl = options.clientUrl;
    }

    if (options.autoload !== undefined) {
      this.autoload = options.autoload;
    }

    if (this.autoload) {
      this.load();
    }
  }

  /**
   * Loads the Crisp client script
   */
  load() {
    const head = document.getElementsByTagName("head");

    this.createSingletonIfNecessary();

    if (this.isCrispInjected() === true) {
      return;
    }

    if (!this.websiteId) {
      throw new Error("websiteId must be set before loading Crisp");
    }

    window.CRISP_WEBSITE_ID = this.websiteId;
    window.CRISP_RUNTIME_CONFIG = {};

    if (this.tokenId) {
      window.CRISP_TOKEN_ID = this.tokenId;
    }

    if (this.sessionMerge) {
      window.CRISP_RUNTIME_CONFIG.session_merge = true;
    }

    if (this.locale) {
      window.CRISP_RUNTIME_CONFIG.locale = this.locale;
    }

    if (this.lockFullview) {
      window.CRISP_RUNTIME_CONFIG.lock_full_view = true;
    }

    if (this.lockMaximized) {
      window.CRISP_RUNTIME_CONFIG.lock_maximized = true;
    }

    if (this.cookieDomain) {
      window.CRISP_COOKIE_DOMAIN = this.cookieDomain;
    }

    if (this.cookieExpire) {
      window.CRISP_COOKIE_EXPIRE = this.cookieExpire;
    }

    if (!head || !head[0]) {
      return this.deferredLoading();
    }

    if (this.safeMode === true) {
      this.setSafeMode(true);
    }

    const script = document.createElement("script");

    script.src = this.clientUrl;
    script.async = true;

    head[0].appendChild(script);

    this.injected = true;
  }

  /**
   * Sets the token ID for authentication
   */
  setTokenId(tokenId?: string) {
    this.tokenId = tokenId;

    if (this.isCrispInjected() === true) {
      if (tokenId) {
        window.CRISP_TOKEN_ID = tokenId;
      } else {
        delete window.CRISP_TOKEN_ID;
      }
    }
  }

  /**
   * Sets the z-index of the chat widget
   */
  setZIndex(zIndex: number) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "container:index", [zIndex]]);
  }

  /**
   * Sets the color theme of the chat widget
   */
  setColorTheme(color: ChatboxColors) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "color:theme", [color]]);
  }

  /**
   * Sets whether to hide the widget when operators are away
   */
  setHideOnAway(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:away", [enabled]]);
  }

  /**
   * Sets whether to hide the widget on mobile devices
   */
  setHideOnMobile(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:mobile", [enabled]]);
  }

  /**
   * Sets the position of the chat widget
   */
  setPosition(position: ChatboxPosition) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "position:reverse", [
      position === ChatboxPosition.Left
    ]]);
  }

  /**
   * Sets whether to show the availability tooltip
   */
  setAvailabilityTooltip(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "availability:tooltip", [enabled]]);
  }

  /**
   * Sets whether vacation mode is enabled
   */
  setVacationMode(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:vacation", [enabled]]);
  }

  /**
   * Sets safe mode for error handling
   */
  setSafeMode(safe: boolean = true) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["safe", safe]);
  }

  /**
   * Mutes or unmutes notification sounds
   */
  muteSound(mute: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "sound:mute", [mute]]);
  }

  /**
   * Toggles the operator count display
   */
  toggleOperatorCount(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "show:operator:count", [enabled]]);
  }

  /**
   * Registers a callback for website availability changed event
   */
  onWebsiteAvailabilityChanged(callback: Function) {
    this.createSingletonIfNecessary();

    this.offWebsiteAvailabilityChanged();

    window.$crisp.push(["on", "website:availability:changed", callback]);
  }

  /**
   * Unregisters the website availability changed callback
   */
  offWebsiteAvailabilityChanged() {
    this.createSingletonIfNecessary();

    window.$crisp.push(["off", "website:availability:changed"]);
  }

  /**
   * Creates the $crisp singleton if it does not exist
   */
  createSingletonIfNecessary() {
    if (window.$crisp === undefined) {
      window.$crisp = [];
    }
  }

  /**
   * Auto-injects the Crisp client if not already injected
   */
  autoInjectIfNecessary() {
    if (!this.isCrispInjected()) {
      this.load();
    }
  }

  /**
   * Checks if the Crisp client is injected
   */
  isCrispInjected(): boolean {
    if (this.injected === true || window.$crisp?.is) {
      return true;
    }

    return false;
  }

  /**
   * Defers loading until DOM is ready
   */
  private deferredLoading() {
    document.addEventListener("DOMContentLoaded", () => {
      this.load();
    });
  }
}

/**************************************************************************
 * EXPORTS
 ***************************************************************************/

const singleton = new Crisp();

export {
  singleton as Crisp,
  Crisp as CrispClass
};
