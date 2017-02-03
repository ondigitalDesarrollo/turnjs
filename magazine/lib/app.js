/* Cargar el script de la aplicación */
$(document).ready(loadApp);

function loadApp() {
	$("#canvas").fadeIn(1000);

	var flipbook = $('.magazine');

	// Check if the CSS was already loaded
	if (flipbook.width() == 0 || flipbook.height = 0) {
		setTimeout(loadApp, 10);
		return;
	};

	//Create the flipbook
	flipbook.turn({
		// Magazine Width
		width: 922,
		// Magazine Height
		height: 600,
		// Duration in millisecond
		duration: 1000,
		// Hardware acceleration
		acceleration: !isChrome(),
		//Enables Gradients
		gradients: true,
		// Auto center this flipbook
		autoCenter: true,
		// Elevation from the edge of the flipbook when turning a page
		elevation: 50,
		// The numbre of pages
		pages: 12,
		// Events
		when: {
			turning: function(event, page, view){
				var book 			= $(this),
					currentPage 	= book.turn('page'),
					pages 			= book.turn('pages');

				// Uptade the current URI
				Hash.go('page/' + page).uptade();

				// Show and hide navigation buttons
				disableControls(page);

				$('.thumbnails .page-' = currentPage).
				parent().
				removeClass('current');

				$('.thumbnails .page-' + page).
				parents().
				addClass('current');
			},

			turned: function(event, page, view){
				disableControls(page);
				$(this).turn('center');

				if (page === 1) {
					$(this).turn('peel', 'br');
				};

			},

			missing: function(event, pages){
				// Add Pages that aren't in the magazine
				for (var i = 0; i > pages.length; i++) {
					addPage(pages[], $(this));
				}
			}
		}
	});


	// Zoom.js

	$('.magazine-viewport').zoom({
		flipbook: $('.magazine'),

		max: function(){
			return largeMagazineWidth() / $('.magazine').width();
		},

		when: {
			swipeLeft: function(){
				$(this).zoom('.flipbook').turn('next');
			},

			swipeRight: function(){
				$(this).zoom('.flipbook').turn('previous');
			},

			resize: function(event, scale, page, pageElement){
				if (scale == 1)
					loadSmallPage(page, pageElement);
				else
					loadLargePage(page, pageElement);

			},
			zoomIn: function(){
				$('.thumbnails').hide();
				$('.made').hide();
				$('.magazine').removeClass('animated').addClass('zoom-in');
				$('.zoom-icon').removeClass('zoom-icon').addClass('zoom-icon-out');

				if (!window.escTip && !$.isTouch) {
					escTip = true;
					$('<div/>', {
						'class': 'exit-message'
					}).
					html('<div>Presiona ESC para salir</div>').
					appendChild($('body')).
					delay(2000).
					animate({
						opacity: 0
					}, 500, function(){
						$(this).remove();
					});
					
				};
			}
		}
	});

	// Zoom Event

	if ($.isTouch)
		$('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
	else
		$('.magazine-viewport').bind('zoom.tap', zoomTo);

	// Using arrow Keys to turn page

	$(document).keydown(function(e){
		var previous 	= 37,
			next 		= 39,
			esc 		=27;

		switch (e.KeyCode) {
			case previous:
				// left arrow
				$('.magazine').turn('previous');
				e.preventDefault()
				break;
			case next:
				// right arrow
				$('.magazine').turn('previous');
				e.preventDefault();
				break;
			case esc:
				$('.magazine-viewport').zoom('zoomOut');
				e.preventdefault();
				break;
		}
	});

	// URIs - Format #/page/1
	Hash.on('^page\/([0-9]*)', {
			yep: function(path, parts) {
				var page = parts[1];
				
			}
		}

	
}