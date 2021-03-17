

let NAV_LINKS = [
    ["Disclosures", "/index.html"],
    ["Google Leaks", "/google_leaks"],
    ["About", "/about/index.html"],
    ["Best Tweets", "/best_tweets.html"],
    //["Popular", "popular.html"],
    ["Media Page", "/media.html"],
    ["Timeline", "/timeline.html"],
    ["Support", "/support/index.html"]
  ]

// Builds a Navigation panel.
function BuildNavigationHtml(selected_element) {
	let nav_template = `
	<ul class="links">
	  __VALUE__
	</ul>
	<ul class="icons">
	  <li><a href="https://twitter.com/perpetualmaniac" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
	</ul>
`
  inner_str = ""
  for (i = 0; i < NAV_LINKS.length; ++i) {
  	let _title = NAV_LINKS[i][0]
  	let _link = NAV_LINKS[i][1]
  	var val = `\n<li class="active"><a href="__LINK__">__TITLE__</a></li>`
  	          .replace("__LINK__", _link)
  	          .replace("__TITLE__", _title)
  	if (selected_element.toLowerCase() != _title.toLowerCase()) {
  		val = val.replace(` class="active"`, '')
  	}
  	inner_str += val
  }
  let out = nav_template.replace("__VALUE__", inner_str)
  return out
}
