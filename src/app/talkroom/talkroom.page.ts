import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ViewDidEnter, ViewWillEnter, Platform } from '@ionic/angular';
import { ITalk } from './interfaces';
import { TalkroomService } from './talkroom.service';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-talkroom',
  templateUrl: './talkroom.page.html',
  styleUrls: ['./talkroom.page.scss'],
})
export class TalkroomPage implements OnInit, ViewWillEnter, ViewDidEnter {
  @ViewChild(IonContent)
  private content: IonContent;

  public userId = 1;
  public talkBody = '';
  public isLoading = false;
  public isReady;
  public talks: ITalk[] = [];

  constructor(private talkroomService: TalkroomService, private platform: Platform) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isReady = false;
  }

  ionViewDidEnter() {
    this.isReady = true;
    this.getTalks(0).then((data) => {
      this.talks = this.talks.filter((v) => v.id !== 0);
      this.talks = this.talkroomService.arrayConcatById<ITalk>(this.talks, data, 'id', 'ASC');
      this.content.scrollToBottom();
    });
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
    setTimeout(() => this.content.scrollToBottom());
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
    this.ionViewDidEnter();
  }

  async doInfinite(event) {
    const scrollElement = await this.content.getScrollElement();

    // 現在のスクロール量
    const scrollAmount = scrollElement.scrollHeight;

    // 配列を追加
    const talks = await this.getTalks(this.talks[0].id);
    if (talks.length > 0) {
      this.talks = this.talkroomService.arrayConcatById<ITalk>(this.talks, talks, 'id', 'ASC');
    }

    await new Promise((resolve) => setTimeout(resolve));

    // ion-contentの全スクロール量から、配列追加前のスクロール量を削除したポイントへ移動
    const toPosition = scrollElement.scrollHeight - scrollAmount;

    await this.content.scrollByPoint(0, toPosition, 10);
    event.target.complete();
  }

  public trackByFn = (index, item): number => item.id;

  private async getTalks(lastId: number): Promise<ITalk[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.talkroomService.get(lastId).pipe(first()).toPromise(Promise);
  }
}
