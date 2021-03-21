
# Live demo
  * Simple demo is here: [https://zackees.github.io/sidebar_nav/demo.html](https://zackees.github.io/sidebar_nav/demo.html)
  * Complex demo is here: [https://zackees.github.io/sidebar_nav/](https://zackees.github.io/sidebar_nav/)

# About

You want a great nav panel that works across devices (desktop, iphone, android). The problem is that this is a hard problem and has a steep learning curve. This project makes getting something up and running fast extremely easy.

This project is based on the [Massively demo](https://html5up.net/massively) project, which has a wonderful navigation system, but isolating just the nav part turns out to be a serious undertaking. This project  extracts the navigation bar from massively and removes the dependencies and makes a dead simple API to use this sidebar nav panel.

# API
  * The following Javascript functions are available:
    * `sidebar_nav_init(title_str, html_str)`
    * `sidebar_nav_set(html_str)`
    * `sidebar_nav_error()` returns true if there was an error.

# HTML setup
  * Your html document must include a div with the id as `side_panel_opacity_wrapper`.
    * Example: 	<div id="side_panel_opacity_wrapper">My test</div>
      * In this example the words "My test" will have a slick opacity effect applied. Other divs will not.



# Test
  * Launch simple test server using python: `python3 -m http.server`
  * Or use the VSCode build tool `run_server`
    * Then open up `http://localhost:8000` in a browser
      * Run test.
