$(document).ready(function () {
    // Pour chaque icône météo, ajoute la classe correspondante et applique l'image de fond
    $('.weather-icon').each(function () {
        var weatherIcon = $(this).attr('data');
        var baseUrl = $(this).closest('.meteo').find('.temperature-contain').data('url');
        var iconPath = baseUrl + weatherIcon + '.jpeg';

        // Ajoute une classe basée sur l'icône météo
        $(this).closest('.meteo').find('.temperature-contain').addClass('weather-' + weatherIcon);

        // Applique l'image de fond
        $(this).closest('.meteo').find('.temperature-contain').css({
            'background-image': 'url(' + iconPath + ')',
            'background-size': 'cover'
        });

        // Traduction de l'icône météo pour afficher dans le weather
        var weatherTranslation;
        switch (weatherIcon) {
            case 'clear-day':
                weatherTranslation = 'Clair';
                break;
            case 'Cloudy':
                weatherTranslation = 'Nuageux';
                break;
            case 'fog':
                weatherTranslation = 'Brouillard';
                break;
            case 'partly-cloudy-day':
                weatherTranslation = 'Mi-couvert';
                break;
            case 'rain':
                weatherTranslation = 'Pluie';
                break;
            case 'sleet':
                weatherTranslation = 'Verglas';
                break;
            case 'snow':
                weatherTranslation = 'Neige';
                break;
            case 'wind':
                weatherTranslation = 'Vent';
                break;
            default:
                weatherTranslation = 'Undefined';
                break;
        }

        // Affiche la traduction dans le div .weather-trad
        $(this).closest('.weather-icon-contain').find('.weather-trad').text(weatherTranslation);
    });

    // ****** SCEA
    // Voir plus SCEA
    $(".list-scea").hide();
    $(".list-scea").slice(0, 10).show();

    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".list-scea:hidden").slideDown();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".list-scea").not(":lt(10)").slideUp();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // ****** Galerie carroussel actions
    // Limiter le nombre d'items à 6
    var items = $('.slider-gallery img').slice(0, 6);
    $('.slider-gallery').empty().append(items);

    // Fonction pour mettre à jour la div avec l'image active
    function updateBigPhotoContain() {
        var $activeItem = $('.slider-gallery .owl-item.active');
        var $prevItem = $activeItem.prev('.owl-item');
        var $nextItem = $activeItem.next('.owl-item');
        var activeImage = $activeItem.find('img');

        // Retirer l'ancienne classe active pour réinitialiser l'état
        $('#active-image').removeClass('active').addClass('fade-out');

        setTimeout(function () {
            if (activeImage.length) {
                $('#active-image').attr('src', activeImage.attr('src'))
                    .attr('alt', activeImage.attr('alt'));

                // Ajouter la classe active pour déclencher le zoom
                setTimeout(function () {
                    $('#active-image').removeClass('fade-out').addClass('active');
                }, 50);
            }
        }, 400);

        // Retirer les classes supplémentaires des éléments
        $('.slider-gallery .owl-item').removeClass('active prev-active next-active');

        // Ajouter les classes nécessaires
        $activeItem.addClass('active');
        $prevItem.addClass('prev-active');
        $nextItem.addClass('next-active');
    }

    // Sélectionne l'image active au chargement
    setTimeout(function () {
        updateBigPhotoContain();
    }, 200);

    // Gestion du clic sur une image
    $('.slider-gallery').on('click', 'img', function () {
        $('.slider-gallery .owl-item').removeClass('active prev-active next-active');
        
        $(this).closest('.owl-item').addClass('active');
        
        updateBigPhotoContain();
    });

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });

    // Détecter le changement dans Owl Carousel pour le .active
    $('.vouchers-slider').on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index;

        // Sélectionner l'élément actif dans le slider
        var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.contain-global-presta');

        if (activeSlide.length) {
            var activeId = activeSlide.attr('id');
            console.log("Élément actif dans le slider :", activeId);

            $('.all-prices-vouchers a').removeClass('active');

            $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

        }
    });
});

// ****** Pour transtion fluide vers les links
// Fonction pour faire défiler avec un offset de -170px lors du clic sur les liens d'ancre internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ne pas appliquer l'offset pour ces liens
        if (this.classList.contains('no-offset-scroll')) {
            return;
        }

        e.preventDefault();
        const target = this.getAttribute('href');
        scrollToAnchorWithOffset(target);
    });
});

// Fonction de défilement fluide avec offset
function scrollToAnchorWithOffset(anchor) {
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 170;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Affichage immédiat à -170px lors du chargement de la page si une ancre est présente dans l'URL
window.addEventListener('load', () => {
    const anchor = window.location.hash;
    if (anchor) {
        scrollToAnchorInstantWithOffset(anchor);
    }
});

// Fonction pour ajuster l'affichage immédiat à -170px
function scrollToAnchorInstantWithOffset(anchor) {
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 170; 
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

$(document).ready(function () {
    $('.slider-meteo').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: true,
                nav: false,

            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: true,
                nav: false,
            },
        }
    });
    $('.slider-options').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        animateOut: 'slideOutDown',
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        animateOut: 'slideOutDown',
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-gallery').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 8,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                items: 1,
                margin: 16,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,

            },
            1220: {
                items: 1,
                margin: 16,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.slider-giftcards').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        animateOut: 'slideOutDown',
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        margin: 0,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
});