
# About

You want a great nav panel that works everywhere. The problem is that this is hard.

[Massively demo](https://html5up.net/massively) has a wonderful navigation system,
but ripping out just the nav part turns out to be a serious undertaking. This project
extracts the navigation bar from massively and removes the tangle of dependencies and
makes a dead simple API to use this sidebar nav panel.

# API
  * The following Javascript functions are available:
    * `init_sidebar_nav(title: str, html: str)`
    * `set_sidebar_nav(html: str)`

# Test
  * Launch simple test server using python: `python3 -m http.server`
  * Or use the VSCode build tool `run_server`
    * Then open up `http://localhost:8000` in a browser
      * Run test.
    * Also run test in `http://localhost:8000/test_double_init_safe.html`
