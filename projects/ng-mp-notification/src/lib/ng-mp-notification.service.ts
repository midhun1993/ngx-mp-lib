import { Injectable } from '@angular/core';
import { NgMpNotifier, NotificationConfig } from './ng-mp-notifier';

@Injectable({
  providedIn: 'root',
})
export class NgMpNotificationService {
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
    let instance: NgMpNotifier = new NgMpNotifier(
      'warning',
      headline,
      _description,
    );
    return instance;
  }
}
