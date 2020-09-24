import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FRONT_URL} from '../../app.constants';
import {BattleConst} from '../../consts/BattleConst';

@Component({
  selector: 'app-battle-rule-modal',
  templateUrl: './battle-rule-modal.component.html',
  styleUrls: ['./battle-rule-modal.component.scss']
})
export class BattleRuleModalComponent implements OnInit {

  swordIcon = FRONT_URL + '/assets/images/svg/sword.svg';
  constants = BattleConst;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
