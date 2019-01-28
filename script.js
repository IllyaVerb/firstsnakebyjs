jQuery('documents').ready(function(){
	
	
	gameHeight=parseInt($('.game_field').css('height'), 10);
	gameWidth=parseInt($('.game_field').css('width'), 10);
	$('.game_field').height(gameHeight-gameHeight%25);
	$('.game_field').width(gameWidth-gameWidth%25);
	
	
	var move=2, score=0, parts_coodr = new Array(), direction=[[-1, 0], [0, -1], [1, 0], [0, 1]], 
		gameHeight=parseInt($('.game_field').css('height'), 10), 
		gameWidth=parseInt($('.game_field').css('width'), 10);
	
	$('#restart_btn').bind('click', function(){
		clearInterval(game_loop); 
		init()
		
	});
	
	function init(){
		move=2;
		score=0;
		$('.head').offset({top:100, left:200});
		$('.body').each(function(index){
			$(this).offset({top:(125+25*index), left:200}); 
		});
		$('div.new').remove();
		$('#score').text("Score: "+score);
		spawn_apple();
		game_loop=setInterval(moving, 50);
	}
	
	function moving(){
		$('body').keydown(function(eventKeyDown){
			if(eventKeyDown.which==27)
				clearInterval(game_loop);
			if(eventKeyDown.which>=37 && eventKeyDown.which<=40){
				var new_move=eventKeyDown.which-37;
				if(Math.abs(new_move-move)&1)
					move=new_move;
			}
		});
		
		$('.head').offset(function(index, val){
			
			parts_coodr.push({left:val.left, top:val.top});
			
			var l=50, u=50, r=gameWidth+25, 
							d=gameHeight+25;
			switch(move){
				case 0: {
						if(val.left<=l)
							return {left:r, top:val.top+direction[move][1]*25};
						else
							return {left:val.left+direction[move][0]*25, top:val.top+direction[move][1]*25};
				}
				case 1: {
						if(val.top<=u)
							return {left:val.left+direction[move][0]*25, top:d};
						else
							return {left:val.left+direction[move][0]*25, top:val.top+direction[move][1]*25};
				}
				case 2: {
						if(val.left>=r)
							return {left:l, top:val.top+direction[move][1]*25};
						else
							return {left:val.left+direction[move][0]*25, top:val.top+direction[move][1]*25};
				}
				case 3: {
						if(val.top>=d)
							return {left:val.left+direction[move][0]*25, top:u};
						else
							return {left:val.left+direction[move][0]*25, top:val.top+direction[move][1]*25};
				}
			}
			
		});
		
		$('.body').each(function(index){
			$(this).offset(function(index_2, val){
				parts_coodr.push({left:val.left, top:val.top});
				return {left:parts_coodr[index].left, top:parts_coodr[index].top};
			});
		});
		
		if($('.head').offset().top==$('.apple').offset().top && $('.head').offset().left==$('.apple').offset().left){
			spawn_apple();
			score++;
			$('#score').text("Score: "+score);
			$('.game_field').append('<div class="part body new"></div>');
			$('.new').last().offset({left:parts_coodr[2+score].left, top:parts_coodr[2+score].top});
		}
		$('.body').each(function(i){
			if($(this).offset().left==$('.head').offset().left && $(this).offset().top==$('.head').offset().top){
				clearInterval(game_loop); 
			}
		});
		
		parts_coodr=[];
	}

	function spawn_apple(){
		do{
			exist=true;
			x=Math.round(Math.random()*((gameWidth/25)-1));
			y=Math.round(Math.random()*((gameHeight/25)-1));
			$('div').not('.apple').each(function(i){
				if($(this).offset().left/25-2==x && $(this).offset().top/25-2==y)
					exist=false;
			});
		}
		while(!exist);
				
		$('.apple').offset({left:x*25+50, top:y*25+50});
		
	}
	
	init();
	
});