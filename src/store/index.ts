import { makeObservable, observable, action } from "mobx"
import { IStore } from '../types'

class Store implements IStore {
  isAudioPaused = true

  constructor() {
    makeObservable(this, {
      isAudioPaused: observable,
      toggleSound: action.bound
    })
  }

  toggleSound() {
    this.isAudioPaused = !this.isAudioPaused
  }
}

const store = new Store()

export default store