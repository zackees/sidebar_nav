/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
	breakpoints({
		default: ['1681px', null],
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function (intensity) {
		var $window = $(window),
			$this = $(this);

		$this.each(function () {
			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t);
			$bg
					.addClass('fixed')
					.css('transform', 'none');
			$window
					.off('scroll._parallax');
		});
  	return $(this);
	};

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly();

	// Background.
	$wrapper._parallax(0.925);

	// Nav Panel.

	// Toggle.
	$navPanelToggle = $(
		'<a href="#navPanel" id="navPanelToggle"></a>'
	)
		.appendTo($wrapper);

	// Change toggle styling once we've scrolled past the header.
	$header.scrollex({
		bottom: '5vh',
		enter: function () {
			$navPanelToggle.removeClass('alt');
		},
		leave: function () {
			$navPanelToggle.addClass('alt');
		}
	});

	// Panel.
	$navPanel = $(
		'<div id="navPanel">' +
		'<nav>' +
		'</nav>' +
		'<a href="#navPanel" class="close"></a>' +
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
			visibleClass: 'is-navPanel-visible'
		});
	// If there is no nav panel, then remove the gui elements.
	// Otherwise an empty menu-gui will show.
	if (document.getElementById('nav') == null) {
		$('#navPanelToggle').remove();
	}

	// Get inner.
	$navPanelInner = $navPanel.children('nav');

	// Move nav content on breakpoint change.
	var $navContent = $nav.children();
	// Nav -> NavPanel.
    $navContent.appendTo($navPanelInner);
	// Flip icon classes.
	$navPanelInner.find('.icons, .icon')
		.addClass('alt');

	// Intro.
	var $intro = $('#intro');

})(jQuery);