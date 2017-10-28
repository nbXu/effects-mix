/*
 *除非自己行 靠谁都不行
 *come on ！！！！！！！！！ 
 *1、tab
 */
(function($){
	var parameter={
		effect:"hide",
		current:0,
		eventWays:"click"
	}

	function tab(self,opts){
		this.opts=jQuery.extend({},parameter,opts);
		this.btn = self.find('ul.tab-btn>li');
		this.btnBox = self.find('ul.tab-btn');
		this.txt = self.find('ul.tab-txt>li');
		this.txtBox = self.find('ul.tab-txt');
		this.length=self.find('ul.tab-btn>li').length;
		this.gdW=this.txtBox.parent().width(); //获取slide的宽度
		this.init(); //tab 对象调用原型方法
		var This = this;
		$(window).resize(function() {
			This.gdW = This.txtBox.parent().width();

			if (This.opts.effect=='left') {
				This.layout();
				This.txtBox.animate({marginLeft: -This.gdW*This.opts.current},0, function() {});
			}
		});
	}

	tab.prototype={
		init:function(){
			var self = this;
			self.layout();

			switch (this.opts.effect){
				case "hide":
					if (this.opts.eventWays=='click') {
						self.btn.click(function() {
							var index =$(this).index();
							self.effect_default(index);
						})
					}else{
						self.btn.hover(function() {
							var index =$(this).index()
							self.effect_default(index);
						})
					}
					break;
				
				case "fade":
					if (this.opts.eventWays=='click') {
						self.btn.click(function() {
							var index =$(this).index()
							self.effect_fade(index);
						})
					}else{
						self.btn.hover(function() {
							var index =$(this).index();
							t=setTimeout(function(){
								self.effect_fade(index);
							},180)
						},function(){
							clearTimeout(t); //可以解决fade函数么有执行完的问题
						})
					}
					break;

				case "left":
					if (this.opts.eventWays=='click') {
						self.btn.click(function() {
							var index =$(this).index();
							self.num=index;
							self.effect_left(index);
						})
					}else{
						self.btn.hover(function() {
							var index =$(this).index();
							self.num=index;
							self.effect_left(index);
						})
					}
					break;

				default:
					self.btn.click(function() {
						var index =$(this).index()
						self.effect_default(index);
					})
			}
		},
		effect_default:function(index){
			if (index || index==0) {
				this.opts.current=index
			}else{
				// 没有就没有 傻吊啊
			}
			this.txt.hide().eq(this.opts.current).show();
			this.btn.eq(this.opts.current).addClass('on').siblings().removeClass('on');
		},
		effect_fade:function(index){
			if (index || index==0) {
				this.opts.current=index
			}else{
				// 没有就没有 傻吊啊
			}
			this.btn.eq(this.opts.current).addClass('on').siblings().removeClass('on');
			this.txt.hide(0).eq(this.opts.current).fadeIn(200);
			
		},
		effect_left:function(index){
			if (index || index==0) {
				this.opts.current=index
			}else{
				// 没有就没有 傻吊啊
			}
			this.btn.eq(this.opts.current).addClass('on').siblings().removeClass('on');
			this.txtBox.stop(true,true).animate({marginLeft: -this.gdW*this.opts.current},300, function() {});
		},
		layout:function(){
			if (this.opts.effect=="left") {
				this.txtBox.css({
					overflow: 'hidden',
					width: this.length * this.gdW
				});
				this.txt.css({
					width: this.gdW,
					float: 'left'
				});
				this.effect_left()
			}else{
				this.effect_default()
			}
		}
	}
	window.tab = tab;
})(jQuery); //分号不可少啊

/*
 *狼行千里吃肉 
 *come on ！！！！！！！！！ 
 *2、marquee
 */
(function($){
	function marquee(self,opts){
		this.opts=jQuery.extend({
			count:4,
			steep:1
		},opts);
		
		this.marqueeUl = self.find('ul.marquee')
		this.marqueeLi = self.find('ul.marquee>li')
		this.w = self.find('ul.marquee>li').width();
		this.allW = self.width();
		this.self = self;
		this.init();
	}
	marquee.prototype={
		init:function(){
			var self = this;
			this.layout();
			var timer = setInterval(move,30);
			self.self.hover(function() {
				clearInterval(timer);
			}, function() {
				timer = window.setInterval(move,30)
			});

			function move(){
				var length = self.marqueeUl.find('li').length;
				if (self.opts.steep<=(self.w*length/2)) {
					self.opts.steep+=1;
					}else{
						self.opts.steep=1;
				}
				self.self.scrollLeft(self.opts.steep)
			}
		},
		layout:function(){
			var cloneTxt = this.marqueeLi.clone();
			this.marqueeUl.append(cloneTxt);
			var length = this.marqueeUl.find('li').length;
			this.marqueeUl.css({
				width: this.w*length,
				overflow: 'auto'
			});
		}
	}
	window.marquee=marquee
})(jQuery);

/*
 *狼行千里吃肉 
 *come on ！！！！！！！！！ 
 *3、accordion
 */
(function($){
	function accordion(self,opt){
		this.opt=jQuery.extend({
			effectWays:"hover"
		},opt);
		this.self=self;
		this.accrodionUl = self.find('ul.accordion');
		this.accrodingLi = self.find('ul.accordion>li');
		this.index=0;
		this.init();
	}
	accordion.prototype={
		init:function(){
			var self = this;
			self.layout(self);

			if (this.opt.effectWays=="click") {
				this.accrodingLi.click(function() {
					self.index = $(this).index();
					self.accrodingLi.eq(self.index).find('.main').slideDown(300).parent().siblings().find('.main').slideUp(300);
					self.accrodingLi.eq(self.index).find('.title').addClass('on').parent().siblings().find('.title').removeClass('on');
				})
			}else{
				this.accrodingLi.hover(function() {
					self.index = $(this).index();
					t1=setTimeout(function(){
						self.accrodingLi.eq(self.index).find('.main').slideDown(300).parent().siblings().find('.main').slideUp(300);
						self.accrodingLi.eq(self.index).find('.title').addClass('on').parent().siblings().find('.title').removeClass('on');
					},100)
				},function(){
					clearTimeout(t1);
				})
			}
		},
		layout:function(self){
			self.accrodingLi.eq(self.index).find('.main').show().parent().siblings().find('.main').hide();
		}
	}
	window.accordion = accordion;
})(jQuery);

/*
 *狼行千里吃肉 
 *come on ！！！！！！！！！ 
 *4、txtMove
 */
(function($){
	function txtMove(self,opt){
		this.opt=jQuery.extend({
			time:3000,
			steep:500
		},opt);
		this.txtMove = self.find('ul.txtMove')
		this.txtMoveLi = self.find('ul.txtMove>li')
		this.self = self;
		this.high = this.txtMoveLi.height();
		this.init();
	}
	txtMove.prototype={
		init:function(){
			var self = this;
			var timer=setInterval(moveUp,self.opt.time)
			function moveUp(){
				self.txtMove.animate({
					marginTop: -self.high
				},self.opt.steep, function() {
					self.txtMove.find('li:last').after(self.txtMove.find('li:first'));
					self.txtMove.css('marginTop', 0);
				})
			}
		},
		layout:function(){
		}
	}
	window.txtMove = txtMove;
})(jQuery);
/*
 *狼行千里吃肉 
 *come on ！！！！！！！！！ 
 *5、marqueeTop
 */
(function($){
	function marqueeTop(self,opt){
		this.opt=jQuery.extend({
			count:4,
			steep:1
		},opt);
		this.marqueeUl = self.find('ul.marqueeTop')
		this.marqueeLi = self.find('ul.marqueeTop>li')
		this.h = self.find('ul.marqueeTop>li').height();
		this.self = self;
		this.init();
	}
	marqueeTop.prototype={
		init:function(){
			var self = this;
			this.layout();

			var timer = setInterval(moveT,30);
			self.self.hover(function() {
				clearInterval(timer);
			}, function() {
				timer = window.setInterval(moveT,30)
			});

			function moveT(){
				var length = self.marqueeUl.find('li').length;
				if (self.opt.steep<=(self.h*length/2)) {
					self.opt.steep+=1;
					}else{
						self.opt.steep=1;
				}
				self.self.scrollTop(self.opt.steep)
			}
		},
		layout:function(){
			var self = this;
			var cloneli = self.marqueeLi.clone();
			self.marqueeUl.append(cloneli);
			var length = self.marqueeUl.find('li').length;
			self.marqueeUl.css({
				height: self.h*length,
				overflow: 'auto'
			});
		}
	}
	window.marqueeTop = marqueeTop;
})(jQuery);

jQuery.fn.extend({
	sq209_tab:function(opts){
		return this.each(function() { 
			new tab($(this),opts)
		});
	},
	sq209_marquee:function(opts){
		return this.each(function() {
			new marquee($(this),opts)
		});
	},
	sq209_accordion:function(opts){
		return this.each(function() {
			new accordion($(this),opts)
		});
	},
	sq209_txtMove:function(opts){
		return this.each(function() {
			new txtMove($(this),opts)
		});
	},
	sq209_marqueeTop:function(opts){
		return this.each(function() {
			new marqueeTop($(this),opts)
		});
	}
});
