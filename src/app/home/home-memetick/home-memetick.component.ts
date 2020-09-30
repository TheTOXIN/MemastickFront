import {Component, Input, OnInit} from '@angular/core';
import {Home} from '../../model/Home';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColorUtils} from '../../utils/color-utils';
import {RankTypesModalComponent} from '../../modals/rank-types-modal/rank-types-modal.component';

@Component({
  selector: 'app-home-memetick',
  templateUrl: './home-memetick.component.html',
  styleUrls: ['./home-memetick.component.scss']
})
export class HomeMemetickComponent implements OnInit {

  @Input()
  public home: Home;

  public memetickAvatar: string;
  public colorRarity: string;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  showLvls() {
    this.modalService.open(RankTypesModalComponent, {'centered': true});
  }

  ngOnInit() {
    this.memetickAvatar = this.avatarApi.dowloadAvatar(this.home.memetick.id);
    this.colorRarity = ColorUtils.getRarityColor(this.home.rank.lvl);
  }

  memetick() {
    this.router.navigateByUrl('/memetick/me');
  }
}
