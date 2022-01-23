// navigation
function navigationScroll() {
    var barScrollRight = document.querySelector('.nav_scroll-right')
    var barScrollLeft = document.querySelector('.nav_scroll-left')
    var slickNav = document.querySelector('.container_category')

    barScrollRight.onclick = function() {
        barScrollRight.classList.remove('active')
        barScrollLeft.classList.add('active')
        
        // cách 1:
        slickNav.style.transform = "translateX(-990px)";

        // cách 2:
        // slickNav.classList.add('scrollRight')
        // slickNav.classList.remove('scrollLeft')
    }

    barScrollLeft.onclick = function() {
        barScrollLeft.classList.remove('active')
        barScrollRight.classList.add('active')

        slickNav.style.transform = "translateX(0)";


        // slickNav.classList.add('scrollLeft')
        // slickNav.classList.remove('scrolRight')
    }
}

navigationScroll();

// intro
$(document).ready(function(){
    $('.contain_intro-wrap').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        draggable: false,
        prevArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-prev pull-left'>",
        nextArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-next pull-right'>",
        dots: true,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    dots: false,
                }
            }
        ]
    });
});

$(document).ready(function(){
    $('.contain-box .row.sm-gutter').slick({
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        draggable: false,
        prevArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-prev pull-left'>",
        nextArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-next pull-right'>",
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    })
});

$(document).ready(function(){
    $('.contain_genuine-boxWrap .row.sm-gutter').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        draggable: false,
        prevArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-prev pull-left'>",
        nextArrow:"<img src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-next pull-right'>",
        dots: true,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    })
});

$(document).ready(function(){
    $('.contain_trend-items .row.sm-gutter').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false,
        prevArrow:"<button src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-prev pull-left'><i class='fas fa-angle-left'></i></button>",
        nextArrow:"<button src='https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png' type='button' class='slick-next pull-right'><i class='fas fa-angle-right'></i></button>",
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    })
});

