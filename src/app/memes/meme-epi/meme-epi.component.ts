import {Component, Input, OnInit} from '@angular/core';
import {EPI} from '../../model/EPI';
import {SocialsModalComponent} from '../../modals/socials-modal/socials-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {EpiModalComponent} from '../../modals/epi-modal/epi-modal.component';

@Component({
  selector: 'app-meme-epi',
  templateUrl: './meme-epi.component.html',
  styleUrls: ['./meme-epi.component.scss']
})
export class MemeEpiComponent implements OnInit {

  @Input()
  private epi: EPI;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  epiModal() {
    this.modalService.open(EpiModalComponent, {'centered': true});
  }
}
