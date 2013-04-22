!function($) {
  var started = false, dynamic = [];
	window.requestAnimationFrame = function(){ 
			return (
			window.requestAnimationFrame 
			|| window.webkitRequestAnimationFrame 
			|| window.mozRequestAnimationFrame 
			|| window.oRequestAnimationFrame 
			|| window.msRequestAnimationFrame 
			|| function(callback){ window.setTimeout(callback, 1000 / 60); } ); 
		}();
	$.fn.extend({
		parallax: function(start, callback) {
			if(!(start instanceof Array)) {
				start = [start];
			}
			
			$.each(start, function(i, number) {
				start[i] = (typeof number == 'string'
				|| typeof number == 'number'
				|| typeof number == 'integer'
				|| typeof number == 'float')
				&& !isNaN(parseInt(number)) ? number : 0;
			});
			
			var self = this, scroll = function(e) {
				var top = $(window).scrollTop();
				
				var change = 0, step = start[0];
				$.each(start, function(i, number) {
					if(top < number ) {
						return;
					}
					
					step = number;
					change = top - number;
				});
				
				callback.call(self, e, step, change, scroll);
			};
			
			$(window).scroll(scroll);
			
			//mobile
			dynamic.push([$(self), start, callback]);
			
			if(started) {
				return this;
			}
			
			started = true;
			
			var distance 	= 0, 		//current scroll value
				scrollbar 	= 0,  
				next 		= function() {
				!function() {
					
					if(scrollbar == distance) {
						return;
					} else {
						scrollbar += distance - scrollbar;
					}
					
					$.each(dynamic, function(i, element) {
						var selector 	= element[0], 
							start 		= element[1], 
							callback 	= element[2];
						
						var change = 0, step = start[0];
						$.each(start, function(i, number) {
							if(scrollbar < number ) {
								return;
							}
							
							step = number;
							change = scrollbar - number;
						});
						
						callback.call(selector, {}, step, change, distance);
					});
				}();
				
				window.requestAnimationFrame(next);
			}, frame = window.requestAnimationFrame(next);
			
			$.swipe();
			$(window).on('swiped', function(e, total) {
				distance = total;		
			});
			
			
			return this;
		}
	});
}(jQuery);
