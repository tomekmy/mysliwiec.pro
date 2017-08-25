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
})(jQuery);

function langButton (lang) {
  if (lang === 'pl') {
    $('.lang-icon div').attr('title', 'Switch language').text('EN').css('left', '4px');
  } else {
    $('.lang-icon div').attr('title', 'Zmień język').text('PL').css('left', '5px');
  }
}

$(document).ready(function () {
  var dataJSON = $.getJSON(window.languageFile);
  dataJSON.done(function (data) {
    $.each(data.menu, function (key, val) {
      $('nav ul').append('<li ng-class="{active: nav.isActive(\'/' + key + '\')}"><a href="#/' + key + '">' + val + '</a></li>');
    });
    $('nav ul li').hover(function () {
      $(this).stop(true, false).animate({'left': '20px'}, 500);
    },
    function () {
      $(this).stop(true, false).animate({'left': '0px'}, 500, 'easeOutBounce');
    });
  });
  $('.content__header__logo h2').textillate({ in: { effect: 'fadeInLeftBig' } });
  $('.footer__icons').hideEmail('tomek', 'mysliwiec.pro', '<div class="circle"><div class="email"></div></div>');
  langButton(window.userLang);
});

// $(window).on('load', function () {

// });

$(window).resize(function () {
  var footerPos = 0;
  $('footer').css('bottom', footerPos + 'px');
  if ($(document).height() > $(window).height()) {
    footerPos = $(window).height() - $(document).height() - 80;
  }
  $('footer').css('bottom', footerPos + 'px');
});
