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

// Switch language button text
function langButton (lang) {
  if (lang === 'pl') {
    $('.footer__lang-icon div').attr('title', 'Switch language').text('EN').css('left', '0.33em');
  } else {
    $('.footer__lang-icon div').attr('title', 'Zmień język').text('PL').css('left', '0.41em');
  }
}

$(document).ready(function () {
  // Depends on user language displays polish or english cookie info message
  if (window.userLang === 'pl') {
    $.cookieInfo();
  } else {
    $.cookieInfo({info: 'I use cookies technology for statistical purposes only.', close: 'OK'});
  }
  // Logo textillate animation
  $('.header__logo h2').textillate({ in: { effect: 'fadeInLeftBig' } });
  // Footer hide email address
  $('.footer__icons').hideEmail('tomek', 'mysliwiec.pro', '<div class="circle"><div class="email"></div></div>');

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
      var topButtonShift = $(document).height() - $(this).height() - $('.footer').height();
      if ($(this).scrollTop() > topButtonShift) {
        $('.scrollup').css('bottom', $(this).scrollTop() - topButtonShift + 20 + 'px');
      } else {
        $('.scrollup').css('bottom', '1.25em');
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

// Fit footer position on every window resize
$(window).resize(function () {
  var footerPos = 0;
  $('.footer').css('bottom', footerPos + 'px');
  if ($(document).height() > $(window).height()) {
    footerPos = $(window).height() - $(document).height() - 40;
  }
  $('.footer').css('bottom', footerPos + 'px');
  $('.scrollup').css('bottom', '1.25em');
});
