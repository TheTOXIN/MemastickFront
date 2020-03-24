import {Component, Input, OnInit} from '@angular/core';
import {Home} from '../../model/Home';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MainApiService} from '../../api/main-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RankInfoModalComponent} from '../../modals/rank-info-modal/rank-info-modal.component';
import {memotypeColors, memotypeRarities} from '../../consts/MemotypeData';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-home-memetick',
  templateUrl: './home-memetick.component.html',
  styleUrls: ['./home-memetick.component.scss']
})
export class HomeMemetickComponent implements OnInit {

  @Input()
  public home: Home;

  public memetickAvatar: string;
  public colorAvatar;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
    this.memetickAvatar = this.avatarApi.dowloadAvatar(this.home.memetick.id);
    this.colorAvatar = memotypeColors[memotypeRarities[Math.floor(this.home.rank.lvl / GlobalConst.LVL_COF)]];
  }

  memetick() {
    this.router.navigateByUrl('/home/memetick/me');
  }

  rank() {
    this.modalService.open(RankInfoModalComponent, {'centered': true});
  }
}