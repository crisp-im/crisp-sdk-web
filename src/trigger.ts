import {CrispClass as Crisp} from "./index";

class CrispTrigger {
  private parent: Crisp;

  constructor(crisp: Crisp) {
    this.parent = crisp;
  }

  run(name: string) {
    this.parent.createSingletonIfNecessary();

    window.$crisp.push(["do", "trigger:run", [name]]);
  }
}

export default CrispTrigger;