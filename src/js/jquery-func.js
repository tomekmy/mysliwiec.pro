// Hide email address from spam bots
(function ($) {
  $.fn.hideEmail = function (user, site, tag) {
    user = user || 'user';
    site = site || 'site.com';
    tag = tag || user + '&#064;' + site;
    this.each(function () {
      var string = '<a href="&#109;&#097;&#105;&#108;&#116;&#111;:' + user + '&#064;' + site + '">' + tag + '</a>';
      $(this).prepend(string);
    });
  };

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

function langButton (lang) {
  if (lang === 'pl') {
    $('.footer__lang-icon div').attr('title', 'Switch language').text('EN').css('left', '0.33em');
  } else {
    $('.footer__lang-icon div').attr('title', 'Zmień język').text('PL').css('left', '0.41em');
  }
}

$(document).ready(function () {
  if (window.userLang === 'pl') {
    $.cookieInfo();
  } else {
    $.cookieInfo({info: 'I use cookes technology for statistical purposes only.', close: 'OK'});
  }
  $('.header__logo h2').textillate({ in: { effect: 'fadeInLeftBig' } });
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

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

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

$(window).resize(function () {
  var footerPos = 0;
  $('.footer').css('bottom', footerPos + 'px');
  if ($(document).height() > $(window).height()) {
    footerPos = $(window).height() - $(document).height() - 40;
  }
  $('.footer').css('bottom', footerPos + 'px');
});
