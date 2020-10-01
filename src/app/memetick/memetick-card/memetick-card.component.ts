import {Component, Input, OnInit} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {MemetickProfile} from '../../model/memetick/MemetickProfile';
import {CardOptions} from '../../options/card-options';
import {Router} from '@angular/router';
import {CardState} from '../../state/card-state.service';

@Component({
  selector: 'app-memetick-card',
  templateUrl: './memetick-card.component.html',
  styleUrls: ['./memetick-card.component.scss']
})
export class MemetickCardComponent implements OnInit {

  @Input()
  public options: CardOptions;

  profile: MemetickProfile;
  isLoad = false;

  constructor(
    private router: Router,
    private state: CardState,
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.memetickApi.profile(this.options.memetickId).subscribe(data => {
      this.profile = data;
      this.isLoad = true;
    });
  }

  toMemetick() {
    this.router.navigate(['/memetick', this.profile.memetick.id]);
    this.state.modal.close();
  }
}
