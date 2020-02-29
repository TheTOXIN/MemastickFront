import {Component, Input, OnInit} from '@angular/core';
import {Home} from '../../model/Home';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';

@Component({
  selector: 'app-home-memetick',
  templateUrl: './home-memetick.component.html',
  styleUrls: ['./home-memetick.component.scss']
})
export class HomeMemetickComponent implements OnInit {

  @Input()
  public home: Home;

  public memetickAvatar: string;

  constructor(
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
    this.memetickAvatar = this.avatarApi.dowloadAvatar(this.home.memetick.id);
  }
}
