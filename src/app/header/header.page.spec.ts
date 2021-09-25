import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderPage } from './header.page';
import { HeaderPageModule } from './header.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderPage', () => {
  let component: HeaderPage;
  let fixture: ComponentFixture<HeaderPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HeaderPageModule, RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(HeaderPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
