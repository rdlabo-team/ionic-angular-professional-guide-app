import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

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
}
