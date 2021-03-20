
# About

You want a great nav panel that works everywhere. The problem is that this is hard.

[Massively demo](https://html5up.net/massively) has a wonderful navigation system,
but ripping out just the nav part turns out to be a serious undertaking. This project
extracts the navigation bar from massively and removes the tangle of dependencies and
makes a dead simple API to use this nav panel.

# API
  * The following Javascript functions are available:
    * `init_navpanel(title: str, html: str)`
    * `set_navpanel(html: str)`

# Test Server
  * `/index.html` serves as the test for this nav.
  * Launch simple test server using python: `python3 -m http.server`
    * Then open up `http://localhost:8000` in a browser
  * Or use the VSCode build tool `run_server`
