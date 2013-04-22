$.fn.extend({
  parallaxOpacity: function(options) {
		if(!(options instanceof Array)) {
			options = Array.prototype.slice.apply(arguments);
		}
		
		var start = [], config = {}, original = this.css('opacity') || 1;
		
		var offset = parseFloat(original);
	
		$.each(options, function(i, option) {
			config[option.start || 0] = $.extend({
				start	: 0,
				opacity	: 0,
				offset	: offset
			}, option);
			
			start.push(option.start || 0);
			
			if(!options[i+1]) {
				return;
			}
			
			offset += (options[i+1].start - option.start) * option.opacity;
		});
		
		var self = this;
		this.parallax(start, function(e, start, position, scroll) {
			var change = config[start].offset + (position * config[start].opacity);
			self.css('opacity', change).trigger('parallax-opacity', [change, start, scroll]);
		});
		
		return this;
	}
});
