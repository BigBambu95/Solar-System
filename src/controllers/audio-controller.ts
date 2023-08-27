import store from '../store'

export default class AudioController {
  private static _instance: AudioController;
  private _audio: HTMLAudioElement | null = null;

  private constructor() {}

  public static get instance() {
    if(!AudioController._instance) {
      AudioController._instance = new AudioController();
    }

    return AudioController._instance;
  }

  playAudio() {
    this._audio?.play()
  }

  pauseAudio() {
    this._audio?.pause()
  }

  init() {
    const module = import('../audio/ambient.mp3');

    module
      .then(ambient => {
        this._audio = new Audio(ambient.default);
        this._audio.loop = true;
        console.log('Audio Controller initialized');
      })
      .catch(err => console.error(err));
  }

  update() {
    if(store.isAudioPaused) {
      this.pauseAudio()
    } else {
      this.playAudio()
    }
  }
}  


