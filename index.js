$(function(){
		//轮播图无限循环封装
	function animate(offset){
		var leftVal = parseInt($('.slide_img').css('left')) + offset;
		slideBox.animate({'left':leftVal + 'px'},300,function(){
			if(leftVal<-6000){
				slideBox.css('left','-1200px');	
			}
			if(leftVal>-1200){
				slideBox.css('left','-6000px');
			}	
		});
		
	}

	//对应图片圆圈高亮功能
	function tabLight(){		
		for(var i=0;i<tabs.length;i++){
			if(tabs.eq(i).hasClass('tabs_active')){
				tabs.eq(i).removeClass('tabs_active');
				break;
			}
		}
		tabs.eq(index-1).addClass('tabs_active');
	}

	//自动循环播放
	function play(){
		timer = setInterval(function(){
			next.click();
		},3000);
	}
	//停止播放
	function stop(){
		clearInterval(timer)
	}

	// 导航栏动态效果
	$('.subnav').parent().bind({
		mouseover:function(){
			$(this).find('.subnav').stop(true,true).slideDown(300);
		},
		mouseout:function(){			
			$(this).find('.subnav').stop(true,true).delay(30).slideUp(300);
		}
	})

	$('.subnav').bind({
		mouseover:function(){
			$(this).stop(true,true).slideDown(300);
		},
		mouseout:function(){			
			$(this).stop(true,true).delay(30).slideUp(300);
		}
	})
	// 导航栏动态效果结束	

	// 轮播图效果
	var slideArea = $('.slideArea');
	var slideBox = $('.slide_img');
	var tabs = $('.slide_tabs').find('li');	
	var prev = $('.previous');
	var next = $('.next');
	var index = 1;
	var timer;

	//按钮点击切换
	next.click(function(){
		if(index == 5){
			index = 1;
		}else{			
		index += 1;
		}
		tabLight();				
		animate(-1200);
	})
	prev.click(function(){
		if(index == 1){
			index = 5;
		}else{
		index -= 1;			
		}
		tabLight();
		animate(1200);
	})

	//圆圈点击切换
	for(var i=0;i<tabs.length; i++){
		tabs.eq(i).click(function(){
			if(this.className =='tabs_active'){
				return;
			}
			var myIndex = tabs.index(this)+1;
			var offset = -1200*(myIndex-index);
			animate(offset);
			index = myIndex;
			tabLight();
		})
	}

	$('.slideArea').mouseout(play);
	$('.slideArea').mouseover(stop);
	play();
})
	