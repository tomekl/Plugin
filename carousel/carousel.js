(function( $ ){
	var methods = {
    init : function( options ) { 
		var s = {
			'direction': 'horizontal',
			'animation_time':500,
			'slides':'.items',
			'slide_start': 0
		}
		if(options){
			o = $.extend(s, options);
		}
		methods.clicks(this, o);
		methods.build(this, o);
    },
    build : function(el, o) {
		pos = [];
		var top = 0
		if(o.direction == "horizontal"){
			$('#'+el.attr("id")+' .items').css({"float":"left"})
			$('#'+el.attr("id")+' .i_wrap').css({"width":(el.height()*$('.items').length)+"px"})
		}
		el.css({'position':'relative', 'overflow':'hidden'})
		el.addClass(o.direction);
		var el_height = el.height() - (parseFloat($(".items").css('padding-top'),10) + parseFloat($(".items").css('padding-bottom'),10));
		var el_width = el.width() - (parseFloat($(".items").css('padding-left'),10) + parseFloat($(".items").css('padding-right'),10));
		$('#'+el.attr("id")+' .items').css({"height":el_height+'px', "width":el_width+'px'});
		$('.items').each(function(i,e){
			$(this).attr("id", $(this).attr("class")+"_"+i);
		})
		$(this.html.nav[o.direction]).attr("data-owner",el.attr("id")).prependTo(el);
    },
	animate : function(dir, el, o){
		var a_el = '#'+el.attr('id')+" .i_wrap";

		switch(dir){
			case 'up':
				console.log(o.slide_start);
				if(o.slide_start <= ($(a_el+' .items').length-2)){
					($(a_el)).animate({
						top:'-='+el.height()
					}, o.animation_time);
					o.slide_start = o.slide_start +1;
					console.log(o.slide_start);
				}
			break;
			case 'down':
				console.log(o.slide_start);
				if(o.slide_start >= 1){
					($(a_el)).animate({
						top:'+='+el.height()
					}, o.animation_time);
					o.slide_start = o.slide_start -1;
					console.log(o.slide_start);
				}	
			break;
			case "left":
				console.log(o.slide_start);
				if(o.slide_start >= 1){
					($(a_el)).animate({
						left:'+='+el.width()
					}, o.animation_time);
					o.slide_start = o.slide_start -1;
					console.log(o.slide_start);
				}
			break;
			case "right":
				console.log(o.slide_start);
				if(o.slide_start <= ($(a_el+' .items').length-2)){
					($(a_el)).animate({
						left:'-='+el.width()
					}, o.animation_time);
					o.slide_start = o.slide_start +1;
					console.log(o.slide_start);
				}	
			break
		}
	},
	clicks : function(el, o){
		console.log(o);
		$(el).on('click', 'a.btn', function(e){
			console.log(o)
			console.log(el);
			e.preventDefault();
			methods.animate($(this).data().action , el, o)
		})
	},
	html : {
		nav : {
			vertical : '<div class="nav_buttons"><a class="btn bt1" data-action="up" href="#">next</a><a class="btn bt2" data-action="down" href="#">prev</a></div>',
			horizontal : '<div class="nav_buttons"><a class="btn bt1" data-action="left" href="#">prev</a><a class="btn bt2" data-action="right" href="#">next</a></div>'
		}
		
	}
	};
	$.fn.slider = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
		console.log(this)
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.slider' );
    }    
  
  };

})( jQuery );