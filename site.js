




function GetScriptHost() {
    if (("localhost" === window.location.hostname) || ("127.0.0.1" === window.location.hostname)) {
        return 'http://localhost:5000';
    } else {
        return 'https://zackees.pythonanywhere.com';
    }
}



function TrackLink(link) {
  // Track hit to this page.
  xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener('load', function () {
    if (this.readyState === 4 && this.status !== 200) {
      console.log(this.responseText);
    }
  });
  var url = "https://zackees.pythonanywhere.com/P7ua6rCYdF3FPc?event_name="+link+"&user_agent="+navigator.userAgent;
  if (document.referrer) {
    url += '&ref='+document.referrer
  }
  xmlhttp.open("GET", encodeURI(url), true);
  xmlhttp.send()
}

// Tracks this page that called this object.
function TrackThisPage() {
  TrackLink(window.location.href)
}

function LoadJavascript(src) {
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = src;
  document.getElementsByTagName('head')[0].appendChild(newScript);
}

function LoadTwitterScript() {
	var tweets = document.getElementsByClassName('twitter-tweet')
	if (tweets.length) {
		LoadJavascript('https://platform.twitter.com/widgets.js')
	}
}

function LoadBannedTvScript() {
  LoadJavascript('https://infowarsmedia.com/js/player.js')
}

function DomFindAllImgWithLazySrc(limit) {
  let out = []
	var all_imgs = document.getElementsByTagName('img');
	for (i = 0; i < all_imgs.length; ++i) {
    if (i > limit && limit > -1) {
      break
    }
	  img = all_imgs[i]
	  lazy_src = img.getAttribute("lazy-src")
	  if (lazy_src) {
      out.push(img)
	  }
	}
  return out
}

function LoadLazyImages() {
	var all_imgs_with_lazy_src = DomFindAllImgWithLazySrc(-1)
  if (all_imgs_with_lazy_src.length == 0) {
    return
  }
	for (i = 0; i < all_imgs_with_lazy_src.length; ++i) {
	  let img = all_imgs_with_lazy_src[i]
    img.classList.add('lazy')
    img.setAttribute('data-src', img.getAttribute('lazy-src'))
	}
  $('.lazy').Lazy();
}

function GenerateArticleTweet(tweet) {
  let template_html =`<article>` +
                     `<header class="major">` +
                       `<span><h2>__DATE_STR__</h2></span>` +
                     `</header>` +
                       `<center>` +
                         `<blockquote class="twitter-tweet" data-conversation="none"><a href="__ID__"></a></blockquote>` +
                       `</center>` +
                     `</article>`

  let tweet_id = tweet[1];
  let tweet_date = tweet[0];
  let inner = template_html.replace(/__DATE_STR__/g, tweet_date)
                           .replace(/__ID__/g, tweet_id);
  return inner
}

function AttachLinkTracking() {
  $('a[href]').each(function() {
    $(this).click(function() {
      let action_name = "link " + $(this).attr("href") + " from " + window.location.href
      TrackLink(action_name)
    });
  });
}


(function () {
    if (typeof EventTarget !== "undefined") {
        let func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.func = func;
            if(typeof capture !== "boolean"){
                capture = capture || {};
                capture.passive = false;
            }
            this.func(type, fn, capture);
        };
    };
}());

// Execute TrackThisPage soon, but not immediate.
setTimeout(TrackThisPage, 250)

window.addEventListener('load', function() {
  LoadLazyImages()
  // Load right after the page is rendered.
  setTimeout(LoadTwitterScript, 0)
  setTimeout(LoadBannedTvScript, 0)
})
