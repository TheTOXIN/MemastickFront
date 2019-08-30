import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BattleViewModalComponent} from '../battle-view-modal/battle-view-modal.component';
import {BattleApiService} from '../../api/battle-api-service';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.scss']
})
export class BattleViewComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private battleApi: BattleApiService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const battleId = params['id'];
      this.battleApi.view(battleId).subscribe((data) => {
        const modalRef = this.modalService.open(BattleViewModalComponent, {'centered': true});
        modalRef.componentInstance.battle = data;
      });
    });
  }
}
