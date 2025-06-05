import { TestBed } from '@angular/core/testing';

import { NgMpNotificationService } from './ng-mp-notification.service';

describe('NgMpNotificationService', () => {
  let service: NgMpNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMpNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
