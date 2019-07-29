import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InviteApiService} from '../../api/invite-api-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.router.navigateByUrl('/pages/invite-reg');
  }
}
