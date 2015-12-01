(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$menu = $('#menu'),
			$sidebar = $('#sidebar'),
			$main = $('#main');

        // app full screen mode
        if ("standalone" in window.navigator && window.navigator.standalone) {
            $body.addClass('app-fullscreen'); 
        }

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// IE<=9: Reverse order of main and sidebar.
			if (skel.vars.IEVersion <= 9)
				$main.insertAfter($sidebar);

		// Menu.
			$menu
                //.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Search (header).
			var $search = $('#search'),
				$search_input = $search.find('input'),
                searchTimer;

			$body
				.on('click', '[href="#search"]', function(e) {

					e.preventDefault();

					// Not visible?
						if (!$search.hasClass('visible')) {

							// Reset form.
								$search[0].reset();

							// Show.
								$search.addClass('visible');

							// Focus input.
								$search_input.focus();

                            clearTimeout(searchTimer);
						}

				});

			$search_input
				.on('keydown', function(event) {

					if (event.keyCode == 27)
						$search_input.blur();

				})
				.on('blur', function() {
					searchTimer = window.setTimeout(function() {
						$search.removeClass('visible');
					}, 200);
				});

		// Intro.
			var $intro = $('#intro');

			// Move to main on <=large, back to sidebar on >large.
				skel
					.on('+large', function() {
						$intro.prependTo($main);
					})
					.on('-large', function() {
						$intro.prependTo($sidebar);
					});

        // Back Top
        var $backTop = $('#backTop');
        $window.on('scroll.backtop', debounce(function () {
            if ($window.scrollTop() > 100) {
                $backTop.show();
            } else {
                $backTop.hide();
            }
        }));

        // scroll body to 0px on click
        $backTop.on('click',function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        // Theme switcher
        var ts = {
            ls: localStorage || {getItem:function(){}, setItem:function(){}},
            key: 'o2.theme',
            theme: 'light',
            init: function(){
                var theme = this.ls.getItem(this.key) || this.theme;
                this.$title = $('#themeTitle');
                this.$btn = $('#themeSwitcher').on('click',function(e){
                    if(theme === 'dark'){
                        theme = 'light';
                    } else {
                        theme = 'dark';
                    }
                    ts.setTheme(theme);
                    return false;
                });
                this.$btn.dark = this.$btn.attr('data-dark');
                this.$btn.light = this.$btn.attr('data-light');
                this.setTheme(theme);
            },
            setTheme:function(theme){
                var reverse = {
                    dark: 'light',
                    light: 'dark'
                };
                this.theme = theme;
                this.ls.setItem(this.key, theme);
                $body.removeClass('dark light').addClass(theme);
                this.$title.html(this.$btn[reverse[theme]]);
            }
        };
        ts.init();

	});

})(jQuery);
