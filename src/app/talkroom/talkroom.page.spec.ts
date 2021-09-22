import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalkroomPage } from './talkroom.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TalkroomPageModule } from './talkroom.module';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('TalkroomPage', () => {
  let component: TalkroomPage;
  let fixture: ComponentFixture<TalkroomPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TalkroomPage],
        imports: [TalkroomPageModule, RouterTestingModule, IonicStorageModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(TalkroomPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('絵文字かどうかを検証', () => {
    expect(component.isEmojiOnly('👀')).toBeTruthy();
  });
});
