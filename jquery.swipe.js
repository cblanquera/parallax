(function($) { 
    $.swipe = function() {
		var total = 0, start, end;
		$(window).bind('mousedown touchstart', function(e) {
			e.preventDefault();
			start = e.pageY, touches = e.originalEvent.touches;
			if (touches && touches.length) {
				start = touches[0].pageY;
			} else if(!start && start !== 0) {
				return;
			}
			
			$(window).bind('mousemove', touchmove).bind('touchmove', touchmove);
		}).bind('mouseup touchend', function(e) {
			total += start - end;
		
			if(total < 0) {
				total = 0;
			}
		
			$(window).unbind('mousemove', touchmove).unbind('touchmove', touchmove);
		});
		
		function touchmove(e) {
			e.preventDefault();
			end = e.pageY, touches = e.originalEvent.touches;

			if (touches && touches.length) {
				end = touches[0].pageY;
			} else if(!end && end !== 0) {
				return;
			}
			
			var subtotal = total + start - end;
			
			if(subtotal < 0) {
				subtotal = 0;
			}
			
			$(window).trigger('swiped', [subtotal, start, end]);
		};
  	};
})(jQuery);
