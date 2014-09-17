// Initialize
function init_tooltip() {
	
	// Does Element exist?
	if (!$('a.tooltip').length) {
		//if not, exit
		return;
	}
	
	// Insert tooltip (hidden)
	$('body').append('<div id="hover-tip-container" style="display:none;"><div id="hover-tip-content"></div></div>');
	
	//empty variables
	var $tt_title, $tt_alt;
	
	var $tt =   $('#hover-tip-container');
	var $tt_i = $('#hover-tip-content');
	
	//watch for hover
	$('.tooltip').hover( function() {
		//store title, empty it.
		if($(this).attr('title')) {
		$tt_title = $(this).attr('title');
		$(this).attr('title', ''); // empty
		}
		
		// Store alt, empty it.
		if ($(this).attr('alt')) {
		$tt_alt = $(this).attr('alt');
		$(this).attr('alt', ''); // empty
		}
		
		// insert text.
		$tt_i.html($tt_title);
		
		// show tool tip.
		$tt.show();
	},
	function() {
		//hide tool tip.
		$tt.hide();
		
		//empty text
		$tt_i.html('');
		
		//fix title.
		if ($tt_title) {
			$(this).attr('title', $tt_title);
		}
		
		//fix alt
		if ($tt_alt) {
		$(this).attr('alt', $tt_alt);
		}
		
		//watch for movement
		}).mousemove(function(ev) {
			
			//event coordinates
			var $ev_x = ev.pageX;
			var $ev_y = ev.pageY;
			
			//tool tip coordinates
			var $tt_x = $tt.outerWidth();
			var $tt_y = $tt.outerHeight();
			
			// body coordinates
			var $bd_x = $('body').outerWidth();
			var $bd_y = $('body').outerHeight();
			
			//Move tooltip
			// top pageX + pageY > 'body' outerWidth | 'body'outerHeight - tooltipY and PageY
			$tt.css({
				'top': $ev_y + $tt_y > $bd_y ? $ev_y - $tt_y : $ev_y,
				'left': $ev_x + $tt_x + 20 > $bd_x ? $ev_x - $tt_x - 10 : $ev_x + 15
			});
		});
	}
	
	//Initiate the script
	$(document).ready(function() {
	init_tooltip();
	});