import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {creedRules} from '../../consts/TextData';

@Component({
  selector: 'app-creed-modal',
  templateUrl: './creed-modal.component.html',
  styleUrls: ['./creed-modal.component.scss']
})
export class CreedModalComponent implements OnInit {

  @Input()
  public alreadyAgree = false;

  public creedRules = [];
  public accessAgree = false;
  public secondsAgree = 10;
  public intervalAgree;

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.creedRules = creedRules;
  }

  ngOnInit() {
    this.intervalAgree = setInterval(() => {
      this.updateSeconds();
    }, 1000);
  }

  updateSeconds() {
    this.secondsAgree--;
    if (this.secondsAgree <= 0) {
      this.accessAgree = true;
      clearInterval(this.intervalAgree);
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
