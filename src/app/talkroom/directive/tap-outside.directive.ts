import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appTapOutside]',
})
export class TapOutsideDirective {
  @Output() tapOutside = new EventEmitter<void>();
  private excludeClassName = 'exclude-tap-outside';

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onTap(target) {
    if (this.elementRef.nativeElement.contains(target) || target.classList.contains(this.excludeClassName)) {
      return;
    }
    this.tapOutside.emit();
  }
}
