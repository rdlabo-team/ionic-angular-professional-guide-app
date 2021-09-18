import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalkroomPageRoutingModule } from './talkroom-routing.module';

import { TalkroomPage } from './talkroom.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TalkroomPageRoutingModule],
  declarations: [TalkroomPage],
})
export class TalkroomPageModule {}
