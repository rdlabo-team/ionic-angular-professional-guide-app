import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalkroomPage } from './talkroom.page';

const routes: Routes = [
  {
    path: '',
    component: TalkroomPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalkroomPageRoutingModule {}
