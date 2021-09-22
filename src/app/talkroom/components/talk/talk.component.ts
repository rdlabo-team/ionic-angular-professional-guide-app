import { Component, Input, OnInit } from '@angular/core';
import { ITalk } from '../../talkroom.interfaces';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent implements OnInit {
  @Input() public talks: ITalk[] = [];
  @Input() public isReady;
  @Input() public userId = 1;
  constructor(public helper: HelperService) {}

  ngOnInit() {}

  public trackByFn = (index, item): number => item.id;
}
