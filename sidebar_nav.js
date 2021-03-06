function __side_bar_hide_function() {
	// Default will be replaced later during initialization.
}

(function ($) {
	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function (userConfig) {

		// No elements?
		if (this.length == 0)
			return $this;

		// Multiple elements?
		if (this.length > 1) {
			for (var i = 0; i < this.length; i++)
				$(this[i]).panel(userConfig);
			return $this;
		}

		// Vars.
		var $this = $(this),
			$body = $('body'),
			$window = $(window),
			id = $this.attr('id'),
			config;

		// Config.
		config = $.extend({
			// Delay.
			delay: 0,
			// Hide panel on link click.
			hideOnClick: false,
			// Hide panel on escape keypress.
			hideOnEscape: false,
			// Hide panel on swipe.
			hideOnSwipe: false,
			// Reset scroll position on hide.
			resetScroll: false,
			// Reset forms on hide.
			resetForms: false,
			// Side of viewport the panel will appear.
			side: null,
			// Target element for "class".
			target: $this,
			// Class to toggle.
			visibleClass: 'visible'
		}, userConfig);

		// Expand "target" if it's not a jQuery object already.
		if (typeof config.target != 'jQuery')
			config.target = $(config.target);
		// Panel.
		// Methods.
		$this._hide = function (event) {
			// Already hidden? Bail.
			if (!config.target.hasClass(config.visibleClass))
				return;
			// If an event was provided, cancel it.
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			// Hide.
			config.target.removeClass(config.visibleClass);
			// Post-hide stuff.
			window.setTimeout(function () {
				// Reset scroll position.
				if (config.resetScroll) {
					$this.scrollTop(0);
				}
				// Reset forms.
				if (config.resetForms) {
					$this.find('form').each(function () {
						this.reset();
					});
				}
			}, config.delay);
		};
		__side_bar_hide_function = function() {
			console.log('HIDING----'); $this._hide()
		};
		// Vendor fixes.
		$this
			.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
			.css('-webkit-overflow-scrolling', 'touch');
		// Hide on click.
		if (config.hideOnClick) {
			$this.find('a')
				.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
			$this
				.on('click', 'a', function (event) {
					var $a = $(this),
						href = $a.attr('href'),
						target = $a.attr('target');
					if (!href || href == '#' || href == '' || href == '#' + id)
						return;
					// Cancel original event.
					event.preventDefault();
					event.stopPropagation();
					// Hide panel.
					$this._hide();

					// Redirect to href.
					window.setTimeout(function () {
						if (target == '_blank')
							window.open(href);
						else
							window.location.href = href;
					}, config.delay + 10);

				});
		}

		// Event: Touch stuff.
		$this.on('touchstart', function (event) {
			$this.touchPosX = event.originalEvent.touches[0].pageX;
			$this.touchPosY = event.originalEvent.touches[0].pageY;
		})

		$this.on('touchmove', function (event) {
			if ($this.touchPosX === null
				|| $this.touchPosY === null)
				return;
			var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
				diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
				th = $this.outerHeight(),
				ts = ($this.get(0).scrollHeight - $this.scrollTop());
			// Hide on swipe?
			if (config.hideOnSwipe) {
				var result = false,
					boundary = 20,
					delta = 50;
				switch (config.side) {
					case 'left':
						result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
						break;
					case 'right':
						result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
						break;
					case 'top':
						result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
						break;
					case 'bottom':
						result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
						break;
					default:
						break;
				}

				if (result) {
					$this.touchPosX = null;
					$this.touchPosY = null;
					$this._hide();
					return false;
				}
			}

			// Prevent vertical scrolling past the top or bottom.
			if (($this.scrollTop() < 0 && diffY < 0)
				|| (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {
				event.preventDefault();
				event.stopPropagation();
			}

		});
		// Event: Prevent certain events inside the panel from bubbling.
		$this.on('click touchend touchstart touchmove', function (event) {
			event.stopPropagation();
		});
		// Event: Hide panel if a child anchor tag pointing to its ID is clicked.
		$this.on('click', 'a[href="#' + id + '"]', function (event) {
			event.preventDefault();
			event.stopPropagation();
			config.target.removeClass(config.visibleClass);
		});

		// Body.

		// Event: Hide panel on body click/tap.
		$body.on('click touchend', function (event) {
			$this._hide(event);
		});

		// Event: Toggle.
		$body.on('click', 'a[href="#' + id + '"]', function (event) {
			event.preventDefault();
			event.stopPropagation();
			config.target.toggleClass(config.visibleClass);
		});

		// Window.
		// Event: Hide on ESC.
		if (config.hideOnEscape)
			$window.on('keydown', function (event) {
				if (event.keyCode == 27)
					$this._hide(event);
			});
		return $this;
	};
})(jQuery);

var __sidebar_initialized = false
var __sidebar_error_in_init = false

function sidebar_nav_hide() {
	if (__sidebar_initialized) {
		__side_bar_hide_function()
	}
}

function sidebar_nav_had_error() {
	return __sidebar_error_in_init
}

function sidebar_nav_set(html) {
	if (!__sidebar_initialized) {
		console.log('sidebar_nav_set(...): Error sidebar_nav_init(...) not called first')
		return
	}
	if (__sidebar_error_in_init) {
		console.log('sidebar_nav_set(...): Error encountered previously in sidebar_nav_init(...)')
		return
	}
	let $nav = $('#__sidebar')
	let $navPanel = $('#__sidebarPanel')
	let $navPanelInner = $navPanel.children('nav')
	$navPanelInner.empty()
	$nav.html(html)
	var $navContent = $nav.children();
	// Nav -> NavPanel.
	$navContent.appendTo($navPanelInner);
	// Flip icon classes.
	$navPanelInner.find('.icons, .icon')
		.addClass('alt');
}


function sidebar_nav_init(menu_name, html) {
	if (__sidebar_initialized) {
		console.log('sidebar_nav_init(...) already called. skipping.')
		return
	}
	__sidebar_initialized = true
	if (!document.body) {
		__sidebar_error_in_init = true
		console.log("sidebar_nav_init(...) error - no <body> element")
		return
	}
	if (!document.getElementById('sidebar_nav_opacity_pane')) {
		__sidebar_error_in_init = true
		console.log("init_navpanel(...) error - no <div id=\"sidebar_nav_opacity_pane\"></div>")
		return
	}
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#sidebar_nav_opacity_pane'),
		$navPanel, $navPanelInner;
	if (menu_name.length) {
		menu_name = ' ' + menu_name
	}
	/* work in progress for trying to allow sidebar_nav_init() to be called twice.
	$("#__sidebar").remove()
	$('#__sidebarPanel').remove()
	$('#__sidebarFloatingPane').remove()
	*/
	$nav = $('<nav id="__sidebar"></nav>').appendTo($wrapper)
	// Nav Panel.
	// Create slide out navigation pane.
	$('<a href="#__sidebarPanel" id="__sidebarFloatingPane">'+menu_name+'</a>').appendTo($wrapper);

	// Panel.
	$navPanel = $(
		'<div id="__sidebarPanel">' +
		  '<nav></nav>' +
		  '<a href="#__sidebarPanel" class="close"></a>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-sidebar-visible'
		});
	sidebar_nav_set(html)
}

