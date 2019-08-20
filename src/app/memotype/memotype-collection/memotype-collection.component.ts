import { Component, OnInit } from '@angular/core';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors} from '../../consts/MemotypeData';
import {memotypeNames} from '../../consts/MemotypeData';

@Component({
  selector: 'app-memotype-collection',
  templateUrl: './memotype-collection.component.html',
  styleUrls: ['./memotype-collection.component.scss']
})
export class MemotypeCollectionComponent implements OnInit {

  public collection: MemotypeSet[] = [];

  public memotypeColors;
  public memotypeNames;

  isLoad = true;

  constructor(
    private memotypeApi: MemotypeApiService
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.memotypeApi.collection().subscribe(data => {
      this.collection = data.content;
      this.isLoad = false;
    });
  }
}
