type VoidFunc = () => void;
type Action = {
  key: string;
  label: string;
  cb: VoidFunc;
};

export interface NgxMpGenericConfig {
  actionList?: Action[];
  closeModalOnOutsideClick?: boolean;
}

export interface NgxMpWarningConfig extends NgxMpGenericConfig {
  ok: VoidFunc;
  cancel: VoidFunc;
}
export interface NgxMpAlertConfig extends NgxMpGenericConfig {
  ok: VoidFunc;
}

export type Configuration =
  | NgxMpAlertConfig
  | NgxMpWarningConfig
  | NgxMpGenericConfig;

function initializeConfiguration(conf: Configuration): Configuration {
  const defaultConfig = {
    closeModalOnOutsideClick: true,
  };

  return { ...defaultConfig, ...conf };
}

/**
 *  Notifier
 *  Manage all notification related activities
 */

export class NgxMpNotifier {
  conf: Configuration;
  headline: string;
  description?: string;
  modal: HTMLElement;
  constructor(
    conf: Configuration,
    headline: string,
    description: string | undefined,
  ) {
    this.conf = initializeConfiguration(conf);
    this.headline = headline;
    this.description = description;
    this.modal = this.createModel();
  }

  /**
   * create action button and bind call back
   * @param key string
   * @param label string
   * @param cb callback
   */
  public addAction(key: string, label: string, cb: VoidFunc) {
    let btn = this.createElement('button', 'ngx-mp-btn');
    btn.id = key;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      this.done();
      cb();
    });
    this.modal.querySelector('.ngx-mp-action')?.appendChild(btn);
  }

  /***
   * Display the notification modal
   */
  public fire() {
    this.attach(this.modal);
  }

  /**
   * Hide Modal
   * Remove all modal associated items from dom
   */
  private done() {
    document.body.querySelector('.ngx-mp-n-wrapper')?.remove();
    document.getElementById('ngx-mp-notification-overrides')?.remove();
  }

  /**
   * Attach all the notification related assets into DOM
   * @param model <HTMLElement>
   */
  private attach(model: HTMLElement) {
    document.body.appendChild(model);
    this.applyVisualStyles();

    window.addEventListener('resize', () => {
      this.applyVisualStyles();
    });
  }

  /**
   * Create HTML element object from tag and add class in present and return it
   * @param tag string
   * @param cls string
   * @returns
   */
  private createElement(tag: string, cls?: string): HTMLElement {
    let element = document.createElement(tag);
    if (cls !== undefined) {
      element.classList.add(cls);
    }
    return element;
  }

  /**
   * Assemble notification modal from pieces
   * @returns
   */
  private createModel(): HTMLElement {
    let wrapperEl = this.createElement('div', 'ngx-mp-n-wrapper');
    if (this.conf.closeModalOnOutsideClick) {
      console.log('add event');
      wrapperEl.addEventListener('click', () => this.done());
    }

    let coverEl = this.createElement('div', 'ngx-mp-n-cover');
    let headlineEl = this.createElement('div', 'ngx-mp-headline');
    headlineEl.innerText = this.headline;
    let content = this.createElement('div', 'ngx-mp-content');
    content.innerHTML = `<p>${this.description}</p>`;
    let action = this.createElement('div', 'ngx-mp-action');

    coverEl.appendChild(headlineEl);
    coverEl.appendChild(content);
    coverEl.appendChild(action);
    wrapperEl.appendChild(coverEl);
    return wrapperEl;
  }

  /**
   * Apply all the modal visual styles
   */
  private applyVisualStyles() {
    document.getElementById('ngx-mp-notification-overrides')?.remove();
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
    styleElement.id = 'ngx-mp-notification-overrides';
    styleElement.innerHTML = styleString;
    document.head.appendChild(styleElement);
  }

  /**
   * Dynamic created style string
   * @param modalLeft string
   * @param modalTop string
   * @param width  string
   * @returns
   */

  private getStyles(modalLeft?: string, modalTop?: string, width?: string) {
    return `.ngx-mp-n-wrapper{--ngx-mp-n-wrapper-bg-color:rgba(0,0,0,0.2);--ngx-mp-n-wrapper-font-family:Arial,sans-serif;--ngx-mp-n-headline-font-size:1.25rem;--ngx-mp-n-headline-font-weight:700;--ngx-mp-n-headline-font-color:#d9534f;--ngx-mp-n-content-font-size:1rem;--ngx-mp-n-content-font-color:#555;--ngx-mp-n-action-font-size:1rem}.ngx-mp-n-wrapper{position:fixed;max-width:100%;background:var(--ngx-mp-n-wrapper-bg-color);box-shadow:0 4px 12px rgba(0,0,0,0.15);font-family:var(--ngx-mp-n-wrapper-font-family);overflow:hidden;top:0;left:0;right:0;bottom:0}.ngx-mp-n-cover{box-sizing:border-box;position:absolute;top:${modalTop}px;left:${modalLeft}px;width:${width}px;background:#fff;padding:20px}.ngx-mp-headline{font-size:var(--ngx-mp-n-content-font-size);font-weight:var(--ngx-mp-n-headline-font-weight);margin-bottom:8px;color:var(--ngx-mp-n-headline-font-color);letter-spacing:0.05em}.ngx-mp-content{font-size:var(--ngx-mp-n-content-font-size);line-height:1.4;color:var(--ngx-mp-n-content-font-color)}.ngx-mp-action{display:flex;flex-direction:row;justify-content:space-between;align-content:center}.ngx-mp-btn{background:none;border:none;color:inherit;font:inherit;font-size:var(--ngx-mp-n-action-font-size);cursor:pointer}`;
  }
}
