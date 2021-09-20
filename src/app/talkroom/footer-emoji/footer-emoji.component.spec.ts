import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterEmojiComponent } from './footer-emoji.component';

describe('FooterEmojiComponent', () => {
  let component: FooterEmojiComponent;
  let fixture: ComponentFixture<FooterEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterEmojiComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
