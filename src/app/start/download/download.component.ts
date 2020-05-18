import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  toLab() {
    this.router.navigateByUrl('/lab');
  }
}
