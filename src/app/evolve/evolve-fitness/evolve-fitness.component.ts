import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {TokenType} from '../../consts/TokenType';
import {MemeLikeApiService} from '../../api/meme-like-api-service';
import {MemeLoh} from '../../model/meme/MemeLoh';
import {MemeLohApiService} from '../../api/meme-loh-api-service';

@Component({
  selector: 'app-evolve-fitness',
  templateUrl: './evolve-fitness.component.html',
  styleUrls: ['./evolve-fitness.component.scss']
})
export class EvolveFitnessComponent implements OnInit {

  @ViewChild(AcceptComponent) tokenAccept: AcceptComponent;

  public status;
  public message;
  public type;
  public img;

  public loh: MemeLoh;
  public lohLoad = false;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private tokenAcceptApi: TokenAcceptApiService,
    private memeLohApi: MemeLohApiService
  ) {
    this.type = TokenType.SCOPE;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
    this.memeLohApi.read(this.evolve.memeId).subscribe(data => {
      this.loh = data;
      this.lohLoad = true;
    });
  }

  acceptTokenResult(accept: boolean) {

  }
}
