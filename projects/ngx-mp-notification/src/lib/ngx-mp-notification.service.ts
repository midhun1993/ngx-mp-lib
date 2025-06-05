import { Injectable } from '@angular/core';
import { NgxMpNotifier, NotificationConfig } from './ngx-mp-notifier';

@Injectable({
  providedIn: 'root',
})
export class NgxMpNotificationService {
  constructor() {}
  /**
   *
   * @param message string
   * @param conf <NotificationConfig>
   */
  public warning(
    headline: string,
    description: string | null,
    conf: NotificationConfig,
  ) {
    let _description = description === null ? undefined : description;
    let instance: NgxMpNotifier = new NgxMpNotifier(
      'warning',
      headline,
      _description,
    );
    return instance;
  }
}
