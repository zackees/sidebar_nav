
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
    * `sidebar_nav_hide()` hides the navbar.

# HTML setup
  * Your html document must include a div with the id as `sidebar_nav_opacity_pane`.
    * Example: `<div id="sidebar_nav_opacity_pane">My test</div>`
      * In this example the words "My test" will have a slick opacity effect applied. Clicking on this div while the sidebar navigation panel is in an open state, will close it. Other divs will NOT have their opacity changed nor will they act as click targets to dismiss an open nav panel.

# Internals
  * Hidden dom elements are attached to the current html document.
    * `div` with id `#__sidebar`
	* `div` with id `#__sidebarPanel`
	* `div` with id `#__sidebarFloatingPane`
  * Additionally the `<body>` element will have the class `is-sidebar-visible` toggled depending on visibility of the navigation pane.

# Test
  * Launch simple test server using python: `python3 -m http.server`
  * Or use the VSCode build tool `run_server`
    * Then open up `http://localhost:8000` in a browser
      * Run test.
