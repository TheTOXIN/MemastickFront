import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meme-best-comment',
  templateUrl: './meme-best-comment.component.html',
  styleUrls: ['./meme-best-comment.component.scss']
})
export class MemeBestCommentComponent implements OnInit {

  @Input()
  public comment;

  constructor() { }

  ngOnInit() {
  }
}
