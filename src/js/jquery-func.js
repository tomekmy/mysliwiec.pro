// Hide email address from spam bots plugin
(function ($) {
  $.fn.hideEmail = function (user, site, tag) {
    user = user || 'user';
    site = site || 'site.com';
    tag = tag || user + '&#064;' + site;
    this.each(function () {
      var string = '<a href="&#109;&#097;&#105;&#108;&#116;&#111;:' + user + '&#064;' + site + '" title="E-mail address">' + tag + '</a>';
      $(this).prepend(string);
    });
  };

  // Cookie info plugin
  $.cookieInfo = function (options) {
    options = $.extend({
      cookieInfo: 'cookie-info',
      info: 'Używam technologii cookies tylko dla celów statystycznych.',
      close: 'Rozumiem'
    }, options || {});

    if (!localStorage.cookieInfo) {
      $('body').append('<div class="' + options.cookieInfo + '"><span>' + options.info + '</span> <a class="' + options.cookieInfo + '__button" href="#">' + options.close + '</a></div>');
      $('.' + options.cookieInfo + '__button').on('click', function (e) {
        e.preventDefault();
        localStorage.cookieInfo = true;
        $(this).parent().remove();
      });
    }
  };
})(jQuery);

// Preload images function
function preloadImage (url) {
  var img = new Image();
  img.src = url;
}

// Switch language button text
function langButton (lang) {
  if (lang === 'pl') {
    $('.footer__lang-icon img').attr('src', 'img/en_icon_black.svg');
  } else {
    $('.footer__lang-icon img').attr('src', 'img/pl_icon_black.svg');
  }
}

$(document).ready(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function () { console.log('Service Worker Registered'); });
  }

  preloadImage('img/spinner-animation.gif');

  // Depends on user language displays polish or english cookie info message
  if (window.userLang === 'pl') {
    $.cookieInfo();
  } else {
    $.cookieInfo({info: 'I use cookies technology for statistical purposes only.', close: 'OK'});
  }
  // Logo textillate animation
  $('.header__logo h2').textillate({ in: { effect: 'fadeInLeftBig' } });
  // Footer hide email address
  $('.footer__icons').hideEmail('tomek', 'mysliwiec.pro', '<img src="img/mail_icon_black.svg" alt="E-mail">');

  langButton(window.userLang);

  $('.footer__lang-icon').click(function () {
    if (window.userLang === 'pl') {
      window.localStorage.userLang = 'en';
    } else {
      window.localStorage.userLang = 'pl';
    }
    window.location.reload();
  });

  // Show scroll to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
      var topButtonShift = $(document).height() - window.innerHeight - $('.footer').height();
      if ($(this).scrollTop() > topButtonShift) {
        $('.scrollup').css('bottom', '5.5em');
      } else {
        $('.scrollup').css('bottom', '1.1em');
      }
    } else {
      $('.scrollup').fadeOut();
    }
  });

  // Scroll to top on click
  $('.scrollup').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  // Hide small menu icon
  $('.menu__icon').click(function () {
    $(this).toggleClass('menu__icon--change');
    $('.menu__items').toggle(400);
  });

  $(window).on('click scroll', function () {
    if ($('.menu__icon').hasClass('menu__icon--change') && !$('.menu__items').is(':animated')) {
      $('.menu__icon').removeClass('menu__icon--change');
      $('.menu__items').fadeOut(400);
    }
  });
});
