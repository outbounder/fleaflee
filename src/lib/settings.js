class Settings {
  constructor() {
    if (Settings.instance) {
      return Settings.instance;
    }

    this.speedOfChargeMultiplyer = 1;
    this.multipleJumps = 2;

    Settings.instance = this;
    return this;
  }

  setSpeedOfChargeMultiplyer(speed) {
    this.speedOfChargeMultiplyer = speed;
  }

  getSpeedOfChargeMultiplyer() {
    return this.speedOfChargeMultiplyer;
  }

  setMultipleJumps(jumps) {
    this.multipleJumps = jumps;
  }

  getMultipleJumps() {
    return this.multipleJumps;
  }
}

const settings = new Settings();
export default settings;
