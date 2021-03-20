
# About

You want a great nav panel that works everywhere. The problem is that this is hard.

[Massively demo](https://html5up.net/massively) has a wonderful navigation system,
but ripping out just the nav part turns out to be a serious undertaking. This project
extracts the navigation bar from massively and removes the tangle of dependencies and
makes a dead simple API to use this sidebar nav panel.

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
	<div id="navpanel_opacity_wrapper">
		<p>Tests that double initializing is ok</p>
		<p>The test passes if the navigation panel says "Menu"</p>
		<p>The test fails if the navigation says anything else or is missing.</p>
		<p>The test fails if the navigation panel is empty of links</p>
	</div>

	<!-- Scripts -->
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
		init_sidebar_nav("Menu", html)

		// Test that this second init_sidebar_nav has no effect.
		init_sidebar_nav("Something else", '')
	</script>

</body>

</html>
```

# API
  * The following Javascript functions are available:
    * `init_sidebar_nav(title_str, html_str)`
    * `set_sidebar_nav(html_str)`
  * Your html document must include a div with the id as `navpanel_opacity_wrapper`.
    * Example: 	<div id="navpanel_opacity_wrapper">My test</div>
      * In this example the words "My test" will have a slick opacity effect applied. Other divs will not.

# Test
  * Launch simple test server using python: `python3 -m http.server`
  * Or use the VSCode build tool `run_server`
    * Then open up `http://localhost:8000` in a browser
      * Run test.
    * Also run test in `http://localhost:8000/test_double_init_safe.html`
