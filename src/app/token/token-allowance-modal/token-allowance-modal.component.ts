import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenAllowanceApiService} from '../../api/token-allowance-api-service';
import {NotifyType} from '../../consts/NotifyType';
import {ActivatedRoute, Router} from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
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
    this.route.queryParams.subscribe(params => {
      if (params.event === NotifyType.ALLOWANCE) {
        this.router.navigateByUrl('/home');
      }
    });

    this.activeModal.dismiss('Cross click');
    this.wallet = null;
  }
}
