import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonApp } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonApp) ionApp: IonApp & {
    el: HTMLElement;
  };
  constructor(private platform: Platform) {}

  async ngOnInit() {
    if (this.platform.is('ios') && this.platform.is('capacitor')) {
      Keyboard.addListener('keyboardWillShow', (info) => {
        this.ionApp.el.classList.add('show-keyboard');
        this.ionApp.el.style.marginBottom = info.keyboardHeight + 'px';
      });
      Keyboard.addListener('keyboardWillHide', () => {
        this.ionApp.el.classList.remove('show-keyboard');
        this.ionApp.el.style.marginBottom = '0px';
      });
    }
  }
}
