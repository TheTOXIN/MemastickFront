import {Component, Input, OnInit} from '@angular/core';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-meme-type-select',
  templateUrl: './meme-type-select.component.html',
  styleUrls: ['./meme-type-select.component.scss']
})
export class MemeTypeSelectComponent implements OnInit {

  @Input()
  public meme: Meme;

  public chance: number;

  isChance = false;

  constructor(
    public evolveApi: EvolveMemeApiService,
  ) {

  }

  ngOnInit() {
    this.computeChance();
  }

  computeChance() {
    this.evolveApi.evolveMemeChance(this.meme.id).subscribe(chance => {
      this.chance = chance;
      this.isChance = true;
    });
  }
}
