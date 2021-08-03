export default class UIController {
  private static instance: UIController;
  
  private constructor() {}

  public static getInstance(): UIController {
    if(!UIController.instance) {
        UIController.instance = new UIController();
    }

    return UIController.instance;
  }

  public init() {
    
    console.log('UI Controller initiliazed')
  }

}