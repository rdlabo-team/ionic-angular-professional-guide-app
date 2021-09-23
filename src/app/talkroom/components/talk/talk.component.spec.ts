import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalkComponent } from './talk.component';
import { TalkroomPageModule } from '../../talkroom.module';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TalkroomPageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TalkComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
