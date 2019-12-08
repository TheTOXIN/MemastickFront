/*-----------------------------------------------------------------------------------

 Template Name:Chatloop APP
 Template URI: themes.pixelstrap.com/frontmem
 Description: This is App Landing Page
 Author: Pixelstrap
 Author URI: https://themeforest.net/user/pixelstrap

 -----------------------------------------------------------------------------------*/
"use strict";
$(document).ready(function () {


  /*----------------------------------------
   mobile menu nav click hide collapse
   ----------------------------------------*/
  var mobile_menu = $(window).width();
  if (mobile_menu < 991) {
    $("nav a.nav-link").on('click', function (event) {
      if (!$(this).hasClass('dropdown-toggle')) {
        $(".navbar-collapse").collapse('hide');
      }
    });
  }

  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;
  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  /*------------------------
   Tap to top
   --------------------------*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 600) {
      $('.tap-top').fadeIn();
    } else {
      $('.tap-top').fadeOut();
    }
  });
  $('.tap-top').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /*------------------------
   Intro slider
   --------------------------*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 600) {
      $('.intro-slider').fadeOut();
    }
  });
  $('.intro-slider').on('click', function () {
    $("html, body").animate({
      scrollTop: 610
    }, 1000);
    return false;
  });

  /*------------------------
   How it Work
   --------------------------*/
  $(".work-link").on('click', function (event) {
    $('.nav-item').removeClass('active');
    $(this).parent().addClass('active');
  });

  /*----------------------
   Screen slider
   -------------------------*/
  var swiper = new Swiper('.swiper-screenshots-container-1', {
    effect: 'coverflow',
    grabCursor: true,
    initialSlide: 0,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
    slidesPerView: 4,
    pagination: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1.43,
      slideShadows: true,
    },
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
        coverflowEffect: {
          depth: 50,
          modifier: 0,
        },
      },
      640: {
        slidesPerView: 3,
        coverflowEffect: {
          depth: 80,
          modifier: 0,
        },
      }
    }
  });

  $('img').bind('contextmenu', function(e) {
    return false;
  });

});






