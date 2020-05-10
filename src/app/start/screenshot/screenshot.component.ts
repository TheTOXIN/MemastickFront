import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageModalComponent} from '../../modals/image-modal/image-modal.component';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

  public screens = [
    'Дом',
    'Лента',
    'Битвы',
    'Меню',
    'Мемотипы',
    'Создние',
    'Майнинг',
    'Профиль'
  ];

  constructor(
    public modalService: NgbModal
  ) {
  }

  ngOnInit() {
  }

  openModal(title: string, image: string) {
    const modalRef = this.modalService.open(ImageModalComponent, {'centered': true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.image = image;
  }
}
