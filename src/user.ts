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

export type CompanyData = {
  url?: string,
  description?: string,
  employment?: CompanyDataEmployment,
  geolocation?: CompanyDataGeolocation
};

export type CompanyDataEmployment = {
  title: string,
  role: string
};

export type CompanyDataGeolocation = {
  country: string,
  city?: string
};

/**************************************************************************
 * CLASS
 ***************************************************************************/

/**
 * Crisp user management
 */
export default class CrispUser {
  private parent: Crisp;

  /**
   * Constructor
   */
  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  /**
   * Sets the user nickname
   */
  setNickname(nickname: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:nickname", [nickname]]);
  }

  /**
   * Sets the user email
   */
  setEmail(email: string, hmac?: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:email", [email, hmac]]);
  }

  /**
   * Sets the user phone
   */
  setPhone(phone: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:phone", [phone]]);
  }

  /**
   * Sets the user avatar
   */
  setAvatar(avatar: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:avatar", [avatar]]);
  }

  /**
   * Sets the user company
   */
  setCompany(name: string, data?: CompanyData) {
    const payload: {
      url?: string,
      description?: string,
      employment?: string[],
      geolocation?: string[]
    } = {};

    if (data?.url) {
      payload.url = data.url;
    }

    if (data?.description) {
      payload.description = data.description;
    }

    if (data?.employment) {
      payload.employment = [
        data.employment.title,
        data.employment.role
      ];
    }

    if (data?.geolocation) {
      payload.geolocation = [data.geolocation.country];

      if (data.geolocation.city) {
        payload.geolocation.push(data.geolocation.city);
      }
    }

    this.parent.createSingletonIfNecessary();

    if (Object.keys(payload).length > 0) {
      window.$crisp.push(["set", "user:company", [name, payload]]);
    } else {
      window.$crisp.push(["set", "user:company", [name]]);
    }
  }

  /**
   * Gets the user email
   */
  getEmail(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:email");
  }

  /**
   * Gets the user phone
   */
  getPhone(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:phone");
  }

  /**
   * Gets the user nickname
   */
  getNickname(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:nickname");
  }

  /**
   * Gets the user avatar
   */
  getAvatar(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:avatar");
  }

  /**
   * Gets the user company
   */
  getCompany(): object | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:company");
  }

  /**
   * Registers a callback for email changed event
   */
  onEmailChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offEmailChanged();

      window.$crisp.push(["on", "user:email:changed", callback]);
    }
  }

  /**
   * Unregisters the email changed callback
   */
  offEmailChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:email:changed"]);
    }
  }

  /**
   * Registers a callback for phone changed event
   */
  onPhoneChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offPhoneChanged();

      window.$crisp.push(["on", "user:phone:changed", callback]);
    }
  }

  /**
   * Unregisters the phone changed callback
   */
  offPhoneChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:phone:changed"]);
    }
  }

  /**
   * Registers a callback for nickname changed event
   */
  onNicknameChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offNicknameChanged();

      window.$crisp.push(["on", "user:nickname:changed", callback]);
    }
  }

  /**
   * Unregisters the nickname changed callback
   */
  offNicknameChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:nickname:changed"]);
    }
  }

  /**
   * Registers a callback for avatar changed event
   */
  onAvatarChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offAvatarChanged();

      window.$crisp.push(["on", "user:avatar:changed", callback]);
    }
  }

  /**
   * Unregisters the avatar changed callback
   */
  offAvatarChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:avatar:changed"]);
    }
  }
}
