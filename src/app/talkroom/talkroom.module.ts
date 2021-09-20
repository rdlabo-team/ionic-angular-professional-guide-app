import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkroomPageRoutingModule } from './talkroom-routing.module';

import { TalkroomPage } from './talkroom.page';

import { FooterEmojiComponent } from './footer-emoji/footer-emoji.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TalkroomPageRoutingModule],
  declarations: [TalkroomPage, FooterEmojiComponent],
})
export class TalkroomPageModule {}
