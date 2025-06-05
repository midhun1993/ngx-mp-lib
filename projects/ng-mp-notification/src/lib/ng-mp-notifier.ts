export interface NotificationConfig {}

type TypeOfNotifier = 'warning' | 'alert';

export class NgMpNotifier {
  type: TypeOfNotifier;
  headline: string;
  description?: string;
  modal: HTMLElement;
  constructor(type: TypeOfNotifier, headline: string, description?: string) {
    this.type = type;
    this.headline = headline;
    this.description = description;
    this.modal = this.createModel();
  }

  public addAction(key: string, label: string, cb: () => void) {
    let btn = this.createElement('button', 'ng-mp-btn');
    btn.id = key;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      this.done();
      cb();
    });
    this.modal.querySelector('.ng-mp-action')?.appendChild(btn);
  }

  public fire() {
    this.attach(this.modal);
  }

  private done() {
    document.body.querySelector('.ng-mp-n-wrapper')?.remove();
    document.getElementById('ng-mp-notification-overrides')?.remove();
  }
  /**
   * attach model in page
   */
  private attach(model: HTMLElement) {
    document.body.appendChild(model);
    this.applyVisualStyles();

    window.addEventListener('resize', () => {
      this.applyVisualStyles();
    });
  }

  private getStyles(modalLeft?: string, modalTop?: string, width?: string) {
    return `.ng-mp-n-wrapper{position:fixed;max-width:100%;background:rgba(0,0,0,.2);box-shadow:0 4px 12px rgba(0,0,0,.15);font-family:Arial,sans-serif;color:#333;overflow:hidden;top:0;left:0;right:0;bottom:0}.ng-mp-n-cover{ box-sizing: border-box; position:absolute;top:${modalTop}px;left:${modalLeft}px;width:${width}px;background:#fff; padding: 20px;}.ng-mp-headline{font-size:1.25rem;font-weight:700;margin-bottom:8px;color:#d9534f;text-transform:uppercase;letter-spacing:.05em}.ng-mp-content{font-size:1rem;line-height:1.4;color:#555}`;
  }

  private createElement(tag: string, cls?: string): HTMLElement {
    let element = document.createElement(tag);
    if (cls !== undefined) {
      element.classList.add(cls);
    }
    return element;
  }

  private createModel(): HTMLElement {
    let wrapperEl = this.createElement('div', 'ng-mp-n-wrapper');
    let coverEl = this.createElement('div', 'ng-mp-n-cover');

    let headlineEl = this.createElement('div', 'ng-mp-headline');

    headlineEl.innerText = 'Hello There';

    //content
    let content = this.createElement('div', 'ng-mp-content');
    content.innerHTML = '<p> Welcome to cosco </p>';

    let action = this.createElement('div', 'ng-mp-action');
    content.innerHTML = '<p> Welcome to cosco </p>';

    coverEl.appendChild(headlineEl);
    coverEl.appendChild(content);
    coverEl.appendChild(action);
    wrapperEl.appendChild(coverEl);

    return wrapperEl;
  }

  private applyVisualStyles() {
    // remove existing style
    document.getElementById('ng-mp-notification-overrides')?.remove();

    let widthOfPage = document.body.clientWidth;
    let elementWidth = widthOfPage - 50 < 400 ? widthOfPage - 60 : 400;
    let modalLeft = (widthOfPage - elementWidth) / 2;
    let modalTop = (window.innerHeight * 1) / 3;
    let styleString = this.getStyles(
      String(modalLeft),
      String(modalTop),
      String(elementWidth),
    );
    let styleElement = this.createElement('style');
    styleElement.id = 'ng-mp-notification-overrides';
    styleElement.innerHTML = styleString;
    document.head.appendChild(styleElement);
  }
}
