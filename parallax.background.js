$.fn.extend({
  parallaxBackground: function(options) {
		if(!(options instanceof Array)) {
			options = Array.prototype.slice.apply(arguments);
		}
		
		var start = [], config = {};
		
		var measure = this.css('background-position').indexOf('px') != -1 ? 'px' : '%'; 
		
		var original = {
			left: parseInt(this.css('background-position').split(' ')[0] || 0),
			top: parseInt(this.css('background-position').split(' ')[1] || 0) };
		
		var offset = { 
			left		: original.left, 
			top			: original.top };
		
		$.each(options, function(i, option) {
			config[option.start || 0] = $.extend({
				start	: 0,
				left	: 0,
				top		: 0,
				offset	: offset
			}, option);
			
			start.push(option.start || 0);
			
			if(!options[i+1]) {
				return;
			}
			
			offset = {
				top: offset.top + (options[i+1].start - option.start) * option.top,
				left: offset.left + (options[i+1].start - option.start) * option.left };
		});
		
		this.css('background-position', original.left+measure+' '+original.top+measure);
		
		var self = this;
		this.parallax(start, function(e, start, position, scroll) {
			var change = {
				top: config[start].offset.top + (position * config[start].top), 
				left: config[start].offset.left + (position * config[start].left)
			};
			
			self
			.css('background-position', change.left+measure+' '+change.top+measure)
			.trigger('parallax-background', [change, start, position, scroll]);
		});
		
		return this;
	}
});
