import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  // DomSanitizer for safe html content.
  constructor(private _sanitizer:DomSanitizer) { }

  ngOnInit() { }

  // Pricing Carousel
    public price = [{
      image: 'assets/images/roadmap/chain.png',
      type: 'Basic',
        price: '30',
        duration: 'year',
        feature: this._sanitizer.bypassSecurityTrustHtml('BLOCKCHAIN'),
      },{
      image: 'assets/images/roadmap/ai.png',
        type: 'Standard',
        price: '50',
        duration: 'year',
        feature: this._sanitizer.bypassSecurityTrustHtml('AI'),
      },{
      image: 'assets/images/roadmap/clans.png',
        type: 'Premium',
        price: '100',
        duration: 'year',
        feature: this._sanitizer.bypassSecurityTrustHtml('CLANS'),
      }
      ]


    // Pricing Carousel Options
	public pricingCarousel: any ={
	    loop:false,
        items:3,
        margin:15,
        navClass: ['owl-prev', 'owl-next'],
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1,
                nav:false,
                dots:true
            },
            600:{
                items:2,
                nav:false,
                dots:true
            },
            767:{
                items:2,
                nav:false,
                dots:true
            },
            992:{
                items:3,
                nav:false,
                dots:true
            },
            1000:{
                items:3,
                nav:true,
                dots:false               
            }
        }
	}

}
