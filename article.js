// Generates HTML suitable for putting into an article list section.
//
// Example Input
//  data_list = [
//          {
//            title:"Insider Blows Whistle & Exec Reveals Google Plan to Prevent...",
//            date:"June 24th",
//            dur_min: "25",
//            description: "Project Veritas: Insider Blows Whistle & Exec Reveals ...",
//            url:"https://www.bitchute.com/embed/re9Xp6cdkro",
//            btn : [
//              {href: "https://www.bitchute.com/video/re9Xp6cdkro", text:"Full Screen Video"},
//              {href: "https://www.projectveritas.com/2019/06/24/insider-blows-whistle-exec-reveals-google-plan-to-prevent-trump-situation-in-2020-on-hidden-cam/", text:"Full Story"},
//            ]
//          },
//  ]
function htmlArticleGenerator(data_list) {
  function _HtmlButton(data) {
    var inner_btn_html = ""
    try {
      if (data.hasOwnProperty("btn")) {
        for (let i = 0; i < data.btn.length; ++i) {
          let b = data.btn[i]
          inner_btn_html += `<a href="${b.href}" class="button">${b.text}</a>\n`
        }
      }     
    }
    catch (err) {
      return ""
    }

    return inner_btn_html
  }

  function _HtmlDescription(data) {
    try {
      if (data.hasOwnProperty("description") && data.description) {
         let out = "<p>__DESCRIPTION__</p>".replace("__DESCRIPTION__", data.description)
         return out
      }
    }
    catch (err) {
      return ""
    }
    return ""
  }


  function _HtmlBitchute(data) {
    let desc = _HtmlDescription(data)
    let template =  `<article><header>` +
                         `<span class="date">__DATE__<br>(__DUR_MIN__ min video)</span>` +
                         `<h2>__TITLE__</h2>` +
                      `</header>` +
                      `<div class="videoWrapper"><iframe src="__URL__" frameborder="0" allowfullscreen></iframe></div>` +
                      `__DESCRIPTION__` + _HtmlButton(data) +
                    `</article>`
    return template.replace("__DATE__", data.date)
                   .replace("__DUR_MIN__", data.dur_min)
                   .replace("__TITLE__", data.title)
                   .replace("__URL__", data.url)
                   .replace("__DESCRIPTION__", desc)
  }

  function _HtmlYouTube(data) {
    let template_html =`<article><header>` +
                       `<span class="date">__DATE__<br>(__DUR_MIN__ min video)</span>` +
                         `<h2>__TITLE__</h2>` +
                       `</header>` +
                         `<div class="videoWrapper">` +
                           `<iframe src="__URL__" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` +
                           `</div>` + _HtmlButton(data) +
                       `</article>`
    var url = data.url
    let desc = _HtmlDescription(data)
    var inner = template_html.replace(/__DATE__/ig, data.date)
                             .replace(/__DUR_MIN__/ig, data.dur_min)
                             .replace(/__TITLE__/ig, data.title)
                             .replace(/__DESCRIPTION__/ig, desc)
                             .replace(/__URL__/ig, data.url)
    return inner
  }

  function _HtmlTwitter(data) {
    let template_html =`<article><header>` +
                       `<span class="date">__DATE__<br>(__DUR_MIN__ min video)</span>` +
                         `<h2>__TITLE__</h2>` +
                       `</header>` +
                         `<center>` +
                           `<blockquote class="twitter-tweet" data-conversation="none"><a href="__URL__"></a></blockquote>` +
                         `</center>` + _HtmlButton(data) +
                       `</article>`
    let inner = template_html.replace(/__DATE__/g, data.date)
                             .replace(/__DUR_MIN__/g, data.dur_min)
                             .replace(/__TITLE__/g, data.title)
                             .replace(/__URL__/g, data.url);
    return inner
  }

  function _HtmlBannedTv(data) {

    let url = data.url.replace("https://banned.video/watch?id=", '')
    let desc = _HtmlDescription(data)
    let template_html =`<article>`+
                         `<header>` +
                           `<span class="date">__DATE__<br>(__DUR_MIN__ min video)</span>` +
                           `<h2>__TITLE__</h2>` +
                         `</header>` +
                         `<div class="videoWrapper ifw-player" data-video-id="__URL__"></div><script src="https://infowarsmedia.com/js/player.js" async></script>` +
                         `<p><br></p> __DESCRIPTION__ ` + _HtmlButton(data) +
                       `</article>`
    let inner = template_html.replace(/__DATE__/g, data.date)
                             .replace(/__DUR_MIN__/g, data.dur_min)
                             .replace(/__TITLE__/g, data.title)
                             .replace(/__URL__/g, url)
                             .replace(/__DESCRIPTION__/g, desc)
    return inner
  }

  function _MakeHtml(data) {
    function Has(url, _str) {
      return url.toLowerCase().search(_str.toLowerCase()) != -1
    }

    let f_map = [
      ["bitchute.com", _HtmlBitchute],
      ["youtube.com", _HtmlYouTube],
      ["twitter.com", _HtmlTwitter],
      ["banned.video", _HtmlBannedTv],
    ]

    for (let i = 0; i < f_map.length; ++i) {
      if (Has(data.url, f_map[i][0])) {
        return f_map[i][1](data)
      }
    }
    alert("Unknown type " + data.type)
    return ""
  }


  function _MakeHtmlFromList(data_list) {
    var out = ""
    for (let i = 0; i < data_list.length; ++i) {
      let datum = data_list[i]
      let t = _MakeHtml(datum)
      out += t
    }
    return out
  }

  // EXECUTION
  let out = _MakeHtmlFromList(data_list)
  return out
}


function LoadScriptsForIframes() {
  setTimeout(LoadTwitterScript, 150)
  setTimeout(LoadBannedTvScript, 250)
}

// Demo of isOnScreen()
//setInterval(function(){
//  if ($('#footer').isOnScreen()) {
//    console.log("on screen")
//  } else {
//    console.log("out of screen")
//  }
//}, 500);
(function ($) {

  /**
  * From: https://github.com/moagrius/isOnScreen
  *
  * Example:
  *  $('selector').isOnScreen();
  *
  *  $('selector').isOnScreen(function(deltas){
  *    return deltas.top >= 10 && deltas.bottom >= 10;
  *  });
  *
  * Tests if a node is positioned within the current viewport.
  * It does not test any other type of "visibility", like css display,
  * opacity, presence in the dom, etc - it only considers position.
  * 
  * By default, it tests if at least 1 pixel is showing, regardless of
  * orientation - however an optional argument is accepted, a callback
  * that is passed the number of pixels distant between each edge of the
   * node and the corresponding viewport.  If the callback argument is provided
   * the return value (true of false) of that callback is used instead.
  */
  $.fn.isOnScreen = function(test){

    var height = this.outerHeight();
    var width = this.outerWidth();

    if(!width || !height){
      return false;
    }
    
    var win = $(window);

    var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    
    var deltas = {
      top : viewport.bottom - bounds.top,
      left: viewport.right - bounds.left,
      bottom: bounds.bottom - viewport.top,
      right: bounds.right - viewport.left
    };

    if(typeof test == 'function') {
      return test.call(this, deltas);
    }
    
    return deltas.top > 0
      && deltas.left > 0
      && deltas.right > 0
      && deltas.bottom > 0;
  };

})(jQuery);
