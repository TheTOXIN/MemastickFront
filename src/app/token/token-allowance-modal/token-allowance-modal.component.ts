import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenAllowanceApiService} from '../../api/token-allowance-api-service';
import {RankTokensModalComponent} from '../../modals/rank-tokens-modal/rank-tokens-modal.component';

@Component({
  selector: 'app-allowance-modal',
  templateUrl: './token-allowance-modal.component.html',
  styleUrls: ['./token-allowance-modal.component.scss']
})
export class TokenAllowanceModalComponent implements OnInit {

  public isLoad = false;
  public isTake = false;

  public allowance = true;
  public counter = 0;
  public wallet: any;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public allowanceApi: TokenAllowanceApiService
  ) {

  }

  ngOnInit() {
    this.allowanceApi.have().subscribe(
      () => this.allowance = true,
      () => this.allowance = false
    );
  }

  take() {
    if (this.allowance) {
      this.counter++;
      if (this.counter >= 2) {
        this.isLoad = true;
        this.allowance = false;
        this.allowanceApi.take().subscribe(data => {
          this.wallet = data.wallet;
          this.isTake = true;
          this.isLoad = false;
        });
        this.counter = 0;
      }
    }
  }

  showRankTokens() {
    this.modalService.open(RankTokensModalComponent, {'centered': true});
  }

  close() {
    this.activeModal.close('success');
    this.wallet = null;
  }
}
