import {Component, Input, OnInit} from '@angular/core';
import {MemetickProfile} from '../../model/memetick/MemetickProfile';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingApiService} from '../../api/setting-api-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemetickStatsModalComponent} from '../memetick-stats-modal/memetick-stats-modal.component';
import {MemeCoinHistoryModalComponent} from '../../modals/meme-coin-history-modal/meme-coin-history-modal.component';
import {CardService} from '../../services/card-service';
import {MemotypesReadComponent} from '../../memotype/memotypes-read/memotypes-read.component';

@Component({
  selector: 'app-memetick-profile',
  templateUrl: './memetick-profile.component.html',
  styleUrls: ['./memetick-profile.component.scss']
})
export class MemetickProfileComponent implements OnInit {

  @Input()
  public profile: MemetickProfile;

  @Input()
  public memetickMe: boolean;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private settingApi: SettingApiService,
    private modalService: NgbModal,
    private cardService: CardService,
  ) {

  }

  ngOnInit() {

  }

  memes() {
    this.router.navigate(['/memes'], {
      queryParams: {
        memetick: this.profile.memetick.id ,
        filter: MemeFilter.USER
      }
    });
  }

  memotypes() {
    this.cardService.open({
      content: MemotypesReadComponent,
      memotypes: {
        memetickId: this.profile.memetick.id
      }
    });
  }

  stats() {
    const modalRef = this.modalService.open(MemetickStatsModalComponent, {'centered': true});
    modalRef.componentInstance.memetickId = this.profile.memetick.id;
  }

  follow() {
    this.profile.follow = !this.profile.follow;
    this.settingApi.follow(this.profile.memetick.id);
  }

  memecoinHistory() {
    if (this.memetickMe) {
      this.modalService.open(MemeCoinHistoryModalComponent, {'centered': true});
    }
  }
}
