import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenAllowanceApiService} from '../../services/token-allowance-api-service';

@Component({
  selector: 'app-allowance-modal',
  templateUrl: './token-allowance-modal.component.html',
  styleUrls: ['./token-allowance-modal.component.scss']
})
export class TokenAllowanceModalComponent implements OnInit {

  public isLoad: boolean;
  public isTake: boolean;

  public allowance = false;
  public counter = 0;
  public wallet: any;

  constructor(
    public activeModal: NgbActiveModal,
    public allowanceApi: TokenAllowanceApiService
  ) {
    this.isTake = false;
  }

  ngOnInit() {
    this.allowanceApi.have().subscribe(() => this.allowance = true);
  }

  take() {
    this.counter++;
    if (this.counter >= 2) {
      this.isLoad = true;
      this.allowanceApi.take().subscribe(data => {
        this.wallet = data.wallet;
        this.isTake = true;
        this.isLoad = false;
      });
      this.counter = 0;
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
    this.wallet = null;
  }
}
