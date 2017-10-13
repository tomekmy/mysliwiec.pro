/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {



/***/ }),
/* 2 */
/***/ (function(module, exports) {

var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'angular-google-analytics']);

myApp.factory('appServices', function ($timeout, $location, $window) {
  return {
    mainLag: function () {
      var spans = 93;
      var lagTime = 4800;
      if ($window.userLang === 'pl') {
        spans = 115;
        lagTime = 5700;
      }
      if ($('.content-wrapper__mainText span').length > spans) {
        $('.content-wrapper__mainText span:last').remove();
        $('body').css('overflow', 'hidden');
        var mainTimer = $timeout(function () {
          $('body').css('overflow', 'visible');
        }, lagTime);
        console.log('Enter from Main. Timeout ID: ' + mainTimer.$$timeoutId);
        return mainTimer;
      }
    },
    activeLink: function () {
      if ($location.path() === '/') {
        $('.menu__item--link').first().css('color', '#990000');
        console.log('Active page: /main');
      } else {
        $('.menu__item--link').each(function () {
          if (('#' + $location.path()) === $(this).attr('href')) {
            $(this).css('color', '#990000');
            console.log('Active page: ' + $location.path());
          } else {
            $(this).css('color', '#1b1b1b');
          }
        });
      }
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    footerPosition: function () {
      $timeout(function () {
        var footerPos = 0;
        $('.footer').css('bottom', footerPos + 'px');
        if ($(document).height() > $($window).height()) {
          footerPos = $($window).height() - $(document).height() - 40;
        }
        $('.footer').css('bottom', footerPos + 'px');
      }, 600);
    }
  };
});

myApp.config(['AnalyticsProvider', function (AnalyticsProvider) {
  AnalyticsProvider.setAccount('UA-5968901-19');
}]).run(['Analytics', function (Analytics) { }]);

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .when('/portfolio', {
      templateUrl: 'partials/portfolio.html',
      controller: 'PortfolioCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});

myApp.controller('NavCtrl', function ($scope, $location, $window, appServices) {
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $.each(data.menu, function (key, val) {
      $('.menu__items').append('<li class="menu__item"><a class="menu__item--link" href="#/' + key + '">' + val + '</a></li>');
      $('.menu__item--link').hover(function () {
        $(this).parent().stop(true, false).animate({'left': '20px'}, 500);
      },
      function () {
        $(this).parent().stop(true, false).animate({'left': '0px'}, 500, 'easeOutBounce');
      });
    });
    appServices.activeLink();
    $scope.$on('$routeChangeStart', function (next, current) {
      appServices.activeLink();
    });
  });
});

myApp.controller('MainCtrl', function ($scope, $location, $timeout, $window, appServices) {
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $('.content-wrapper__mainText').html(data.main.mainText);
    console.log('Add text to elements');
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log('Show content');
      $('.content-wrapper__mainText p:eq(0)').show().textillate({ in: {
        effect: 'bounceIn',
        delay: 40
      },
      out: {
        effect: 'hinge',
        delay: 70,
        shuffle: true,
        sync: false,
        delayScale: 7
      }
      });
      var timer1 = $timeout(function () {
        $('.content-wrapper__mainText p:eq(1)').show().textillate({ in: {
          effect: 'bounceIn',
          delay: 40
        },
        out: {
          effect: 'hinge',
          delay: 40,
          shuffle: true,
          sync: false,
          delayScale: 2
        }
        });
        appServices.footerPosition();
      }, 500);
      var timer2 = $timeout(function () {
        $('.content-wrapper__mainText p:eq(2)').show().textillate({ in: {
          effect: 'bounceIn',
          delay: 40,
          callback: function () {
            $('.content-wrapper__mainText p:eq(2)').append('<span></span>');
          }
        },
        out: {
          effect: 'hinge',
          delay: 40,
          shuffle: true,
          sync: false,
          delayScale: 2
        }
        });
        appServices.footerPosition();
        // $('.content-wrapper__mainText p span:contains("/")').parent().after('<br>');
      }, 3100);

      appServices.footerPosition();

      $scope.$on('$routeChangeStart', function (next, current) {
        $timeout.cancel(timer1);
        $timeout.cancel(timer2);
        $('.content-wrapper__mainText p').textillate('stop');
        var spans = 93;
        if ($window.userLang === 'pl') {
          spans = 115;
        }
        if ($('.content-wrapper__mainText span').length > spans) {
          $('.content-wrapper__mainText p').textillate('out');
        }
      });
    });
  });

  // $scope.$on('$viewContentLoaded', function (event) {

  // });
});

myApp.controller('AboutCtrl', function ($scope, $location, $timeout, $window, appServices) {
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $('.about-intro__text').html(data.about.introText);
    $('.about-intro__site-header').html(data.about.introSiteHeader);
    $('.about-intro__site-text').html(data.about.introSiteText);
    $('.about-intro__certificates-header').html(data.about.introCertificatesHeader);
    $('.about-intro__certificates-text').html(data.about.introCertificatesText);
    $('.about-skills__header-coding').html(data.about.headerCoding);
    $('.about-skills__header-frameworks').html(data.about.headerFrameworks);
    $('.about-skills__header-technologies').html(data.about.headerTechnologies);
    $('.about-skills__header-cms').html(data.about.headerCMS);
    $('.about-skills__header-software').html(data.about.headerSoftware);
    console.log('Add text to elements');
  }).then(function () {
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log('Show content');
      $window.enterView({
        selector: '.about-skills div div',
        trigger: function (el) {
          $(el).css('width', $(el).find('span').text());
          $timeout(function () {
            $(el).css('color', '#1b1b1b');
          }, 350);
          console.log('On screen: ' + el);
        }
      });
      appServices.footerPosition();
    });
  });
});

myApp.controller('PortfolioCtrl', function ($scope, $location, $timeout, $window, appServices) {
  var img = new $window.Image();
  img.src = 'img/spinner-animation.gif';
  $(img).load(function () {
    $window.dataJSON.done(function () {
      var data = $window.dataJSON.responseJSON;
      $('.portfolio__online-header').html(data.portfolio.online.header);
      for (let i = 0; i < data.portfolio.online.works.length; i++) {
        $('.portfolio__online-items').append('<div class="portfolio-item"><img class="portfolio-item__img" data-src="' + data.portfolio.online.works[i].img + '" src="img/spinner-animation.gif" alt="Portfolio img"><div class="portfolio-item__wrapper"><div class="portfolio-item__header">' +
        data.portfolio.online.works[i].title +
        '</div><a class="portfolio-item__url" href="http://' + data.portfolio.online.works[i].url + '">' +
        data.portfolio.online.works[i].url +
        '</a><div class="portfolio-item__description">' +
        data.portfolio.online.works[i].description +
        '</div></div><div class="portfolio-item__vline-left"></div><div class="portfolio-item__hline-left"></div><div class="portfolio-item__vline-right"></div><div class="portfolio-item__hline-right"></div></div>');
      }
      $('.portfolio__offline-header').html(data.portfolio.offline.header);
      for (let i = 0; i < data.portfolio.offline.works.length; i++) {
        $('.portfolio__offline-items').append('<div class="portfolio-item"><img class="portfolio-item__img" data-src="' + data.portfolio.offline.works[i].img + '" src="img/spinner-animation.gif" alt="Portfolio img"><div class="portfolio-item__wrapper"><div class="portfolio-item__header">' +
        data.portfolio.offline.works[i].title +
        '</div><div class="portfolio-item__description">' +
        data.portfolio.offline.works[i].description +
        '</div></div><div class="portfolio-item__vline-left"></div><div class="portfolio-item__hline-left"></div><div class="portfolio-item__vline-right"></div><div class="portfolio-item__hline-right"></div></div>');
      }
    }).then(function () {
      $('.loading').fadeOut();
      $('.content').fadeIn(function () {
        console.log('Show content');
        $window.enterView({
          selector: '.portfolio-item',
          trigger: function (el) {
            $(el).css('opacity', '1');
            $(el).find('img').attr('src', $(el).find('img').attr('data-src'));
            console.log('On screen: ' + el);
          }
        });
        appServices.footerPosition();
      });
    });
  });
});

myApp.controller('ContactCtrl', function ($scope, $location, $window, appServices) {
  // Put translations data from JSON
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $('.contact__details').html(data.contact.description);
    $('.form__name + label').html(data.contact.name);
    $('.form__email  + label').html(data.contact.email);
    $('.form__subject  + label').html(data.contact.subject);
    $('.form__subject').attr('placeholder', data.contact.defaultSubject);
    $('.form__message  + label').html(data.contact.message);
    $('.form__submit').html(data.contact.submit);

    function formSender () {
      var errors = 0;
      var $subject = $('.form__subject');
      if (!$subject.val()) {
        $subject.val($subject.attr('placeholder'));
      }

      // Check form less then 3 chars
      $('.form__row').each(function () {
        if ($(this).children().first().val().length < 3) {
          errors++;
          $(this).children().first().css('border-color', '#990000');
          $(this).find('label span').remove();
          $(this).find('label').append('<span> (' + data.contact.minimumError + ')</span>');
        } else {
          $(this).children().first().css('border-color', '#dfdfe4');
          $(this).find('label span').remove();
        }
      });

      // Check if email address is valid
      if (!appServices.validateEmail($('.form__email').val())) {
        errors++;
        console.log('Check email');
        $('.form__email  + label span').remove();
        $('.form__email').css('border-color', '#990000');
        $('.form__email  + label').append('<span> (' + data.contact.emailError + ')</span>');
      } else {
        $('.form__email  + label span').remove();
        $('.form__email').css('border-color', '#dfdfe4');
      }

      console.log('Errors: ' + errors);

      // If no errors prepare and send data
      if (errors === 0) {
        $window.grecaptcha.execute();
      }
    }

    function sendData () {
      // Get some values from elements on the page:
      var url = $('form').attr('action');
      var formData = {
        name: $('.form__name').val(),
        email: $('.form__email').val(),
        subject: $('.form__subject').val(),
        massage: $('.form__message').val()
      };
      // Send the data using post
      var posting = $.post(url, {
        description: formData.description,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        massage: formData.massage,
        sendOk: data.sendOk,
        sendError: data.sendError
      });

      // Put the results in a div
      posting.done(function (answer) {
        $('.form__submit').text(answer);
        // $window.grecaptcha.reset();
      });
    }

    window.sendData = sendData;
    // Add submit functionality
    $('.form__submit').click(function () {
      formSender();
    });

    $('.form').keyup(function (event) {
      if (event.keyCode === 13) {
        formSender();
      }
    });
  }).then(function () {
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log('Show content');
      appServices.footerPosition();
      $.getScript('https://www.google.com/recaptcha/api.js');
    });
  });
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);