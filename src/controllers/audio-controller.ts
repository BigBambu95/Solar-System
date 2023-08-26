
export default class AudioController {
  private static _instance: AudioController;

  private constructor() {}

  public static get instance() {
    if(!AudioController._instance) {
      AudioController._instance = new AudioController();
    }

    return AudioController._instance;
  }

  init() {
    const module = import('../audio/ambient.mp3');

    module
      .then(ambient => {
        const audio = new Audio(ambient.default);
        audio.loop = true;
        audio.play();
        console.log('Audio Controller initialized');
      })
      .catch(err => console.error(err));
  }
}  


