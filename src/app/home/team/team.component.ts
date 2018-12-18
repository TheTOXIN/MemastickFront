import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

// DomSanitizer for safe html content.
    constructor(private _sanitizer:DomSanitizer) { }

    // Team Carousel
    public team = [{
        image: 'assets/images/info/1.png',
        social: this._sanitizer.bypassSecurityTrustHtml('MEMCOIN'),
        message: 'баблишко',
        description: 'бабалбалабалба',
        borderColor: 'gold'
      }, {
        image: 'assets/images/info/2.png',
        social: this._sanitizer.bypassSecurityTrustHtml('BATTLE'),
        message: 'пвп или засал?',
        description: 'бабалбалабалба',
        borderColor: '#999999'
      }, {
        image: 'assets/images/info/3.png',
        social: this._sanitizer.bypassSecurityTrustHtml('MEMOTYPE'),
        message: 'собери их всех',
        description: 'балбалабалбалба',
        borderColor: 'cornflowerblue'
      }, {
        image: 'assets/images/info/3.png',
        social: this._sanitizer.bypassSecurityTrustHtml('MOTIVATORS'),
        message: 'это все тебе',
        description: 'балбалабалбалба',
        borderColor: '#960015'
    }];

     public current = this.team[0];

    changeCurrent(team: any) {
      this.current = team;
    }

    // Team Carousel Options
	public teamCarousel: any ={
	      loop:true,
        margin:15,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2,
                margin:12
            },
            600:{
                items:2
            },
            767:{
                items:2
            },
            768:{
                items:2,
                margin:15
            },
            992:{
                items:3
            },
            1000:{
                items:3
            }
        }
	}



}
