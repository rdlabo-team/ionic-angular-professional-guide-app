import { TestBed } from '@angular/core/testing';

import { TalkroomService } from './talkroom.service';

describe('TalkroomService', () => {
  let service: TalkroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalkroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
