import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeApiService} from '../../api/meme-api-service';
import {UUID} from 'angular2-uuid';
import {LoaderStatus} from '../../consts/LoaderStatus';
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
import {ChangeAvatarModalComponent} from '../../modals/change-avatar-modal/change-avatar-modal.component';
import {AlgorithmModalComponent} from '../../modals/algorithm-modal/algorithm-modal.component';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  @ViewChild(MemeTextInputComponent) textInput: MemeTextInputComponent;

  public status;
  public message;

  public imageFile: File;
  public imgURL: any;

  public fireId: UUID;
  public firePath: string;

  public stateCell: number;
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
  ) {
    this.status = LoaderStatus.NONE;
    this.message = '';
  }

  ngOnInit(): void {
    this.inventoryApi.stateCell().subscribe(data => {
      this.stateCell = data.state;
      this.epiCell = data.epi;

      if (this.stateCell === GlobalConst.CELL_SATE) {
        this.checkLab();

        this.stateText = 'КЛЕТКА ГОТОВА';
        this.stateTitle = 'ПЕРЕТАЩИ ИЛИ НАЖМИ';
      } else {
        this.stateText = 'СОСТОЯНИЕ = ' + this.stateCell + '%';
        this.stateTitle = 'КЛЕТКА РАСТЁТ';
      }
    });
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
    console.log('test');
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

    this.status = LoaderStatus.LOAD;

    if (this.stateCell === GlobalConst.CELL_SATE) {
      this.show(files);
    } else {
      this.error('Клетка не выросла!');
    }
  }

  create() {
    if (!this.isPreview || this.isCreate) { return; }
    this.status = LoaderStatus.LOAD;

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
    this.status = LoaderStatus.DONE;
    this.message = 'МЕМ создан!';
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
    this.status = LoaderStatus.NONE;
  }

  error(message: string) {
    this.message = message;
    this.status = LoaderStatus.ERROR;
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
    this.modalService.open(AlgorithmModalComponent, {'centered': true});
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
