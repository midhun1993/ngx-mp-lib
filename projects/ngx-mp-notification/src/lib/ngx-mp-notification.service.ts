import { Injectable } from '@angular/core';
import {
  NgxMpNotifier,
  NgxMpWarningConfig,
  NgxMpAlertConfig,
  NgxMpGenericConfig,
} from './ngx-mp-notifier';

@Injectable({
  providedIn: 'root',
})
export class NgxMpNotificationService {
  constructor() {}
  /**
   * Warning
   * @param headline string
   * @param description string
   * @param conf <NgxMpWarningConfig>
   */
  public warning(
    headline: string,
    description: string | null,
    conf: NgxMpWarningConfig,
  ): void {
    let _description = description === null ? undefined : description;
    let { ok, cancel } = conf;
    let instance: NgxMpNotifier = new NgxMpNotifier(
      'warning',
      headline,
      _description,
    );
    instance.addAction('cancel', 'Cancel', cancel);
    instance.addAction('ok', 'Okay', ok);
    instance.fire();
  }

  /**
   * alert
   * @param headline string
   * @param description string
   * @param conf <NgxMpAlertConfig>
   */
  public alert(
    headline: string,
    description: string | null,
    conf: NgxMpAlertConfig,
  ): void {
    let _description = description === null ? undefined : description;
    let { ok } = conf;
    let instance: NgxMpNotifier = new NgxMpNotifier(
      'warning',
      headline,
      _description,
    );
    instance.addAction('ok', 'Okay', ok);
    instance.fire();
  }

  /**
   * alert
   * @param headline string
   * @param description string
   * @param conf <NgxMpAlertConfig>
   */
  public generic(
    headline: string,
    description: string | null,
    conf?: NgxMpGenericConfig,
  ): NgxMpNotifier {
    let _description = description === null ? undefined : description;
    let instance: NgxMpNotifier = new NgxMpNotifier(
      'warning',
      headline,
      _description,
    );
    if (conf) {
      let { actionList } = conf;
      if (actionList) {
        for (let a of actionList) {
          instance.addAction(a.key, a.label, a.cb);
        }
      }
    }
    return instance;
  }
}
