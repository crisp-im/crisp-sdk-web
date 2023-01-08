import CrispMessage from "./message";

import {
  AnimationMessage,
  AudioMessage,
  FileMessage,
  PickerMessage,
  PickerMessageChoices,
  FieldMessage
} from "./message";

import CrispUser from "./user";

import {
  CompanyData,
  CompanyDataEmployment,
  CompanyDataGeolocation
} from "./user";

import CrispTrigger from "./trigger";

import CrispSession from "./session";

import {
  EventsColors,
} from "./session";

import CrispChat from "./chat";

/* eslint-disable no-var, @typescript-eslint/no-explicit-any */
declare global {
  var $crisp: any;
  var CRISP_WEBSITE_ID: string;
  var CRISP_TOKEN_ID: string;
  var CRISP_RUNTIME_CONFIG: any;
  var CRISP_COOKIE_DOMAIN: string;
  var CRISP_COOKIE_EXPIRE: number
}
/* eslint-enable no-var, @typescript-eslint/no-explicit-any */


type Options = {
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

enum ChatboxColors {
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
  Teal = "teal",
}

enum ChatboxPosition {
  Left = "left",
  Right = "right",
}

class Crisp {
  // Options
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

  // States
  private injected: boolean = false;

  // Instances
  chat: CrispChat;
  session: CrispSession;
  user: CrispUser;
  message: CrispMessage;
  trigger: CrispTrigger;

  constructor() {
    this.chat = new CrispChat(this);
    this.session = new CrispSession(this);
    this.user = new CrispUser(this);
    this.message = new CrispMessage(this);
    this.trigger = new CrispTrigger(this);
  }

  configure(websiteId: string, options: Options = {}) {
    this.websiteId = websiteId;
    this.tokenId = options.tokenId;
    this.locale = options.locale;
    this.sessionMerge = options.sessionMerge;
    this.cookieDomain = options.cookieDomain;
    this.lockFullview = options.lockFullview;
    this.lockMaximized = options.lockMaximized;
    this.safeMode = options.safeMode;

    if (options.autoload !== undefined) {
      this.autoload = options.autoload;
    }

    // Autoload Crisp is option is enavled
    if (this.autoload) {
      this.load();
    }
  }

  load() {
    const _head = document.getElementsByTagName("head");

    this.createSingletonIfNecessary();

    // Prevents from loading Crisp twice
    if (this.isCrispInjected()) {
      return;
    }

    if (!this.websiteId) {
      throw new Error("websiteId must be set before loading Crisp");
    }

    if (!_head || !_head[0]) {
      return this.deferredLoading();
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

    if (this.safeMode === true) {
     this.setSafeMode(true);
    }

    const _script = document.createElement("script");

    _script.src="https://client.crisp.chat/l.js";
    _script.async = true;

    _head[0].appendChild(_script);

    this.injected = true;
  }

  setTokenId(tokenId : string) {
    this.tokenId = tokenId;
  }

  setZIndex(zIndex : number) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "container:index", [zIndex]]);
  }

  setColorTheme(color : ChatboxColors) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "color:theme", [color]]);
  }

  setHideOnAway(enabled : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:away", [enabled]]);
  }

  setHideOnMobile(enabled : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:mobile", [enabled]]);
  }

  setPosition(position : ChatboxPosition) {
    this.createSingletonIfNecessary();

    $crisp.push(["config", "position:reverse", [position === ChatboxPosition.Left]]);
  }

  setAvailabilityTooltip(enabled : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "availability:tooltip", [enabled]]);
  }

  setVacationMode(enabled : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:vacation", [enabled]]);
  }

  setSafeMode(safe: boolean = true) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["safe", safe]);
  }

  muteSound(mute : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "sound:mute", [mute]]);
  }

  toggleOperatorCount(enabled : boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "show:operator:count", [enabled]]);
  }

  createSingletonIfNecessary() {
    // Assigns $crisp singleton
    if (window.$crisp === undefined) {
      window.$crisp = [];
    }
  }

  autoInjectIfNecessasy(){
    if (!this.isCrispInjected()) {
      this.load();
    }
  }

  isCrispInjected() : boolean {
    return this.injected === true || (window.$crisp && window.$crisp.is);
  }

  private deferredLoading() {
    document.addEventListener("DOMContentLoaded", () => {
      this.load();
    });
  }
}

const singleton = new Crisp();

export {
  singleton as Crisp,
  Crisp as CrispClass
}

export type {
  AnimationMessage,
  AudioMessage,
  FileMessage,
  PickerMessage,
  PickerMessageChoices,
  FieldMessage,
  CompanyData,
  CompanyDataEmployment,
  CompanyDataGeolocation,
  EventsColors
}