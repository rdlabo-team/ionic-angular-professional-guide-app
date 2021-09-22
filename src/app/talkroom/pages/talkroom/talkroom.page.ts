import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ViewDidEnter, ViewWillEnter, Platform, ViewWillLeave } from '@ionic/angular';
import { ITalk } from '../../talkroom.interfaces';
import { TalkroomService } from '../../services/talkroom.service';
import { first } from 'rxjs/operators';
import { Keyboard } from '@capacitor/keyboard';
import { PluginListenerHandle } from '@capacitor/core';

import split from 'graphemesplit';
import { HelperService } from '../../../shared/helper.service';
import { talkHappyPathObject } from '../../../../config/constant';

@Component({
  selector: 'app-talkroom',
  templateUrl: './talkroom.page.html',
  styleUrls: ['./talkroom.page.scss'],
})
export class TalkroomPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave {
  @ViewChild(IonContent)
  private content: IonContent;

  public isDisplayEmoji = false;
  public userId = 1;
  public talkBody = '';
  public isLoading = false;
  public isReady;
  public talks: ITalk[] = [];

  private readonly listenerHandlers: PluginListenerHandle[] = [];

  constructor(private talkroomService: TalkroomService, private platform: Platform, public helper: HelperService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.platform.is('capacitor')) {
      const scrollHandler = Keyboard.addListener('keyboardWillShow', () => this.helper.toBottomAnimation(this.content));
      this.listenerHandlers.push(scrollHandler);
    }
    this.isReady = false;
  }

  ionViewWillLeave() {
    if (this.platform.is('capacitor')) {
      this.listenerHandlers.forEach((handler) => handler.remove());
    }
  }

  ionViewDidEnter() {
    this.isReady = true;
    this.getTalks(0).then((data) => {
      this.talks = this.talks.filter((v) => v.id !== 0);
      this.talks = this.helper.arrayConcatById<ITalk>(this.talks, data, 'id', 'ASC');
      requestAnimationFrame(() => this.content.scrollToBottom());
    });
  }

  async toggleEmoji() {
    if (this.isDisplayEmoji) {
      this.isDisplayEmoji = false;
      return;
    }
    this.isDisplayEmoji = true;
    this.helper.toBottomAnimation(this.content);
  }

  public async tapEmojiOutside() {
    this.isDisplayEmoji = false;
  }

  async sendTalk(body: string) {
    this.isLoading = true;
    this.talks.push(
      Object.assign({}, talkHappyPathObject, {
        body,
      }),
    );
    requestAnimationFrame(() => this.content.scrollToBottom());
    const result = this.talkroomService.postPromise(body).finally(() => (this.isLoading = false));
    if (result === undefined) {
      // 通信に失敗したエラーハンドリング
      return;
    }
    this.talkBody = '';
    this.isDisplayEmoji = false;
    this.ionViewDidEnter();
  }

  async doInfinite(event) {
    const scrollElement = await this.content.getScrollElement();

    // 現在のスクロール量
    const scrollAmount = scrollElement.scrollHeight;

    // 配列を追加
    const talks = await this.getTalks(this.talks[0].id);
    if (talks.length > 0) {
      this.talks = this.helper.arrayConcatById<ITalk>(this.talks, talks, 'id', 'ASC');
    }

    await this.helper.waitRendering();

    // ion-contentの全スクロール量から、配列追加前のスクロール量を削除したポイントへ移動
    const toPosition = scrollElement.scrollHeight - scrollAmount;

    await this.content.scrollByPoint(0, toPosition, 0);
    event.target.complete();
  }

  public trackByFn = (index, item): number => item.id;

  private async getTalks(lastId: number): Promise<ITalk[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.talkroomService.getPromise(lastId);
  }
}
