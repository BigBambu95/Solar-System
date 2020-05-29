export default class MouseController {
  private static instance: MouseController;

  private constructor() {}

  public static getInstance() {
    if(!MouseController.instance) {
      MouseController.instance = new MouseController();
    }

    return MouseController.instance;
  }


  private onClick(e) {
    console.log(e);
  }

  init() {
    console.log('Mouse Controller initialized');

    document.addEventListener('click', (e) => {
      this.onClick(e);
    });
  }
}