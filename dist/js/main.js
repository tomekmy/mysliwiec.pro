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
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
module.exports = __webpack_require__(11);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "module.exports = \"/../index.html\";";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "module.exports = \"/../partials/about.html\";";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "module.exports = \"/../partials/contact.html\";";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "module.exports = \"/../partials/main.html\";";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "module.exports = \"/../partials/portfolio.html\";";

/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports) {

var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'angular-google-analytics']);
myApp.constant('logContent', 'Show content');

myApp.provider('lag', function () {
  this.$get = ['$window', '$timeout', function ($window, $timeout) {
    // In order to see falling letters when leaving main site this function check if all text is shown.
    // Need to check number of spans in text to fit correct timeout.
    return {
      mainLag: function () {
        var spans = 93;
        var lagTime = 3500;
        if ($window.userLang === 'pl') {
          spans = 115;
        }
        if ($('.content-wrapper__mainText span').length > spans) {
          $('.content-wrapper__mainText span:last').remove();
          $('body').css('overflow', 'hidden');
          var mainTimer = $timeout(function () {
            // To hide jumping scroll bar when letters are falling
            $('body').css('overflow', 'visible');
            // To prevent jumping content when entering from main after animation
            $('main').hide();
          }, lagTime);
          console.log('Enter from Main. Timeout ID: ' + mainTimer.$$timeoutId);
          return mainTimer;
        }
      }
    };
  }];
});

myApp.service('appServices', ['$timeout', '$location', '$window', function ($timeout, $location, $window) {
  return {
    // Highlight active link in menu
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
    // Email validation in contact form
    validateEmail: function (email) {
      var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  };
}]);

// Google Analytics configuration
myApp.config(['AnalyticsProvider', function (AnalyticsProvider) {
  AnalyticsProvider.setAccount('UA-5968901-19');
}]).run(['Analytics', function (Analytics) {}]);

myApp.config(['$routeProvider', 'lagProvider', '$locationProvider', function ($routeProvider, lagProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl',
      resolve: {
        lag: ['lag', function (lagProvider) {
          return lagProvider.mainLag();
        }]
      }
    })
    .when('/portfolio', {
      templateUrl: 'partials/portfolio.html',
      controller: 'PortfolioCtrl',
      resolve: {
        lag: ['lag', function (lagProvider) {
          return lagProvider.mainLag();
        }]
      }
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl',
      resolve: {
        lag: ['lag', function (lagProvider) {
          return lagProvider.mainLag();
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);

myApp.controller('NavCtrl', ['$scope', '$location', '$window', 'appServices', function ($scope, $location, $window, appServices) {
  // dataJSON is defined in global scope (index.html). Read data from JSON file.
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $.each(data.menu, function (key, val) {
      $('.menu__items').append('<li class="menu__item"><a class="menu__item--link" href="#/' + key + '">' + val + '</a></li>');
      $('.menu__item--link').hover(function () {
          $(this).parent().stop(true, false).animate({
            'left': '20px'
          }, 500);
        },
        function () {
          $(this).parent().stop(true, false).animate({
            'left': '0px'
          }, 500, 'easeOutBounce');
        });
    });
    appServices.activeLink();
    $scope.$on('$routeChangeStart', function (next, current) {
      appServices.activeLink();
    });
  });
}]);

myApp.controller('MainCtrl', ['$scope', '$location', '$timeout', '$window', 'appServices', 'logContent', function ($scope, $location, $timeout, $window, appServices, logContent) {
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    $('.content-wrapper__mainText').html(data.main.mainText);
    console.log('Add text to elements');
    // When JSON is read hide loading circle an show content.
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log(logContent);
      // Shows main site text using textillate. Using timeouts in order to see proper animation order.
      $('.content-wrapper__mainText p:eq(0)').show().textillate({
        in: {
          effect: 'bounceIn',
          delay: 30
        },
        out: {
          effect: 'hinge',
          delay: 40,
          shuffle: true,
          sync: false,
          delayScale: 7
        }
      });
      var timer1 = $timeout(function () {
        $('.content-wrapper__mainText p:eq(1)').show().textillate({
          in: {
            effect: 'bounceIn',
            delay: 30
          },
          out: {
            effect: 'hinge',
            delay: 15,
            shuffle: true,
            sync: false,
            delayScale: 2
          }
        });
      }, 400);
      var timer2 = $timeout(function () {
        $('.content-wrapper__mainText p:eq(2)').show().textillate({
          in: {
            effect: 'bounceIn',
            delay: 30,
            callback: function () {
              $('.content-wrapper__mainText p:eq(2)').append('<span></span>');
            }
          },
          out: {
            effect: 'hinge',
            delay: 15,
            shuffle: true,
            sync: false,
            delayScale: 2
          }
        });
      }, 2300);

      // When leaving main page cancel timers and check if textillate animation has finished.
      // If yes, fires leave animation. If no, just live the page.
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
}]);

myApp.controller('AboutCtrl', ['$scope', '$location', '$timeout', '$window', 'appServices', 'logContent', function ($scope, $location, $timeout, $window, appServices, logContent) {
  $window.dataJSON.done(function () {
    var data = $window.dataJSON.responseJSON;
    var certificates = '';
    $('.about-intro__text').html(data.about.introText);
    $('.about-intro__site-header').html(data.about.introSiteHeader);
    $('.about-intro__site-text').html(data.about.introSiteText);
    $('.about-intro__certificates-header').html(data.about.introCertificatesHeader);
    data.about.introCertificate.map(function (item) {
      console.log(item.target || '_self');
      certificates += '<li><a href="' + item.link + '" target="' + (item.target || '_self') + '">' + item.description + '</a></li>';
    });
    $('.about-intro__certificates-text').html('<ul>' + certificates + '</ul>');
    $('.about-skills__header-coding').html(data.about.headerCoding);
    $('.about-skills__header-frameworks').html(data.about.headerFrameworks);
    $('.about-skills__header-technologies').html(data.about.headerTechnologies);
    $('.about-skills__header-cms').html(data.about.headerCMS);
    $('.about-skills__header-software').html(data.about.headerSoftware);
    console.log('Add text to elements');
  }).then(function () {
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log(logContent);
      // In order to show skills bars when it appears on viewport using enterView
      $timeout(function () {
        $window.enterView({
          selector: '.about-skills div div',
          trigger: function (el) {
            $(el).css('width', $(el).find('span').text());
            // Add a little timeout to show text in bars
            $timeout(function () {
              $(el).css('color', '#1b1b1b');
            }, 350);
            console.log('On screen: ' + el);
          }
        });
      }, 700);
    });
  });
}]);

myApp.controller('PortfolioCtrl', ['$scope', '$location', '$timeout', '$window', 'appServices', 'logContent', function ($scope, $location, $timeout, $window, appServices, logContent) {
  var img = new $window.Image();
  img.src = 'img/spinner-animation.gif';
  $(img).load(function () {
    $window.dataJSON.done(function () {
      var data = $window.dataJSON.responseJSON;
      $('.portfolio__intro').html(data.portfolio.intro);
      $('.portfolio__online-header').html(data.portfolio.online.header);
      for (let i = 0; i < data.portfolio.online.works.length; i++) {
        $('.portfolio__online-items').append('<div class="portfolio-item"><img class="portfolio-item__img" data-src="' + data.portfolio.online.works[i].img + '.webp" src="img/spinner-animation.gif" onerror="this.onerror=null; this.src=\'' + data.portfolio.online.works[i].img + '.jpg\'" alt="Portfolio img"><div class="portfolio-item__wrapper"><h4 class="portfolio-item__header">' +
          data.portfolio.online.works[i].title +
          '</h4><a class="portfolio-item__url" href="http://' + data.portfolio.online.works[i].url + '">' +
          data.portfolio.online.works[i].url +
          '</a><div class="portfolio-item__description">' +
          data.portfolio.online.works[i].description +
          '</div></div><div class="portfolio-item__vline-left"></div><div class="portfolio-item__hline-left"></div><div class="portfolio-item__vline-right"></div><div class="portfolio-item__hline-right"></div></div>');
      }
      $('.portfolio__offline-header').html(data.portfolio.offline.header);
      for (let i = 0; i < data.portfolio.offline.works.length; i++) {
        $('.portfolio__offline-items').append('<div class="portfolio-item"><img class="portfolio-item__img" data-src="' + data.portfolio.offline.works[i].img + '" src="img/spinner-animation.gif" alt="Portfolio img"><div class="portfolio-item__wrapper"><h4 class="portfolio-item__header">' +
          data.portfolio.offline.works[i].title +
          '</h4><div class="portfolio-item__description">' +
          data.portfolio.offline.works[i].description +
          '</div></div><div class="portfolio-item__vline-left"></div><div class="portfolio-item__hline-left"></div><div class="portfolio-item__vline-right"></div><div class="portfolio-item__hline-right"></div></div>');
      }
    }).then(function () {
      $('.loading').fadeOut();
      $('.content').fadeIn(function () {
        console.log(logContent);
        $timeout(function () {
          $window.enterView({
            selector: '.portfolio-item',
            trigger: function (el) {
              $(el).css('opacity', '1');
              $(el).find('img').attr('src', $(el).find('img').attr('data-src'));
              console.log('On screen: ' + el);
            }
          });
        }, 700);
      });
    });
  });
}]);

myApp.controller('ContactCtrl', ['$scope', '$location', '$window', 'appServices', 'logContent', function ($scope, $location, $window, appServices, logContent) {
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

    function formSender() {
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

    function sendData() {
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
        $('.g-recaptcha').text(answer);
        // $window.grecaptcha.reset();
      });
    }

    window.sendData = sendData;
    // Add submit functionality
    $('.form__submit').click(function () {
      formSender();
    });

    // $('.form').keyup(function (event) {
    //   if (event.keyCode === 13) {
    //     formSender();
    //   }
    // });
  }).then(function () {
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log(logContent);
      // Add reCaptcha to form
      $.getScript('https://www.google.com/recaptcha/api.js');
    });
  });
}]);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
 * textillate.js
 * http://jschr.github.com/textillate
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Jordan Schroter
 */

(function ($) {
  "use strict";

  function isInEffect (effect) {
    return /In/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0;
  };

  function isOutEffect (effect) {
    return /Out/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0;
  };


  function stringToBoolean(str) {
    if (str !== "true" && str !== "false") return str;
    return (str === "true");
  };

  // custom get data api method
  function getData (node) {
    var attrs = node.attributes || []
      , data = {};

    if (!attrs.length) return data;

    $.each(attrs, function (i, attr) {
      var nodeName = attr.nodeName.replace(/delayscale/, 'delayScale');
      if (/^data-in-*/.test(nodeName)) {
        data.in = data.in || {};
        data.in[nodeName.replace(/data-in-/, '')] = stringToBoolean(attr.nodeValue);
      } else if (/^data-out-*/.test(nodeName)) {
        data.out = data.out || {};
        data.out[nodeName.replace(/data-out-/, '')] =stringToBoolean(attr.nodeValue);
      } else if (/^data-*/.test(nodeName)) {
        data[nodeName.replace(/data-/, '')] = stringToBoolean(attr.nodeValue);
      }
    })

    return data;
  }

  function shuffle (o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function animate ($t, effect, cb) {
    $t.addClass('animated ' + effect)
      .css('visibility', 'visible')
      .show();

    $t.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $t.removeClass('animated ' + effect);
        cb && cb();
    });
  }

  function animateTokens ($tokens, options, cb) {
    var that = this
      , count = $tokens.length;

    if (!count) {
      cb && cb();
      return;
    }

    if (options.shuffle) $tokens = shuffle($tokens);
    if (options.reverse) $tokens = $tokens.toArray().reverse();

    $.each($tokens, function (i, t) {
      var $token = $(t);

      function complete () {
        if (isInEffect(options.effect)) {
          $token.css('visibility', 'visible');
        } else if (isOutEffect(options.effect)) {
          $token.css('visibility', 'hidden');
        }
        count -= 1;
        if (!count && cb) cb();
      }

      var delay = options.sync ? options.delay : options.delay * i * options.delayScale;

      $token.text() ?
        setTimeout(function () { animate($token, options.effect, complete) }, delay) :
        complete();
    });
  };

  var Textillate = function (element, options) {
    var base = this
      , $element = $(element);

    base.init = function () {
      base.$texts = $element.find(options.selector);

      if (!base.$texts.length) {
        base.$texts = $('<ul class="texts"><li>' + $element.html() + '</li></ul>');
        $element.html(base.$texts);
      }

      base.$texts.hide();

      base.$current = $('<span>')
        .html(base.$texts.find(':first-child').html())
        .prependTo($element);

      if (isInEffect(options.in.effect)) {
        base.$current.css('visibility', 'hidden');
      } else if (isOutEffect(options.out.effect)) {
        base.$current.css('visibility', 'visible');
      }

      base.setOptions(options);

      base.timeoutRun = null;

      setTimeout(function () {
        base.options.autoStart && base.start();
      }, base.options.initialDelay)
    };

    base.setOptions = function (options) {
      base.options = options;
    };

    base.triggerEvent = function (name) {
      var e = $.Event(name + '.tlt');
      $element.trigger(e, base);
      return e;
    };

    base.in = function (index, cb) {
      index = index || 0;

      var $elem = base.$texts.find(':nth-child(' + ((index||0) + 1) + ')')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})
        , $tokens;

      $elem.addClass('current');

      base.triggerEvent('inAnimationBegin');
      $element.attr('data-active', $elem.data('id'));

      base.$current
        .html($elem.html())
        .lettering('words');

      // split words to individual characters if token type is set to 'char'
      if (base.options.type == "char") {
        base.$current.find('[class^="word"]')
            .css({
              'display': 'inline-block',
              // fix for poor ios performance
              '-webkit-transform': 'translate3d(0,0,0)',
              '-moz-transform': 'translate3d(0,0,0)',
              '-o-transform': 'translate3d(0,0,0)',
              'transform': 'translate3d(0,0,0)'
            })
            .each(function () { $(this).lettering() });
      }

      $tokens = base.$current
        .find('[class^="' + base.options.type + '"]')
        .css('display', 'inline-block');

      if (isInEffect(options.in.effect)) {
        $tokens.css('visibility', 'hidden');
      } else if (isOutEffect(options.in.effect)) {
        $tokens.css('visibility', 'visible');
      }

      base.currentIndex = index;

      animateTokens($tokens, options.in, function () {
        base.triggerEvent('inAnimationEnd');
        if (options.in.callback) options.in.callback();
        if (cb) cb(base);
      });
    };

    base.out = function (cb) {
      var $elem = base.$texts.find(':nth-child(' + ((base.currentIndex||0) + 1) + ')')
        , $tokens = base.$current.find('[class^="' + base.options.type + '"]')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})

      base.triggerEvent('outAnimationBegin');

      animateTokens($tokens, options.out, function () {
        $elem.removeClass('current');
        base.triggerEvent('outAnimationEnd');
        $element.removeAttr('data-active');
        if (options.out.callback) options.out.callback();
        if (cb) cb(base);
      });
    };

    base.start = function (index) {
      setTimeout(function () {
        base.triggerEvent('start');

        (function run (index) {
          base.in(index, function () {
            var length = base.$texts.children().length;

            index += 1;

            if (!base.options.loop && index >= length) {
              if (base.options.callback) base.options.callback();
              base.triggerEvent('end');
            } else {
              index = index % length;

              base.timeoutRun = setTimeout(function () {
                base.out(function () {
                  run(index)
                });
              }, base.options.minDisplayTime);
            }
          });
        }(index || 0));
      }, base.options.initialDelay);
    };

    base.stop = function () {
      if (base.timeoutRun) {
        clearInterval(base.timeoutRun);
        base.timeoutRun = null;
      }
    };

    base.init();
  }

  $.fn.textillate = function (settings, args) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('textillate')
        , options = $.extend(true, {}, $.fn.textillate.defaults, getData(this), typeof settings == 'object' && settings);

      if (!data) {
        $this.data('textillate', (data = new Textillate(this, options)));
      } else if (typeof settings == 'string') {
        data[settings].apply(data, [].concat(args));
      } else {
        data.setOptions.call(data, options);
      }
    })
  };

  $.fn.textillate.defaults = {
    selector: '.texts',
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    in: {
      effect: 'fadeInLeftBig',
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    out: {
      effect: 'hinge',
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    autoStart: true,
    inEffects: [],
    outEffects: [ 'hinge' ],
    callback: function () {},
    type: 'char'
  };

}(jQuery));


/***/ }),
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// const cacheName = 'mysliwiecPWA-v1';
// let filesToCache = [];

// self.addEventListener('install', function (e) {
//   console.log('[ServiceWorker] Install');
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       console.log('[ServiceWorker] Caching app shell');
//       return cache.addAll(filesToCache);
//     })
//   );
// });


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);