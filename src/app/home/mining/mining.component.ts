import { Component, OnInit } from '@angular/core';
import {BlockCoinsApiService} from '../../api/block-coins-api-service';
import {GlobalConst} from '../../consts/GlobalConst';
import {Router} from '@angular/router';

const shajs = require('sha.js');

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {

  public hash: string;
  public target: string;
  public nonce: number;
  public cache: number;

  isLoad = true;
  textTitle = 'МАЙНИНГ';

  constructor(
    private blockApi: BlockCoinsApiService,
    private router: Router
  ) {
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
    const nonce = this.nonce;

    const mineHash = shajs('sha256')
      .update(this.hash + nonce)
      .digest('hex');
    this.textTitle = mineHash;

    if (mineHash.startsWith(this.target)) {
      this.mine(nonce);
    }
    this.nonce++;
  }

  private make() {
    this.isLoad = true;
    this.blockApi.makeBlock().subscribe(data => {
      this.hash = data.hash;
      this.nonce = 0;
      this.isLoad = false;
    });
  }

  private mine(nonce: number) {
    this.isLoad = true;
    this.blockApi.mineBlock(nonce).subscribe((data) => {
        this.cache++;
        this.hash = data.hash;
        this.isLoad = false;
    });
  }

  public flush() {
    if (this.cache === 0) { return; }

    this.isLoad = true;
    this.blockApi.flushBlock().subscribe().add(() => {
      this.isLoad = false;
      this.router.navigateByUrl('/home');
    });
  }
}
