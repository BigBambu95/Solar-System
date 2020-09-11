
export default class AudioController {

  private static instance: AudioController;

  private constructor() {}

  // SIngleton
  public static getInstance() {
    if(!AudioController.instance) {
      AudioController.instance = new AudioController();
    }

    return AudioController.instance;
  }

  init() {
    const module = import('../audio/ambient.mp3');

    module
      .then(ambient => {
        const audio = new Audio(ambient.default);
        audio.loop = true;
        // audio.play();
        console.log('Audio Controller initialized');
      })
      .catch(err => console.error(err));
  }
}  


