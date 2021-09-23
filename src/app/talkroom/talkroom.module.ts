import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkroomPageRoutingModule } from './talkroom-routing.module';

import { TalkroomPage } from './pages/talkroom/talkroom.page';

import { FooterEmojiComponent } from './components/footer-emoji/footer-emoji.component';
import { TalkComponent } from './components/talk/talk.component';
import { TapOutsideDirective } from './directive/tap-outside.directive';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TalkroomPageRoutingModule],
  declarations: [TalkroomPage, FooterEmojiComponent, TalkComponent, TapOutsideDirective],
})
export class TalkroomPageModule {}
