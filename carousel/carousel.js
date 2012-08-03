(function( $ ){
	var methods = {
	o:{
		'direction': 'horizontal',
		'animation_time':500,
		'slides':'.items',
		'slide_start': 0
	},
    init : function( options ) { 
		console.log(this)
		if(options){
			methods.o = $.extend(methods.o, options);
		}
		methods.clicks(this);
		methods.build(this);
    },
    build : function(el) {
		pos = [];
		var top = 0
		if(this.o.direction == "horizontal"){
			$('#'+el.attr("id")+' .items').css({"float":"left"})
			$('#'+el.attr("id")+' .i_wrap').css({"width":(el.height()*$('.items').length)+"px"})
		}
		el.css({'position':'relative', 'overflow':'hidden'})
		el.addClass(this.o.direction);
		var el_height = el.height() - (parseFloat($(".items").css('padding-top'),10) + parseFloat($(".items").css('padding-bottom'),10));
		var el_width = el.width() - (parseFloat($(".items").css('padding-left'),10) + parseFloat($(".items").css('padding-right'),10));
		$('#'+el.attr("id")+' .items').css({"height":el_height+'px', "width":el_width+'px'});
		$('.items').each(function(i,e){
			$(this).attr("id", $(this).attr("class")+"_"+i);
		})
		$(this.html.nav[this.o.direction]).attr("data-owner",el.attr("id")).prependTo(el);
    },
	animate : function(dir, el){
		console.log(el.height());
		console.log(el.width());
		var a_el = '#'+el.attr('id')+" .i_wrap";
		console.log(methods.o.slide_start);
		console.log(this)
		switch(dir){
			case 'up':
				if(this.o.slide_start <= ($(a_el+' .items').length-2)){
					($(a_el)).animate({
						top:'-='+el.height()
					}, this.o.animation_time);
					this.o.slide_start = this.o.slide_start +1;
				}
			break;
			case 'down':
				if(this.o.slide_start >= 1){
					($(a_el)).animate({
						top:'+='+el.height()
					}, this.o.animation_time);
				this.o.slide_start = this.o.slide_start -1;
				}	
			break;
			case "left":
				if(this.o.slide_start >= 1){
					($(a_el)).animate({
						left:'+='+el.width()
					}, this.o.animation_time);
					this.o.slide_start = this.o.slide_start -1;
					console.log(this.o.slide_start)
				}
			break;
			case "right":
				if(this.o.slide_start <= ($(a_el+' .items').length-2)){
					($(a_el)).animate({
						left:'-='+el.width()
					}, this.o.animation_time);
					this.o.slide_start = this.o.slide_start +1;
				}	
			break
		}
	},
	clicks : function(el){
		$(el).on('click', 'a.btn', function(e){
			e.preventDefault();
			console.log(this)
			//methods.animate($(this).data().action , $(this).parent().data().owner)
			methods.animate($(this).data().action , el)
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