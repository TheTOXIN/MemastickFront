import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {UUID} from 'angular2-uuid';
import {ErrorCode} from '../../consts/ErrorCode';
import {TokenApiService} from '../../api/token-api-service';
import {ValidConst} from '../../consts/ValidConst';
import {MemetickInventoryApiService} from '../../api/memetick-inventory-api-service';
import {MemeTextInputComponent} from '../meme-text-input/meme-text-input.component';
import {EPI} from '../../model/EPI';
import {StorageService} from '../../services/storage-service';
import {MemeFilter} from '../../consts/MemeFilter';
import {GlobalConst} from '../../consts/GlobalConst';
import {ImageUtils} from '../../utils/image-utils';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeCreateModalComponent} from '../../modals/meme-create-modal/meme-create-modal.component';
import {LoaderService} from '../../services/loader-service';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  @ViewChild(MemeTextInputComponent) textInput: MemeTextInputComponent;

  public imageFile: File;
  public imgURL: any;

  public fireId: UUID;
  public firePath: string;

  public stateCell: number;
  public dnaCombo: number;
  public epiCell: EPI;

  public stateTitle;
  public stateText;

  public textMeme;

  isHovering = false;
  isPreview = false;
  isCreate = false;
  isAnim = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private memeApi: MemeApiService,
    private tokenApi: TokenApiService,
    private inventoryApi: MemetickInventoryApiService,
    private storage: StorageService,
    private modalService: NgbModal,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit(): void {
    this.checkInfo();

    this.inventoryApi.stateCell().subscribe(data => {
      this.stateCell = data.state;
      this.dnaCombo = data.combo;
      this.epiCell = data.epi;

      if (this.stateCell === GlobalConst.CELL_SATE) {
        this.checkLab();

        this.stateText = 'ДНК комбо = x' + this.dnaCombo;
        this.stateTitle = 'ПЕРЕТАЩИ ИЛИ НАЖМИ';
      } else {
        this.stateText = 'СОСТОЯНИЕ = ' + this.stateCell + '%';
        this.stateTitle = 'КЛЕТКА РАСТЁТ';
      }
    });
  }

  checkInfo() {
    if (this.storage.showCreateInfo()) {
      this.info();
    }
  }

  checkLab() {
    this.route.queryParams.subscribe(params => {
      if (!params.lab) { return; }

      const labMeme = this.storage.loadLabMeme();
      const fileName = 'MemeLab_' +  new Date().valueOf() + '.png';
      const imageBlob = ImageUtils.dataURLtoBlob(labMeme);

      if (imageBlob == null) { return; }

      this.imageFile = new File([imageBlob], fileName, { type: 'image/png' });
      this.imgURL = 'data:image/png;base64,' + labMeme;
      this.isPreview = true;
    });
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  uploadDrop(event) {
    this.upload(event.dataTransfer.files);
  }

  uploadClick(event) {
    this.isAnim = true;
    this.upload(event.target.files);
  }

  private upload(files) {
    if (files.length !== 1) { return; }
    if (files[0].type.match(/image\/*/) == null) { return; }
    if (files[0].size > ValidConst.MAX_MEME_SIZE) { return; }

    this.loaderService.setLoad('Скачиваем ваш мем');

    if (this.stateCell === GlobalConst.CELL_SATE) {
      this.show(files);
    } else {
      this.error('Клетка не выросла!');
    }
  }

  create() {
    if (!this.isPreview || this.isCreate) { return; }

    this.loaderService.setLoad('Загружаем ваш мем');

    this.fireId = UUID.UUID();
    this.firePath = `memes/${this.fireId}`;

    this.memeApi.memeUpload(this.imageFile, this.firePath).then(
      () => {
        this.memeApi.memeLoad(this.firePath).subscribe(url => {
          this.memeApi.memeCreate(this.fireId, url, this.textMeme).subscribe(
            () => { this.createDone(); },
            (error) => { this.createError(error); }
            );
        });
      },
      () => {
        this.error('Ошибка загрузки');
      }
    );
  }

  createDone() {
    this.isCreate = true;
    this.loaderService.setDone('МЕМ создан!');
    this.storage.remMemePage(MemeFilter.POOL);
  }

  createError(error: any) {
    let errorMessage = '';

    if (error.error.code === ErrorCode.CELL_SMALL) {
      errorMessage = 'Клетка не выросла!';
    } else {
      errorMessage = 'Ошибка создания';
    }

    this.error(errorMessage);
  }

  show(files) {
    this.imageFile = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.imageFile);
    reader.onload = () => this.imgURL = reader.result;

    this.isPreview = true;
    this.loaderService.setNone();
  }

  error(message: string) {
    this.loaderService.setError(message);
  }

  memes() {
    this.router.navigateByUrl('/memes');
  }

  close() {
    this.router.navigateByUrl('/home');
  }

  lab() {
    this.router.navigateByUrl('/lab');
  }

  info() {
    this.modalService.open(MemeCreateModalComponent, {'centered': true});
  }

  cancel() {
    this.imageFile = null;
    this.imgURL = null;

    this.isPreview = false;
  }

  showText() {
    this.textInput.show(this.textMeme);
  }

  doneText(textMeme: string) {
    this.textMeme = textMeme;
  }
}
