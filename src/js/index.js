$(document).ready(Core);

function Core()
{
    InitOwl();
    InitSimpleLightbox();
    InitValidator();

    SetTabSwitcher();
    SetModal();
    SetMoreRecomended();
    SetMobile();
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })

    let activeTabArray = $('.tab.active');
    activeTabArray.each(function (index) {
        console.log()
        $(activeTabArray[index]).parent('.tab__viewer').css('height', $(activeTabArray[index]).outerHeight());
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function InitOwl()
{
    $('section.banner__slider .owl-carousel').owlCarousel({
        items: 1,
        dotsContainer: $('section.banner__slider .owl-dots')
    })

    $('section.our__partners .owl-carousel').owlCarousel({
        items: 4,
        dots: false,
        navContainer: $('section.our__partners .owl-nav'),
        responsive: {
            1024: {
                items: 4
            },
            768: {
                items: 3
            },
            576: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    })

    $('section.info__section .owl-carousel').owlCarousel({
        items: 1,
        navContainer: $('section.info__section .title__wrapper .owl-nav'),
    })

    let productPreviewSlider = $('section.catalog__info .images__wrapper');
    let productImagesSlider = $('section.catalog__info .images__slider');
    let syncedSecondary = true;

    productPreviewSlider.owlCarousel({
        items: 1,
        nav: false,
        dots: false,

    }).on('changed.owl.carousel', syncPosition);

    productImagesSlider.on('initialized.owl.carousel', function() {
        productImagesSlider.find(".owl-item").eq(0).addClass("current");
    }).owlCarousel({
        items: 4,
        nav: false,
        dots: false,
        responsive: {
            1042: {
                items: 4
            },
            992: {
                items: 3
            },
            0: {
                items: 3
            }
        }
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        //var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        let current = el.item.index;
        console.log(current);
        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        productImagesSlider
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = productImagesSlider.find('.owl-item.active').length - 1;
        var start = productImagesSlider.find('.owl-item.active').first().index();
        var end = productImagesSlider.find('.owl-item.active').last().index();

        if (current > end) {
            productImagesSlider.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            productImagesSlider.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            productPreviewSlider.data('owl.carousel').to(number, 100, true);
        }
    }

    productImagesSlider.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        productPreviewSlider.data('owl.carousel').to(number, 300, true);
    });

    $('section.catalog__slider .owl-carousel').owlCarousel({
        items: 3,
        nav: true,
        navContainer: $('section.catalog__slider .owl-nav'),
        responsive: {
            1024: {
                items: 3
            },
            768: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    })
}

function SetMoreRecomended()
{
    $('section.recomended .btn__wrapper .btn').on('click', function() {
        let height = $('section.recomended .more__block .products__wrapper').height();
        $('section.recomended .more__block').height(height);
        $('section.recomended .btn__wrapper').fadeOut();
    });
}

function InitSimpleLightbox()
{
    $('section.about__us .col__video').simpleLightbox();
    $('section.catalog__info .images__wrapper a').simpleLightbox();
}

function InitValidator()
{
    $.validator.addMethod('checkPhone', function(value, element) {
        return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
    })

    let validateSetting = {
        rules: {
            phone: {
                checkPhone: true
            }
        },
        messages: {
            phone: {
                checkPhone: "Введите полный номер телефона"
            }
        },
        submitHandler: SubmitForm
    }

    $('section.ask_us form.question__form').validate(validateSetting);
    $('form input[name=phone]').mask("+7(999)999-9999", {autoclear: false});
}

function SubmitForm()
{
    console.log('valid');
}

function SetMobile()
{
    $('.mobile__menu__wrapper .catalog__title').on('click', function() {
        !$('.mobile__menu__wrapper .catalog__wrapper').hasClass('active') ? $('.mobile__menu__wrapper .catalog__wrapper').addClass('active') : $('.mobile__menu__wrapper .catalog__wrapper').removeClass('active');
    });

    $('.btn__mobile__menu').on('click', function() {
        $('.mobile__menu__wrapper').addClass('active');
        $('body').addClass('lock');
    })

    $('.btn__menu__close').on('click', function () {
        $('.mobile__menu__wrapper').removeClass('active');
        $('body').removeClass('lock')
    })
}