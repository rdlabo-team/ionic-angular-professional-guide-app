import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit, ViewDidEnter {
  @ViewChild('ionHeader')
  private ionHeader: {
    el: HTMLElement;
  };

  @ViewChild('searchHeader')
  private searchHeader: {
    el: HTMLElement;
  };
  public items = [...Array(50).keys()];

  constructor() {}

  ngOnInit() {}

  public ionViewDidEnter() {}

  public logScrolling(event): void {
    if (this.searchHeader.el.clientHeight < event.detail.currentY) {
      this.ionHeader.el.classList.remove('no-last-child');
    } else {
      this.ionHeader.el.classList.add('no-last-child');
    }
  }
}
