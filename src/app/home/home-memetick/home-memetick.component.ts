import {Component, Input, OnInit} from '@angular/core';
import {Home} from '../../model/Home';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {memotypeColors, memotypeRarities} from '../../consts/MemotypeData';
import {GlobalConst} from '../../consts/GlobalConst';
import {ColorUtils} from '../../utils/color-utils';
import {DomSanitizer} from '@angular/platform-browser';

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

  public dnaCrop = 'inset(0px 0px 0px 0px)';

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private avatarApi: MemetickAvatarApiService,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit() {
    this.memetickAvatar = this.avatarApi.dowloadAvatar(this.home.memetick.id);
    this.colorRarity = ColorUtils.getRarityColor(this.home.rank.lvl);
    this.dnaCrop = `inset(0px ${100 - this.home.rank.percent}% 0px 0px)`;
  }

  public get getDnaCrop() {
    return this.sanitizer.bypassSecurityTrustStyle(this.dnaCrop);
  }

  memetick() {
    this.router.navigateByUrl('/home/memetick/me');
  }
}
