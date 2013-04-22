$.fn.extend({
  parallaxTranslate: function(options) {
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
			var original = [];
			$.each(transform, function(i, item) {
				if(item.indexOf('translate3d') != -1) {
					original = item
					.replace('translate3d(', '')
					.replace(')', '')
					.replace('px', '')
					.split(',');
					return false;
				}
			});
			
			return original;
		},this)();
		
		var offset = {
			x: parseFloat(original[0] || 0),
			y: parseFloat(original[1] || 0),
			z: parseFloat(original[2] || 0) };
	
		$.each(options, function(i, option) {
			config[option.start || 0] = $.extend({
				start	: 0,
				x		: 0,
				y		: 0,
				z		: 0,
				offset	: offset
			}, option);
			
			start.push(option.start || 0);
			
			if(!options[i+1]) {
				return;
			}
			
			offset = {
				x: offset.x + (options[i+1].start - option.start) * option.x,
				y: offset.y + (options[i+1].start - option.start) * option.y,
				z: offset.z + (options[i+1].start - option.start) * option.z };
		});
		
		var self = this;
		this.parallax(start, function(e, start, position, scroll) {
			var change = [
				config[start].offset.x + (position * config[start].x),
				config[start].offset.y + (position * config[start].y),
				config[start].offset.z + (position * config[start].z) ];
				
			self.transform({position: change}).trigger('parallax-translate', [change, start, scroll, position]);
		});
		
		return this;
	}
});
