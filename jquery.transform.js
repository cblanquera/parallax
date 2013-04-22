$.fn.extend({
  transform: function(options, ease, origin) {
		var property = (function () {
			var style = document.createElement('dummy').style,
				prefixes = 'Webkit Moz O ms Khtml'.split(' '),
				memory = {};
			
			return function ( prop ) {
				if ( typeof memory[ prop ] === "undefined" ) {
					
					var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),
						props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
					
					memory[ prop ] = prop;
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
		
		//get transformation
		var transform = jQuery.style(this[0], property('transform'));
		transform = transform ? transform.split(') ') : [];
		var original = {};
		
		$.each(transform, function(i, item) {
			if(item.indexOf('translate3d') != -1) {
				original.position = item
				.replace('translate3d(', '')
				.replace(')', '')
				.replace('px', '')
				.replace('px', '')
				.replace('px', '')
				.split(',');
				return;
			}
			
			if(item.indexOf('translate(') != -1) {
				original.hotspot = item
				.replace('translate(', '')
				.replace(')', '')
				.replace('%', '')
				.replace('%', '')
				.split(',');
				return;
			}
			
			if(item.indexOf('rotateX') != -1) {
				original.rotate = original.rotate || [0, 0, 0];
				
				original.rotate[0] = item
				.replace('rotateX(', '')
				.replace(')', '')
				.replace('deg', '');
				return;
			}
			
			if(item.indexOf('rotateY') != -1) {
				original.rotate = original.rotate || [0, 0, 0];
				
				original.rotate[1] = item
				.replace('rotateY(', '')
				.replace(')', '')
				.replace('deg', '');
				return;
			}
			
			if(item.indexOf('rotateZ') != -1) {
				original.rotate = original.rotate || [0, 0, 0];
				
				original.rotate[2] = item
				.replace('rotateZ(', '')
				.replace(')', '')
				.replace('deg', '');
				return;
			}
			
			if(item.indexOf('skew') != -1) {
				original.skew = item
				.replace('skew(', '')
				.replace(')', '')
				.replace('deg', '');
				return;
			}
			
			if(item.indexOf('scale') != -1) {
				original.scale = item
				.replace('scale(', '')
				.replace(')', '');
				return;
			}
			
			if(item.indexOf('perspective') != -1) {
				original.perspective = item
				.replace('perspective(', '')
				.replace(')', '')
				.replace('px', '');
				return;
			}
		});
		
		options = $.extend(original, options);
		transform = [];
		
		if(options.hotspot) {
			transform.push('translate(' 
			+ options.hotspot[0] + '%,' 
			+ options.hotspot[1] + '%)');
		}
		
		if(options.position) {
			transform.push('translate3d(' 
			+ options.position[0] + 'px,' 
			+ options.position[1] + 'px,' 
			+ options.position[2] + 'px)');
		}
		
		if(options.rotate) {
			transform.push('rotateX(' + options.rotate[0] + 'deg)');
			transform.push('rotateY(' + options.rotate[1] + 'deg)');
			transform.push('rotateZ(' + options.rotate[2] + 'deg)');
		}
		
		if(options.scale || options.scale === 0) {
			transform.push('scale(' + options.scale+ ')');
		}
		
		if(options.perspective || options.perspective === 0) {
			transform.push('perspective(' + options.perspective + 'px)');
		}
		
		if(options.skew || options.skew === 0) {
			transform.push('skew(' + options.skew + 'deg)');
		}
		
		if(transform.length) {
			//transform.unshift('translate(-50%,-50%)');
			this.css(property('transform-style'), 'preserve-3d');
			this.css(property('transform'), transform.join(' '));
		}
		
		if(ease instanceof Array) {
			this.css(property('transition'), 'all '
			+ (ease[0] || 0)
			+ 'ms ease-in-out '
			+ (ease[1] || 0)+'ms');
		}
		
		if(origin && property('transform-origin')) {
			if(origin instanceof Array) {
				this.css(property('transform-origin'), origin[0]+'% '+origin[1]+'%')
			} else {
				this.css(property('transform-origin'), '0% 0%');
				
			}
		}
		return this;
	}
});
