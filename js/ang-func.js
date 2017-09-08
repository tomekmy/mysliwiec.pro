var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

myApp.factory('appServices', function ($timeout, $location) {
  return {
    mainLag: function () {
      var spans = 93;
      var lagTime = 4800;
      if (window.userLang === 'pl') {
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
      $('.menu__item--link').each(function () {
        if (('#' + $location.path()) === $(this).attr('href')) {
          $(this).css('color', '#990000');
          console.log('Active page: ' + $location.path());
        } else {
          $(this).css('color', '#1b1b1b');
        }
      });
    },
    validateEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    footerPosition: function () {
      $timeout(function () {
        var footerPos = 0;
        $('footer').css('bottom', footerPos + 'px');
        if ($(document).height() > $(window).height()) {
          footerPos = $(window).height() - $(document).height() - 80;
        }
        $('footer').css('bottom', footerPos + 'px');
      }, 600);
    }
  };
});

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/main', {
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
    .when('/blog', {
      templateUrl: 'partials/blog.html',
      controller: 'BlogCtrl',
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
      redirectTo: '/main'
    });

  //        $locationProvider.html5Mode(true).hashPrefix('*');
});

myApp.controller('NavCtrl', function ($scope, $location, appServices) {
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $.each(data.menu, function (key, val) {
      $('.menu__items').append('<li class="menu__item"><a class="menu__item--link" href="#/' + key + '">' + val + '</a></li>');
      $('.menu__item').hover(function () {
        $(this).stop(true, false).animate({'left': '20px'}, 500);
      },
      function () {
        $(this).stop(true, false).animate({'left': '0px'}, 500, 'easeOutBounce');
      });
    });
    appServices.activeLink();
    $scope.$on('$routeChangeStart', function (next, current) {
      appServices.activeLink();
    });
  });
});

myApp.controller('MainCtrl', function ($scope, $location, $timeout, appServices) {
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
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
      }, 3100);

      appServices.footerPosition();

      $scope.$on('$routeChangeStart', function (next, current) {
        $timeout.cancel(timer1);
        $timeout.cancel(timer2);
        $('.content-wrapper__mainText p').textillate('stop');
        var spans = 93;
        if (window.userLang === 'pl') {
          spans = 115;
        }
        if ($('.content-wrapper__mainText span').length > spans) {
          $('.content-wrapper__mainText p').textillate('out');
        }
      });
    });
  });
});

myApp.controller('AboutCtrl', function ($scope, $location, $timeout, appServices) {
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $('.aboutIntro__text').html(data.about.introText);
    $('.aboutSkills__headerCoding').html(data.about.headerCoding);
    $('.aboutSkills__headerFrameworks').html(data.about.headerFrameworks);
    $('.aboutSkills__headerTechnologies').html(data.about.headerTechnologies);
    $('.aboutSkills__headerCMS').html(data.about.headerCMS);
    $('.aboutSkills__headerSoftware').html(data.about.headerSoftware);
    $('.aboutIntro__site__header').html(data.about.introSiteHeader);
    $('.aboutIntro__site__text').html(data.about.introSiteText);
    console.log('Add text to elements');
  }).then(function () {
    $('.loading').fadeOut();
    $('.content').fadeIn(function () {
      console.log('Show content');
      window.enterView({
        selector: '.aboutSkills div div',
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

myApp.controller('PortfolioCtrl', function ($scope, $location, $timeout, appServices) {
  var img = new window.Image();
  img.src = 'img/spinner-animation.gif';
  $(img).load(function () {
    window.dataJSON.done(function () {
      var data = window.dataJSON.responseJSON;
      for (var i = 0; i < data.portfolio.works.length; i++) {
        $('.portfolio').append('<div class="portfolio__item"><img class="portfolio__item__img" data-src="' + data.portfolio.works[i].img + '" src="img/spinner-animation.gif" alt="Portfolio img" /><div class="portfolio__item__wrapper"><div class="portfolio__item__header">' +
        data.portfolio.works[i].title +
        '</div><a class="portfolio__item__url" href="http://' + data.portfolio.works[i].url + '">' +
        data.portfolio.works[i].url +
        '</a><div class="portfolio__item__description">' +
        data.portfolio.works[i].description +
        '</div></div><div class="vline-left"></div><div class="hline-left"></div><div class="vline-right"></div><div class="hline-right"></div></div>');
      }
    }).then(function () {
      $('.loading').fadeOut();
      $('.content').fadeIn(function () {
        console.log('Show content');
        window.enterView({
          selector: '.portfolio__item',
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

myApp.controller('ContactCtrl', function ($scope, $location, appServices) {
  // Put translations data from JSON
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
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
      $('.form .row').each(function () {
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
          massage: formData.massage
        });

        // Put the results in a div
        posting.done(function (data) {
          $('.contact__result').empty().append();
        });
      }
    }

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
    });
  });
});
