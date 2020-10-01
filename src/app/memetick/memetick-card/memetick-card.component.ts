import {Component, Input, OnInit} from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {MemetickProfile} from '../../model/memetick/MemetickProfile';
import {CardOptions} from '../../options/card-options';
import {Router} from '@angular/router';
import {CardState} from '../../state/card-state.service';
import {Memetick} from '../../model/memetick/Memetick';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemotypesReadComponent} from '../../memotype/memotypes-read/memotypes-read.component';
import {CardService} from '../../services/card-service';

@Component({
  selector: 'app-memetick-card',
  templateUrl: './memetick-card.component.html',
  styleUrls: ['./memetick-card.component.scss']
})
export class MemetickCardComponent implements OnInit {

  @Input()
  public options: CardOptions;

  memetick: Memetick;
  isLoad = false;

  constructor(
    private router: Router,
    private state: CardState,
    private cardService: CardService,
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.memetickApi.read(this.options.memetickId).subscribe(data => {
      this.memetick = data;
      this.isLoad = true;
    });
  }

  profile() {
    this.router.navigate(['/memetick', this.memetick.id]);
    this.state.modal.close();
  }

  memotypes() {
    this.cardService.open({
      content: MemotypesReadComponent,
      memotypes: {
        memetickId: this.memetick.id
      }
    });
  }

  memes() {
    this.router.navigate(['/memes'], {
      queryParams: {
        memetick: this.memetick.id ,
        filter: MemeFilter.USER
      }
    });
  }
}
