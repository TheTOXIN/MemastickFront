import {Component, Injectable, Input, OnInit} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evolve-survival',
  templateUrl: './evolve-survival.component.html',
  styleUrls: ['./evolve-survival.component.scss']
})
export class EvolveSurvivalComponent implements OnInit {

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
  ) {

  }

  ngOnInit() {
  }

  dipricated() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.3 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }
}
