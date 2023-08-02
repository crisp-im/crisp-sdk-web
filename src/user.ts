import { CrispClass as Crisp } from "./index";

export type CompanyData = {
  url?: string,
  description?: string,
  employment?: CompanyDataEmployment | string[],
  geolocation?: CompanyDataGeolocation | string[]
};

export type CompanyDataEmployment = {
  title: string,
  role?: string
};

export type CompanyDataGeolocation = {
  country: string,
  city?: string
};

export default class CrispUser {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  setNickname(nickname: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:nickname", [nickname]]);
  }

  setEmail(email: string, hmac?: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:email", [email, hmac]]);
  }

  setPhone(phone: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:phone", [phone]]);
  }

  setAvatar(avatar: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:avatar", [avatar]]);
  }

  setCompany(name: string, data: CompanyData) {
    const _payload: CompanyData = {};

    if (data && data.url) {
      _payload.url = data.url;
    }

    if (data && data.description) {
      _payload.description = data.description;
    }

    if (data && data.employment) {
      _payload.employment = [
        (data.employment as CompanyDataEmployment).title
      ];

      if ((data.employment as CompanyDataEmployment).role) {
        _payload.employment.push((data.employment as CompanyDataEmployment).role!);
      }
    }

    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["set", "user:company", [name, _payload]]);
  }

  getEmail(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:email");
  }

  getPhone(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:phone");
  }

  getNickname(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:nickname");
  }

  getAvatar(): string | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:avatar");
  }

  getCompany(): object | null {
    if (!this.parent.isCrispInjected()) {
      return null;
    }

    return window.$crisp.get("user:company");
  }

  onEmailChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:email:changed"]);
      window.$crisp.push(["on", "user:email:changed", callback]);
    }
  }

  onPhoneChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:phone:changed"]);
      window.$crisp.push(["on", "user:phone:changed", callback]);
    }
  }

  onNicknameChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:nickname:changed"]);
      window.$crisp.push(["on", "user:nickname:changed", callback]);
    }
  }

  onAvatarChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:avatar:changed"]);
      window.$crisp.push(["on", "user:avatar:changed", callback]);
    }
  }
}
