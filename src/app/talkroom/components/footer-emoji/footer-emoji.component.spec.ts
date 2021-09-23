import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterEmojiComponent } from './footer-emoji.component';
import { Storage } from '@ionic/storage-angular';
import { StorageIonicMock } from '../../../shared/storage.service.mock';
import { TalkroomPageModule } from '../../talkroom.module';

describe('FooterEmojiComponent', () => {
  let component: FooterEmojiComponent;
  let fixture: ComponentFixture<FooterEmojiComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TalkroomPageModule],
        providers: [
          {
            provide: Storage,
            useValue: new StorageIonicMock(),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(FooterEmojiComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
