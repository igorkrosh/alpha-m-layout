$(document).ready(Core);

function Core()
{
    InitOwl();
    InitSimpleLightbox();
    InitValidator();

    SetTabSwitcher();
    SetModal();
    SetMoreRecomended();
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
        navContainer: $('section.our__partners .owl-nav')
    })

    $('section.info__section .owl-carousel').owlCarousel({
        items: 1,
        navContainer: $('section.info__section .title__wrapper .owl-nav'),
    })
}

function SetMoreRecomended()
{
    $('section.recomended .btn__wrapper .btn').on('click', function() {
        let height = $('section.recomended .more__block .recomended__wrapper').height();
        $('section.recomended .more__block').height(height);
        $('section.recomended .btn__wrapper').fadeOut();
    });
}

function InitSimpleLightbox()
{
    $('section.about__us .col__video').simpleLightbox();
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