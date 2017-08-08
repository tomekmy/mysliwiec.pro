// Hide email address from spam bots
(function ($) {
  $.fn.hideEmail = function (user, site, tag) {
    user = user || 'user'
    site = site || 'site.com'
    tag = tag || user + '&#064;' + site
    this.each(function () {
      var string = '<a href="&#109;&#097;&#105;&#108;&#116;&#111;:' + user + '&#064;' + site + '">' + tag + '</a>'
      $(this).prepend(string)
    })
  }
})(jQuery)

$(document).ready(function () {
  $('#logo h2').textillate({ in: { effect: 'fadeInLeftBig' } })
  $('#footer-icons').hideEmail('tomek', 'mysliwiec.pro', '<div class="circle"><div class="email"></div></div>')

  $('nav ul li').hover(function () {
    $(this).stop(true, false).animate({'left': '20px'}, 500)
  },
  function () {
    $(this).stop(true, false).animate({'left': '0px'}, 500, 'easeOutBounce')
  })
})

// Add mail to selector and blinking eye function
$(window).on('load', function () {

})
