/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    Galleria.loadTheme('assets/libs/galleria/themes/classic/galleria.classic.js');
    Galleria.run('.galleria', {
        wait: true
    });

    $('.portfolio-link').click(function() {
        var id = $(this).data('id');
        var $galleria = $('#portfolioModal' + id).find('.galleria').data('galleria');
        var imageList = $('#portfolioModal' + id).find('.image-url');
        var length = imageList.length;
        var dataList = [];
        imageList.map(function(i, imageUrl) {
          var imgPath = $(imageUrl).data('imageurl');

          dataList.push({
              thumb: imgPath,
              image: imgPath,
              big: imgPath
          });
        });
        $galleria.load(dataList);

        $('.galleria-image').on('click', function() {
            $galleria.toggleFullscreen();
        });
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
    var modal = this;
    var hash = modal.id;
    window.location.hash = hash;
    window.onhashchange = function() {
        if (!location.hash) {
            $(modal).modal('hide');
        }
    }
});
