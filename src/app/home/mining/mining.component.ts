import {Component, OnInit} from '@angular/core';
import {BlockCoinsApiService} from '../../api/block-coins-api-service';
import {GlobalConst} from '../../consts/GlobalConst';
import {Router} from '@angular/router';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {ErrorCode} from '../../consts/ErrorCode';
import {Pickaxe} from '../../model/Pickaxe';
import {MemetickInventoryApiService} from '../../api/memetick-inventory-api-service';
import {LoaderService} from '../../services/loader-service';

const shajs = require('sha.js');

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss'],
  animations: [
    trigger('bounceAnim', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate(150, keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.3)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ]),
    trigger('moveAnim', [
      transition('* => *', [
        animate(300, style({ transform: 'translateY(100%) scale(0.1)', opacity: 0 }))
      ])
    ]),
    trigger('rotateAnim', [
      transition('right => left', [
        animate(150, style({ transform: 'rotate(-140deg)'})),
        animate(300, style({ transform: 'rotate(-45deg)'}))
      ]),
      transition('left => right', [
        animate(150, style({ transform: 'rotate(60deg)'})),
        animate(300, style({ transform: 'rotate(-45deg)'}))
      ])
    ])
  ]
})
export class MiningComponent implements OnInit {

  private audio = new Audio();

  private tapMax = 1;
  private tapCount = 0;

  public pickaxe: Pickaxe;
  public loadPickaxe: boolean;

  public hash: string;
  public target: string;

  public nonce: number;
  public cache: number;

  textTitle = 'МАЙНИНГ';
  hashTitle = '';

  tapState = 'default';
  rotateState = 'right';

  isMake = false;
  isMine = false;
  isBroke = false;
  isDone = false;
  isFlush = false;

  BLOCK_NONCE = GlobalConst.BLOCK_NONCE;

  constructor(
    private loaderService: LoaderService,
    private blockApi: BlockCoinsApiService,
    private inventoryApi: MemetickInventoryApiService,
    private router: Router
  ) {
    this.audio.src = '../../../assets/audio/stone.wav';
    this.audio.load();

    this.loadPickaxe = false;

    this.nonce = 0;
    this.cache = 0;
    this.target = '';

    for (let i = 0; i < GlobalConst.BLOCK_DFCLT; i++) {
      this.target += '0';
    }
  }

  ngOnInit() {
    this.make();
  }

  public tap() {
    this.rotateState = (this.rotateState === 'right' ? 'left' : 'right');
    if (!this.isMine) { this.tapState = (this.tapState === 'default' ? 'tap' : 'default'); }

    this.tapCount++;
    if (this.isMine || this.tapCount < this.tapMax) { return; }
    this.tapCount = 0;

    const nonce = this.nonce;
    const mineHash = this.sha(this.hash + nonce);
    this.hashTitle = mineHash;

    if (mineHash.startsWith(this.target)) {
      this.hash = mineHash;
      this.mine(nonce);
    }
    this.nonce++;
  }

  public accept() {
    if (!this.isMine) { return; }

    this.textTitle = 'МАЙНИНГ';
    this.isMine = false;
    this.isBroke = false;
    this.cache++;
  }

  public getPickaxe() {
    this.inventoryApi.getPickaxe().subscribe(data => {
      this.pickaxe = data;
      this.loadPickaxe = true;
      this.textTitle = 'Жмите на кирку';
    });
  }

  private make() {
    this.isMake = false;
    this.blockApi.makeBlock().subscribe(data => {
      this.hash = data.hash;
      this.isMake = true;
    }, (data) => this.error(data.error, 'Ошибка создания блока'));
  }

  private mine(nonce: number) {
    this.isMine = true;
    this.blockApi.mineBlock(nonce).subscribe(() => {
      this.audio.play();
      this.isBroke = true;
      this.textTitle = 'Заберите монету';
      this.hash = this.sha(this.hash);
      this.nonce = 0;
    }, (data) => this.error(data.error, 'Ошибка майнинга блока'));
  }

  public flush() {
    if (this.cache === 0) { this.toHome(); return; }
    if (this.isFlush) { return; }

    this.loaderService.setLoad('Подтверждение транзакции');
    this.isFlush = true;

    this.blockApi.flushBlock(this.pickaxe.token).subscribe(
      () => this.flushSuccess(),
      (data) => this.error(data.error, 'Ошибка транзакции'),
      () => this.isFlush = true
    );
  }

  flushSuccess() {
    this.loaderService.setDoneEvent(
      'Успешно!',
      () => this.toHome()
    );
    this.isDone = true;
  }

  private broke() {
    this.audio.play();
    this.textTitle = 'Кирка сломалась';
    this.pickaxe.have = false;
    this.pickaxe.receipt = ' 01:00:00';
    this.isMine = false;
  }

  error(error: any, txt: string) {
    if (error.code === ErrorCode.MINE_FAIL) {
      this.loaderService.setError(txt);
    } else if (error.code === ErrorCode.MINE_END) {
      this.broke();
    }
  }

  private sha(data): string {
    return shajs('sha256')
      .update(data)
      .digest('hex');
  }

  private toHome() {
    this.router.navigateByUrl('/home');
  }
}
