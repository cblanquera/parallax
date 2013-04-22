$.fn.extend({
  parallaxPerspective: function(options) {
		if(!(options instanceof Array)) {
			options = Array.prototype.slice.apply(arguments);
		}
		
		var property = (function () {
			var style = document.createElement('dummy').style,
				prefixes = 'Webkit Moz O ms Khtml'.split(' '),
				memory = {};
			
			return function ( prop ) {
				if ( typeof memory[ prop ] === "undefined" ) {
					
					var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
						props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
					
					memory[ prop ] = null;
					for ( var i in props ) {
						if ( style[ props[i] ] !== undefined ) {
							memory[ prop ] = props[i];
							break;
						}
					}
				
				}
				
				return memory[ prop ];
			};
		
		})();
		
		var start = [], config = {}, original = $.proxy(function() {
			//get transformation
			var transform = jQuery.style(this[0], property('transform'));
			transform = transform ? transform.split(' ') : [];
			var original = 1;
			$.each(transform, function(i, item) {
				if(item.indexOf('perspective') != -1) {
					original = item
					.replace('scale(', '')
					.replace(')', '')
					.replace('px', '');
					return false;
				}
			});
			
			return original;
		},this)();
		
		var offset = parseFloat(original);
	
		$.each(options, function(i, option) {
			config[option.start || 0] = $.extend({
				start		: 0,
				perspective	: 0,
				offset		: offset
			}, option);
			
			start.push(option.start || 0);
			
			if(!options[i+1]) {
				return;
			}
			
			offset += (options[i+1].start - option.start) * option.perspective;
		});
		
		var self = this;
		this.parallax(start, function(e, start, position, scroll) {
			var change = config[start].offset + (position * config[start].perspective);
			self.transform({perspective: change}).trigger('parallax-perspective', [change, start, scroll, position]);
		});
		
		return this;
	}
});
