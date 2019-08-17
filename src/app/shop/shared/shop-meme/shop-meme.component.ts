import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../../consts/MemeFilter';
import {Meme} from '../../../model/Meme';
import {filterIcons} from '../../../consts/IconsData';
import {MemesModalComponent} from '../../../memes/memes-modal/memes-modal.component';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-shop-meme',
  templateUrl: './shop-meme.component.html',
  styleUrls: ['./shop-meme.component.scss']
})
export class ShopMemeComponent implements OnInit {

  @Input()
  public filter: MemeFilter;

  @Output()
  public choose: EventEmitter<UUID>;

  public meme: Meme;
  public icon: string;

  isMeme = false;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    this.choose = new EventEmitter();
  }

  modal() {
    const modalRef = this.modalService.open(MemesModalComponent);
    modalRef.componentInstance.filter = this.filter;
    modalRef.componentInstance.event.subscribe((result) => {
      this.meme = result;
      this.isMeme = true;
      this.choose.emit(this.meme.id);
    });
  }

  ngOnInit() {
    this.icon = filterIcons[this.filter];
  }
}
