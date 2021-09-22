import { Injectable } from '@angular/core';
import { IonContent } from '@ionic/angular';
import split from 'graphemesplit';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

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

  public waitRendering(): Promise<void> {
    return Promise.race([
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
      new Promise<void>((resolve) => setTimeout(() => resolve())),
    ]);
  }

  public async toBottomAnimation(content: IonContent): Promise<void> {
    const scrollElement = await content.getScrollElement();
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
