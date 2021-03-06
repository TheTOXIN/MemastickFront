import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenAllowanceModalComponent} from '../../token/token-allowance-modal/token-allowance-modal.component';
import {ModalType} from '../../consts/ModalType';
import {MemeCoinHistoryModalComponent} from '../../modals/meme-coin-history-modal/meme-coin-history-modal.component';
import {DnaModalComponent} from '../../modals/dna-modal/dna-modal.component';

@Component({
  selector: 'app-modal-link',
  templateUrl: './modal-link.component.html',
  styleUrls: ['./modal-link.component.scss']
})
export class ModalLinkComponent implements OnInit {

  isLoad = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit() {
    this.initModal();
  }

  private initModal() {
    this.route.queryParams.subscribe(params => {
      switch (params.type) {
        case ModalType.ALLOWANCE: this.openModal(TokenAllowanceModalComponent); break;
        case ModalType.MEMECOIN: this.openModal(MemeCoinHistoryModalComponent); break;
        case ModalType.DNA: this.openModal(DnaModalComponent); break;
        default: this.toHome(); break;
      }
    });
  }

  private openModal(modal: any) {
    this.isLoad = false;

    this.modalService.open(modal, {'centered': true}).result.then(() => {
      this.toHome();
    }, () => {
      this.toHome();
    });
  }

  private toHome() {
    this.router.navigateByUrl('/home');
  }
}
