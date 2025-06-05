import { TestBed } from '@angular/core/testing';

import { NgxMpNotificationService } from './ngx-mp-notification.service';

describe('NgMpNotificationService', () => {
  let service: NgxMpNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMpNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
