
# About

You want a great nav panel that works everywhere. The problem is that this is hard.

[Massively demo](https://html5up.net/massively) has a wonderful navigation system,
but ripping out just the nav part turns out to be a serious undertaking. This project
extracts the navigation bar from massively and removes the tangle of dependencies and
makes a dead simple API to use this sidebar nav panel.

# API
  * The following Javascript functions are available:
    * `sidebar_nav_init(title_str, html_str)`
    * `sidebar_nav_set(html_str)`
    * `sidebar_nav_error()` returns true if there was an error.

# HTML setup
  * Your html document must include a div with the id as `side_panel_opacity_wrapper`.
    * Example: 	<div id="side_panel_opacity_wrapper">My test</div>
      * In this example the words "My test" will have a slick opacity effect applied. Other divs will not.

# Example
```
<!DOCTYPE HTML>
<html xml:lang="en" lang="en">

<head>
	<!-- Primary Meta Tags -->
	<meta charset="utf-8" />
	<title>Nav Side Bar Test</title>
	<meta http-equiv="Cache-control" content="public">
    <link rel="stylesheet" href="sidebar_nav.css" />
</head>

<body>
	<!-- Wrapper -->
	<div id="side_panel_opacity_wrapper">
		<p>Tests that double initializing is ok</p>
		<p>The test passes if the navigation panel says "Menu"</p>
		<p>The test fails if the navigation says anything else or is missing.</p>
		<p>The test fails if the navigation panel is empty of links</p>
	</div>

	<!-- sidebar nav requries jquery and sidebar_nav.js -->
	<!-- Use CDN versions as they are likely already cached.-->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
		integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="sidebar_nav.js"></script>
	<script type="text/javascript">
		let html = `<h3>Links</h3>
			<ul class="links">
				<li><a href="#">Link 1</a></li>
				<li><a href="#">Link 2</a></li>
				<li><a href="#">Link 3</a></li>
				<li><a href="#">Link 4</a></li>
			</ul>`
		sidebar_nav_init("Menu", html)

		// Then optionally you can call this to change the data.
		// sidebar_nav_set('<p>Test</p>')
	</script>

</body>

</html>
```

# Test
  * Launch simple test server using python: `python3 -m http.server`
  * Or use the VSCode build tool `run_server`
    * Then open up `http://localhost:8000` in a browser
      * Run test.
    * Other tests:
      * [http://localhost:8000/test_double_init_safe.html](http://localhost:8000/test_double_init_safe.html)
      * [http://localhost:8000/test_no_opacity_wrapper.html](http://localhost:8000/test_no_opacity_wrapper.html)
