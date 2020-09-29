import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Home} from '../../model/Home';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColorUtils} from '../../utils/color-utils';
import {RankTypesModalComponent} from '../../modals/rank-types-modal/rank-types-modal.component';
import {MemetickRank} from '../../model/MemetickRank';
import {MemetickPreview} from '../../model/MemetickPreview';
import {DnaLineComponent} from '../../shared/dna-line/dna-line.component';

@Component({
  selector: 'app-home-memetick',
  templateUrl: './home-memetick.component.html',
  styleUrls: ['./home-memetick.component.scss']
})
export class HomeMemetickComponent {

  @ViewChild(DnaLineComponent) dnaLine: DnaLineComponent;

  public rank: MemetickRank = new MemetickRank(
    0, 0, 0, 0, '.....'
  );

  public memetick: MemetickPreview = new MemetickPreview(
    null, 'ЗАГРУЗКА',  0
  );

  public memetickAvatar: string = 'assets/images/other/avatar.png';
  public colorRarity: string = '#6c757d';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private avatarApi: MemetickAvatarApiService,
  ) {

  }

  showLvls() {
    this.modalService.open(RankTypesModalComponent, {'centered': true});
  }

  init(home: Home) {
    if (home != null) {
      this.rank = home.rank;
      this.memetick = home.memetick;

      this.memetickAvatar = this.avatarApi.dowloadAvatar(home.memetick.id);
      this.colorRarity = ColorUtils.getRarityColor(home.rank.lvl);

      this.dnaLine.init();
    }
  }

  toMe() {
    this.router.navigateByUrl('/memetick/me');
  }
}
