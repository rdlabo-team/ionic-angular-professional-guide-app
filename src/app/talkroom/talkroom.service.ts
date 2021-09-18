import { Injectable } from '@angular/core';
import { dummy } from './dummy';
import { ITalk } from './interfaces';
import { formatDate } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TalkroomService {
  private talksAllData: ITalk[] = [];
  private perPage = 10;

  constructor() {
    this.talksAllData = this.createTalksFromDummyText();
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

  public arrayConcatById<T>(
    arrayOld: T[],
    arrayNew: T[],
    key: string,
    order: string = 'DESC',
    secondaryKey: string = null,
  ): T[] {
    if (!arrayNew.length && !arrayOld.length) {
      return [];
    }
    const lead = arrayNew[0][key] as number;
    const last = arrayNew[arrayNew.length - 1][key] as number;

    arrayOld = arrayOld || [];
    arrayNew = arrayNew || [];
    arrayOld = arrayOld.filter((vol) => {
      return (
        (lead > last && ((vol[key] as number) >= lead || (vol[key] as number) <= last)) ||
        (lead < last && ((vol[key] as number) <= lead || (vol[key] as number) >= last)) ||
        (lead as number) === (last as number)
      );
    });

    let old: T[];
    if (secondaryKey !== null) {
      old = arrayOld.filter((vol) => {
        let flg = true;
        arrayNew.forEach((element) => {
          if (element[secondaryKey] === vol[secondaryKey]) {
            flg = false;
          }
        });
        return flg;
      });
    } else {
      old = arrayOld;
    }

    const oldData = old.filter((vol) => {
      let flg = true;
      arrayNew.forEach((element) => {
        if (element[key] === vol[key]) {
          flg = false;
        }
      });
      return flg;
    });
    let data = arrayNew.concat(oldData);

    let ord = -1;

    if (order === 'ASC') {
      console.log('ASC');
      ord = 1;
    }

    data = data.sort((a, b) => {
      const x = a[key] as number;
      const y = b[key] as number;
      if (x > y) {
        return ord;
      }
      if (x < y) {
        return ord * -1;
      }
      return 0;
    });

    return data;
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
