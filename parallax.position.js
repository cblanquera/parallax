$.fn.extend({
  parallaxPosition: function(options) {
		if(!(options instanceof Array)) {
			options = Array.prototype.slice.apply(arguments);
		}
		
		var start = [], config = {}, original = this.position();
		
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
		
		this.css({ 
			left		: original.left, 
			top			: original.top });
		
		var self = this;
		this.parallax(start, function(e, start, position, scroll) {
			var change = {
				top: config[start].offset.top + (position * config[start].top), 
				left: config[start].offset.left + (position * config[start].left)
			};
			
			self.css(change).trigger('parallax-position', [change, start, position, scroll]);
		});
		
		return this;
	}
});
