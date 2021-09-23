import { TapOutsideDirective } from './tap-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
}

@Component({
  selector: 'app-test-outside-click-component',
  template: `<div appTapOutside (tapOutside)="handleOutSide()"></div>`,
})
class TestOutSideTapComponent {
  handleOutSide() {}
}

describe('TapOutsideDirective', () => {
  let component: TestOutSideTapComponent;
  let fixture: ComponentFixture<TestOutSideTapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapOutsideDirective, TestOutSideTapComponent],
      providers: [
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestOutSideTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
