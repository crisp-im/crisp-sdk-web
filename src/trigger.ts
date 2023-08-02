import { CrispClass as Crisp } from "./index";

export default class CrispTrigger {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  run(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "trigger:run", [name]]);
  }
}
