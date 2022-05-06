$('.banner-carousel').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    autoplayTimeout: 6000,
    responsive:{
        0:{ items: 1 }
    }
});

$('.doctor-carousel').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    margin: 25,
    smartSpeed: 1000,
    autoplayTimeout: 6000,
    responsive:{
        0:{
            items:1,
            nav:false,
        },
        576:{
            items:2,
        },
        992:{
            items:3,
        },
        1200:{
            items:4,
        }
    }
});