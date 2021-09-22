import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ViewDidEnter, ViewWillEnter, Platform, ViewWillLeave } from '@ionic/angular';
import { ITalk } from '../../talkroom.interfaces';
import { TalkroomService } from '../../services/talkroom.service';
import { first } from 'rxjs/operators';
import { Keyboard } from '@capacitor/keyboard';
import { PluginListenerHandle } from '@capacitor/core';

import split from 'graphemesplit';
import { HelperService } from '../../../shared/helper.service';

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

  constructor(private talkroomService: TalkroomService, private platform: Platform, private helper: HelperService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.platform.is('capacitor')) {
      const scrollHandler = Keyboard.addListener('keyboardWillShow', () => this.toBottomAnimation(this.content));
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
    this.toBottomAnimation(this.content);
  }

  public async tapEmojiOutside() {
    this.isDisplayEmoji = false;
  }

  public isEmojiOnly(message: string): boolean {
    if (split(message).length === 1) {
      if (
        message.match(
          // eslint-disable-next-line max-len
          /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  async sendTalk(body: string) {
    this.isLoading = true;
    this.talks.push({
      id: 0,
      body,
      createdAt: null,
      readCount: null,
      profile: {
        userId: 1,
        name: 'ユーザA',
        photo: '/assets/shapes.svg',
      },
    });
    requestAnimationFrame(() => this.content.scrollToBottom());
    const result = this.talkroomService
      .post(body)
      .pipe(first())
      .toPromise(Promise)
      .catch(() => undefined)
      .finally(() => (this.isLoading = false));
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

    await Promise.race([
      new Promise((resolve) => requestAnimationFrame(resolve)),
      new Promise((resolve) => setTimeout(resolve)),
    ]);

    // ion-contentの全スクロール量から、配列追加前のスクロール量を削除したポイントへ移動
    const toPosition = scrollElement.scrollHeight - scrollAmount;

    await this.content.scrollByPoint(0, toPosition, 0);
    event.target.complete();
  }

  public trackByFn = (index, item): number => item.id;

  private async getTalks(lastId: number): Promise<ITalk[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.talkroomService.get(lastId).pipe(first()).toPromise(Promise);
  }

  private async toBottomAnimation(content: IonContent): Promise<void> {
    const scrollElement = await this.content.getScrollElement();
    if (scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight > 200) {
      return;
    }

    const startTime = new Date().getTime();
    const toBottomAnimation = () => {
      if (new Date().getTime() - startTime <= 420) {
        content.scrollToBottom();
        requestAnimationFrame(toBottomAnimation);
      }
    };
    requestAnimationFrame(toBottomAnimation);
  }
}
