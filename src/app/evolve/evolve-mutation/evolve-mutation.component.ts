import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptComponent} from '../../token/token-accept/token-accept.component';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';

@Component({
  selector: 'app-evolve-mutation',
  templateUrl: './evolve-mutation.component.html',
  styleUrls: ['./evolve-mutation.component.scss']
})
export class EvolveMutationComponent implements OnInit {

  @ViewChild(TokenAcceptComponent) tokenAccept: TokenAcceptComponent;

  public status;
  public message;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.status = LoaderStatus.NONE;
    this.message = '';
  }

  ngOnInit() {
  }
}