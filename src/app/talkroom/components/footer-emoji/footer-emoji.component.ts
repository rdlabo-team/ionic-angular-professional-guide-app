import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { emojiArray, emojiType } from '../../../../config/constant';
import { StorageService } from '../../../shared/storage.service';
import { StorageKeyEnum } from '../../../../config/storage-key.enum';

@Component({
  selector: 'app-footer-emoji',
  templateUrl: './footer-emoji.component.html',
  styleUrls: ['./footer-emoji.component.scss'],
})
export class FooterEmojiComponent implements OnInit {
  @Output() public sendEmoji = new EventEmitter();

  public emojiArray = Object.assign({}, emojiArray);
  public emojiType = emojiType;
  public selectedEmojiType = 'smile';
  public selectedEmojiNum: number = undefined;

  constructor(private storage: StorageService) {}

  public async ngOnInit() {
    await this.storage.init();
    const history = await this.storage.get<string[]>(StorageKeyEnum.emoji);
    if (history) {
      this.emojiArray.history = history;
    }
  }

  public async send(emoji: string, index: number): Promise<void> {
    if (this.selectedEmojiNum !== index) {
      this.selectedEmojiNum = index;
      return;
    }
    this.selectedEmojiNum = undefined;
    this.saveEmoji(emoji);
    this.sendEmoji.emit({ value: emoji });
  }

  private async saveEmoji(emoji: string) {
    const emojiData = [emoji, ...this.emojiArray.history.filter((d) => d !== emoji)];
    this.emojiArray.history = emojiData;
    await this.storage.set(StorageKeyEnum.emoji, emojiData);
  }
}
