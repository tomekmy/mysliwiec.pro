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

    window.enterView({
      selector: '.aboutSkills div div',
      trigger: function (el) {
        $(el).css('width', $(el).find('span').text());
        $timeout(function () {
          $(el).css('color', 'initial');
        }, 350);
        console.log('On screen: ' + el);
      }
    });

    appServices.footerPosition();
  });
});

myApp.controller('PortfolioCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('ContactCtrl', function ($scope, $location, appServices) {
  // Put translations data from JSON
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $('.contentWrapper__contactWrapper__contactDetails').html(data.contact.description);
    $('.contentWrapper__contactWrapper__your_name + label').html(data.contact.name);
    $('.contentWrapper__contactWrapper__email  + label').html(data.contact.email);
    $('.contentWrapper__contactWrapper__subject  + label').html(data.contact.subject);
    $('.contentWrapper__contactWrapper__subject').attr('placeholder', data.contact.defaultSubject);
    $('.contentWrapper__contactWrapper__message  + label').html(data.contact.message);
    $('.contentWrapper__contactWrapper__submitButton').html(data.contact.submit);

    appServices.footerPosition();

    function formSender () {
      var errors = 0;
      var $subject = $('.contentWrapper__contactWrapper__subject');
      if (!$subject.val()) {
        $subject.val($subject.attr('placeholder'));
      }

      // Check form less then 3 chars
      $('form .row').each(function () {
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
      if (!appServices.validateEmail($('.contentWrapper__contactWrapper__email').val())) {
        errors++;
        console.log('Check email');
        $('.contentWrapper__contactWrapper__email  + label span').remove();
        $('.contentWrapper__contactWrapper__email').css('border-color', '#990000');
        $('.contentWrapper__contactWrapper__email  + label').append('<span> (' + data.contact.emailError + ')</span>');
      } else {
        $('.contentWrapper__contactWrapper__email  + label span').remove();
        $('.contentWrapper__contactWrapper__email').css('border-color', '#dfdfe4');
      }

      console.log('Errors: ' + errors);

      // If no errors prepare and send data
      if (errors === 0) {
        // Get some values from elements on the page:
        var url = $('form').attr('action');
        var formData = {
          name: $('.contentWrapper__contactWrapper__your_name').val(),
          email: $('.contentWrapper__contactWrapper__email').val(),
          subject: $('.contentWrapper__contactWrapper__subject').val(),
          massage: $('.contentWrapper__contactWrapper__message').val()
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
          var content = $(data).find('#content');
          $('#result').empty().append(content);
        });
      }
    }

    // Add submit functionality
    $('.contentWrapper__contactWrapper__submitButton').click(function () {
      formSender();
    });

    $('form').keyup(function (event) {
      if (event.keyCode === 13) {
        formSender();
      }
    });
  });
});
