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

    if (data) {
      if (data.url) {
        _payload.url = data.url;
      }

      if (data.description) {
        _payload.description = data.description;
      }

      if (data.employment) {
        _payload.employment = [
          (data.employment as CompanyDataEmployment).title
        ];

        if ((data.employment as CompanyDataEmployment).role) {
          _payload.employment.push(
            (data.employment as CompanyDataEmployment).role!
          );
        }
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
      this.offEmailChanged();

      window.$crisp.push(["on", "user:email:changed", callback]);
    }
  }

  offEmailChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:email:changed"]);
    }
  }

  onPhoneChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offPhoneChanged();

      window.$crisp.push(["on", "user:phone:changed", callback]);
    }
  }

  offPhoneChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:phone:changed"]);
    }
  }

  onNicknameChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offNicknameChanged();

      window.$crisp.push(["on", "user:nickname:changed", callback]);
    }
  }

  offNicknameChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:nickname:changed"]);
    }
  }

  onAvatarChanged(callback: Function) {
    if (this.parent.isCrispInjected()) {
      this.offAvatarChanged();

      window.$crisp.push(["on", "user:avatar:changed", callback]);
    }
  }

  offAvatarChanged() {
    if (this.parent.isCrispInjected()) {
      window.$crisp.push(["off", "user:avatar:changed"]);
    }
  }
}
