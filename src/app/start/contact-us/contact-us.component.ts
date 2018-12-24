import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InviteService} from '../../services/invite-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: InviteService,
    private router: Router
  ) {
  }

  // Form Validator
  ngOnInit() {
    this.contactForm = this.fb.group({
      nick: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ])],
      email: ['', Validators.email],
    });
  }

  onSubmit() {
    this.service.sendInvite(
      this.contactForm.value.email,
      this.contactForm.value.nick
    );
    this.router.navigateByUrl('/pages/thank-you');
  }

}
