import { Injectable } from '@angular/core';
import { dummy } from '../dummy';
import { ITalk } from '../talkroom.interfaces';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TalkroomService {
  private talksAllData: ITalk[] = [];
  private perPage = 30;

  constructor() {
    this.talksAllData = this.createTalksFromDummyText();
  }

  public getPromise(lastId: number): Promise<ITalk[]> {
    return this.get(lastId).pipe(first()).toPromise(Promise);
  }

  public postPromise(body): Promise<boolean> {
    return this.post(body)
      .pipe(first())
      .toPromise(Promise)
      .catch(() => undefined);
  }

  public get(lastId: number): Observable<ITalk[]> {
    if (!lastId) {
      return of(this.talksAllData.slice(this.talksAllData.length - this.perPage, this.talksAllData.length));
    }
    const removeExistTalks = this.talksAllData.filter((item) => item.id < lastId);
    return of(removeExistTalks.slice(removeExistTalks.length - this.perPage, removeExistTalks.length));
  }

  public post(body: string): Observable<boolean> {
    this.talksAllData.push({
      id: this.talksAllData[this.talksAllData.length - 1].id + 1,
      body,
      createdAt: formatDate(new Date(), 'YYYY/MM/dd HH:mm', 'en-US'),
      readCount: Math.floor(Math.random() * 2),
      profile: {
        userId: 1,
        name: 'ユーザA',
        photo: '/assets/shapes.svg',
      },
    });
    return of(true);
  }

  private createTalksFromDummyText(): ITalk[] {
    const profiles = [
      {
        userId: 1,
        name: 'ユーザA',
        photo: '/assets/shapes.svg',
      },
      {
        userId: 2,
        name: 'ユーザB',
        photo: '/assets/shapes.svg',
      },
    ];

    const dummyItems = dummy
      .replace(/(\s|\r?\n)/g, '')
      .trim()
      .split('。')
      .filter((d) => !!d);
    return dummyItems.map((item, i) => {
      const date = new Date();
      date.setMinutes(date.getMinutes() + i);
      return {
        id: i + 1,
        body: item,
        createdAt: formatDate(date, 'YYYY/MM/dd HH:mm', 'en-US'),
        readCount: Math.floor(Math.random() * 2),
        profile: profiles[Math.floor(Math.random() * 2)],
      };
    });
  }
}
