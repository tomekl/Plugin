(function( $ ){
	var methods = {
    init : function( options ) { 
		var s = {
			'direction': 'horizontal',
			'animation_time':500,
			'slide_start': 0
		}
		if(options){var o = $.extend(s, options);}else{var o = s;}
		methods.clicks(this, o);
		methods.build(this, o);
    },
    build : function(el, o) {
		el.css({'position':'relative', 'overflow':'hidden'})
		el.addClass(o.direction);
		var el_height = el.height() - (parseFloat($(".items").css('padding-top'),10) + parseFloat($(".items").css('padding-bottom'),10));
		var el_width = el.width() - (parseFloat($(".items").css('padding-left'),10) + parseFloat($(".items").css('padding-right'),10));
		$('#'+el.attr("id")+' .i_wrap:first > .items').css({"height":el_height+'px', "width":el_width+'px'});
		if(o.slide_start > ($('#'+el.attr("id")+' .items').length -1)){
			o.slide_start = ($('#'+el.attr("id")+' .items').length -1);
		}
		switch(o.direction){
			case "horizontal":
				$('#'+el.attr("id")+' .i_wrap:first').css({"left":"-"+(o.slide_start*el.width())+"px"});
				$('#'+el.attr("id")+' .items').css({"float":"left"})
				$('#'+el.attr("id")+' .i_wrap:first').css({"width":(el.height()*$('.items').length)+"px"})
			break;
			case "vertical":
				$('#'+el.attr("id")+' .i_wrap:first').css({"top":"-"+(o.slide_start*el.height())+"px"});
			break;
		};
		$(this.html.nav[o.direction]).attr("data-owner",el.attr("id")).attr("data-dir",o.direction).prependTo(el);
    },
	animate : function(dir, el, o){
		var a_el = '#'+el.attr('id')+' .i_wrap:first';
		switch(dir){
			case 'up':
				if(o.slide_start <= ($(a_el+' > .items').length-2)){
					o.slide_start = o.slide_start +1;
					($(a_el)).animate({
						top:'-='+el.height()
					}, parseInt(o.animation_time));	
				}
			break;
			case 'down':
				if(o.slide_start >= 1){
					o.slide_start = o.slide_start -1;
					($(a_el)).animate({
						top:'+='+el.height()
					}, parseInt(o.animation_time));
			
				}	
			break;
			case "left":
				if(o.slide_start >= 1){
					o.slide_start = o.slide_start -1;
					($(a_el)).animate({
						left:'+='+el.width()
					}, parseInt(o.animation_time));
					
				}
			break;
			case "right":
				if(o.slide_start <= ($(a_el+' > .items').length-2)){
					o.slide_start = o.slide_start +1;
					($(a_el)).animate({
						left:'-='+el.width()
					}, parseInt(o.animation_time));
					
				}	
			break
		}
	},
	clicks : function(el, o){
		
		$(el).on('click', 'a.btn', function(e){
			e.preventDefault();
			e.stopPropagation();
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
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( function(){ alert('Method ' +  method + ' does not exist on jQuery.slider')} );
    }    
  
  };

})( jQuery );