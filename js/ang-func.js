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
      if ($('.contentWrapper__mainText span').length > spans) {
        $('.contentWrapper__mainText span:last').remove();
        $('body').css('overflow', 'hidden');
        var mainTimer = $timeout(function () {
          $('body').css('overflow', 'visible');
        }, lagTime);
        console.log('Enter from Main. Timeout ID: ' + mainTimer.$$timeoutId);
        return mainTimer;
      }
    },
    activeLink: function () {
      $('nav ul li a').each(function () {
        if (('#' + $location.path()) === $(this).attr('href')) {
          $(this).css('color', '#990000');
          console.log('Active page: ' + $location.path());
        } else {
          $(this).css('color', '#1b1b1b');
        }
      });
    },
    footerPosition: function () {
      var footerPos = 0;
      if ($(document).height() > $(window).height()) {
        footerPos = $(window).height() - $(document).height() - 80;
      }
      $('footer').css('bottom', footerPos + 'px');
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
      $('nav ul').append('<li><a href="#/' + key + '">' + val + '</a></li>');
      $('nav ul li').hover(function () {
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
    $('.contentWrapper__mainText').html(data.main.mainText);
    $('.contentWrapper__mainText p:eq(0)').show().textillate({ in: {
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
      $('.contentWrapper__mainText p:eq(1)').show().textillate({ in: {
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
      $('.contentWrapper__mainText p:eq(2)').show().textillate({ in: {
        effect: 'bounceIn',
        delay: 40,
        callback: function () {
          $('.contentWrapper__mainText p:eq(2)').append('<span></span>');
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
      $('.contentWrapper__mainText p').textillate('stop');
      var spans = 93;
      if (window.userLang === 'pl') {
        spans = 115;
      }
      if ($('.contentWrapper__mainText span').length > spans) {
        $('.contentWrapper__mainText p').textillate('out');
      }
    });
  });
});

myApp.controller('AboutCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('PortfolioCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('BlogCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('ContactCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $('.contentWrapper__contactWrapper__contactDetails').html(data.contact.description);
    $('.contentWrapper__contactWrapper__your_name + label').html(data.contact.name);
    $('.contentWrapper__contactWrapper__email  + label').html(data.contact.email);
    $('.contentWrapper__contactWrapper__subject  + label').html(data.contact.subject);
    $('.contentWrapper__contactWrapper__subject').attr('placeholder', data.contact.defaultSubject);
    $('.contentWrapper__contactWrapper__message  + label').html(data.contact.message);
    $('.contentWrapper__contactWrapper__submitButton').html(data.contact.submit);
  });
});
