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

import CrispSession from "./session";

export {
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
  Teal = "teal",
}

export enum ChatboxPosition {
  Left = "left",
  Right = "right",
}

class Crisp {
  // Options
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

    if (options.clientUrl !== undefined) {
      this.clientUrl = options.clientUrl;
    }

    if (options.autoload !== undefined) {
      this.autoload = options.autoload;
    }

    // Autoload Crisp if option is enabled
    if (this.autoload) {
      this.load();
    }
  }

  load() {
    const _head = document.getElementsByTagName("head");

    this.createSingletonIfNecessary();

    // Prevents from loading Crisp twice
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

    if (!_head || !_head[0]) {
      return this.deferredLoading();
    }

    if (this.safeMode === true) {
      this.setSafeMode(true);
    }

    const _script = document.createElement("script");

    _script.src = this.clientUrl;
    _script.async = true;

    _head[0].appendChild(_script);

    this.injected = true;
  }

  setTokenId(tokenId: string) {
    this.tokenId = tokenId;

    // Refresh injected token?
    if (this.isCrispInjected() === true) {
      if (tokenId) {
        window.CRISP_TOKEN_ID = tokenId;
      } else {
        delete window.CRISP_TOKEN_ID;
      }
    }
  }

  setZIndex(zIndex: number) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "container:index", [zIndex]]);
  }

  setColorTheme(color: ChatboxColors) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "color:theme", [color]]);
  }

  setHideOnAway(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:away", [enabled]]);
  }

  setHideOnMobile(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:on:mobile", [enabled]]);
  }

  setPosition(position: ChatboxPosition) {
    this.createSingletonIfNecessary();

    $crisp.push(["config", "position:reverse", [position === ChatboxPosition.Left]]);
  }

  setAvailabilityTooltip(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "availability:tooltip", [enabled]]);
  }

  setVacationMode(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "hide:vacation", [enabled]]);
  }

  setSafeMode(safe: boolean = true) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["safe", safe]);
  }

  muteSound(mute: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "sound:mute", [mute]]);
  }

  toggleOperatorCount(enabled: boolean) {
    this.createSingletonIfNecessary();

    window.$crisp.push(["config", "show:operator:count", [enabled]]);
  }

  createSingletonIfNecessary() {
    // Assigns $crisp singleton
    if (window.$crisp === undefined) {
      window.$crisp = [];
    }
  }

  autoInjectIfNecessasy() {
    if (!this.isCrispInjected()) {
      this.load();
    }
  }

  isCrispInjected(): boolean {
    // Check if Crisp was injected (either from the Web SDK, or from another \
    //   source)
    if (this.injected === true || (window.$crisp && window.$crisp.is)) {
      return true;
    }

    return false;
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
};
