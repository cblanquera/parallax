parallax
========

Supports transform and mobile swiping

  $('div.menu')
	.parallaxPosition({ left: 0, top: -1, start: 0 })
	.on('parallax-position', function(e, position) {
		if(position.top < 25) {
			position.top = 25;
			$(this).css(position);
		}
	});
	
	$('div.bg-1')
		.parallaxBackground(
			{ left: 0.005, 	top: -0.0005, 	start: 0 },
			{ left: 0.01, 	top: -0.07, 	start: 1630 },
			{ left: 0.005, 	top: 0, 		start: 2600 })
		
		.on('parallax-background', function(e, change, start, position, scroll) {
			if(scroll >= 2400) {
				//$(this).css('background-image', 'url(/assets/images/bg-2.jpg)');
			} else {
				//$(this).css('background-image', 'url(/assets/images/bg-1.jpg)');
			}
		});
		
	$('div.bg-2')
		.parallaxPosition(
			{ left: 2.3, 	top: 0, 	start: 0 },
			{ left: 0,		top: 0,		start: 1000},
			{ left: 2.25,	top: 0,		start: 1700});
		
	$('div.bg-3')
		.parallaxPosition(
			{ left: 2.75, 	top: 0, 	start: 1700 },
			{ left: 0,		top: 0,		start: 2500},
			{ left: 3.5,	top: 0,		start: 4400},
			{ left: 0,		top: 0,		start: 5100} );
	
	$('div.bg-4')
		.parallaxPosition(
			{ left: 3.5, 		top: 0, 	start: 4400 },
			{ left: 0,			top: 0,		start: 5100});
	
	$('div.copy-1')
		.transform({}, false, true)
		.parallaxPosition(
			{ left: 2.45, 	top: -0.75, start: 550 },
			{ left: 0,		top: 0,		start: 950},
			{ left: 2.45, 	top: -0.75,	start: 1700})
		.parallaxOpacity(
			{opacity: .005, 	start: 750},
			{opacity: 0, 		start: 950},
			{opacity: -.005, 	start: 1700})
		.on('parallax-position', function(e, opacity) {
			if(opacity < 0) {
				$(this).css('opacity', 0);
			} else if(opacity > 1) {
				$(this).css('opacity', 1);
			}
		});
	
	$('div.copy-1 > div')
		.transform({ hotspot: [50, 50] }, false, true)
		
		.parallaxRotate(
			{x: 0, y: 0, z: -1, start: 1050},
			{x: 0, y: 0, z: 0, start: 1140},
			{x: 0, y: 0, z: -1, start: 1300},
			{x: 0, y: 0, z: 0, start: 1390},
			{x: 0, y: 0, z: -1, start: 1500},
			{x: 0, y: 0, z: 0, start: 1590})
	
	$('div.text-1').transform({ position: [-430, -847, 0] });
	$('div.text-2').transform({ rotate: [0, 0, 90], position: [200, -210, 0] });
	$('div.text-3').transform({ rotate: [0, 0, 180], position: [-530, 600, 0] });
	$('div.text-4').transform({ rotate: [0, 0, 270], position: [-1200, -340, 0] });
