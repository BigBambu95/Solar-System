export default class UIController {
  private static _instance: UIController;
  
  private constructor() {}

  public static get instance() {
    if(!UIController._instance) {
        UIController._instance = new UIController();
    }

    return UIController._instance;
  }

  public init() {
    
    console.log('UI Controller initiliazed')
  }

}