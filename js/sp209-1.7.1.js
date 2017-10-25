/*
 * 待解决
 *1、eventWays:"hover"  //fade 下hover事件存在异常  需控制单个txt下的盒子高度
 *2、非正常状态的 left 特效异常
 */
(function($){
	var parameter={
		effect:"hide",
		direction:"top",
		loop:true,
		num:0,
		eventWays:"click"
	}
	function Tab(obj,opt){
		this.obj=obj;
		this.btn = obj.find('ul.tab-btn>li');
		this.btnUl = obj.find('ul.tab-btn');
		this.txt = obj.find('ul.tab-txt>li');
		this.txtUl = obj.find('ul.tab-txt');
		this.length=obj.find('ul.tab-btn>li').length;
		this.w=this.txtUl.width();
		this.outerW=obj.width();
		this.cs=jQuery.extend({},parameter,opt);

		this.init();
		this.num=0;
		var self = this;

		$(window).resize(function() {
			self.w = self.btnUl.width();

			if (self.cs.effect=='left') {
				self.layOut();
				self.txtUl.animate({marginLeft: -self.w*self.num},0, function() {});
			}
		});
	}

	Tab.prototype={
		init:function(){
			var self = this;
			self.layOut();
			switch (this.cs.effect){
				case "hide":
					if (this.cs.eventWays=='click') {
						self.btn.click(function() {
							var index =$(this).index()
							self.effect_hide(index);
						})
					}else{
						self.btn.hover(function() {
							var index =$(this).index()
							self.effect_hide(index);
						})
					}
					break;
				
				case "fade":
					if (this.cs.eventWays=='click') {
						self.btn.click(function() {
							var index =$(this).index()
							self.effect_fade(index);
						})

					}else{
						self.btn.hover(function() {
							var index =$(this).index()
							self.effect_fade(index);
						})
					}
					break;

				case "left":
					if (this.cs.eventWays=='click') {

						self.btn.click(function() {
							var index =$(this).index();
							self.num=index;
							self.effect_left(index);
						})
					}
					break;

				default:
					self.btn.click(function() {
						var index =$(this).index()
						self.effect_hide(index);
					})
			}
		},

		effect_hide:function(index){
			var self = this;

			if (index==0) {
				var	index = 0;
			}else{
				var index = index || this.cs.num;
			}
			self.txt.hide().eq(index).show();
			self.btn.eq(index).addClass('on').siblings().removeClass('on');

		},
		effect_fade:function(index){
			var self = this;

			if (index==0) {
				var	index = 0;
			}else{
				var index = index || this.cs.num;
			}
			self.txt.hide().eq(index).fadeIn(500);
			self.btn.eq(index).addClass('on').siblings().removeClass('on');

		},

		effect_left:function(index){
			var self = this;

			self.btn.eq(index).addClass('on').siblings().removeClass('on');
			
			self.txtUl.animate({marginLeft: -self.w*index},300, function() {});

		},
		layOut:function(){
			var self = this;

			if (this.cs.effect=='hide'||this.cs.effect=='fade') {
				//就这样 挺好
				self.effect_hide();
				//生活一直没有容易
			}else if (this.cs.effect=='left'){

				self.txtUl.css({
					overflow: 'hidden',
					width: self.length * self.w/*,
					height:own.h*/
				});
				self.txt.css({
					width: self.w,
					float: 'left'
				});
			}
		}
	}
	window.Tab=Tab;
})(jQuery);


(function($){
	function Accordion(self,opt){
		this.opt=jQuery.extend({
			effectWays:"hover"
		},opt);
		this.self=self;
		this.accrodionUl = self.find('ul.accordion');
		this.accrodingLi = self.find('ul.accordion>li');
		this.index=0;
		this.init();
	}
	Accordion.prototype={
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
					self.accrodingLi.eq(self.index).find('.main').slideDown(300).parent().siblings().find('.main').slideUp(300);
					self.accrodingLi.eq(self.index).find('.title').addClass('on').parent().siblings().find('.title').removeClass('on');
				})
			}
		},
		layout:function(self){
			self.accrodingLi.eq(self.index).find('.main').show().parent().siblings().find('.main').hide();
		}
	}
	window.Accordion = Accordion;
})(jQuery);


(function($){
	function Marquee(self,opt){
		this.opt=jQuery.extend({
			count:4,
			steep:1
		},opt);
		this.marqueeUl = self.find('ul.marquee')
		this.marqueeLi = self.find('ul.marquee>li')
		this.w = self.find('ul.marquee>li').width();
		this.allW = self.width();
		this.self = self;
		this.init();
	}
	Marquee.prototype={
		init:function(){
			var self = this;
			this.layout(self);

			var timer = setInterval(move,30);
			self.self.hover(function() {
				clearInterval(timer);
			}, function() {
				timer = window.setInterval(move,30)
			});

			function move(){
				var length = self.marqueeUl.find('li').length;
				if (self.opt.steep<=(self.w*length/2)) {
					self.opt.steep+=1;
					}else{
						self.opt.steep=1;
				}
				self.self.scrollLeft(self.opt.steep)
			}
		},
		layout:function(self){
			/*var self = this;*/
			var clone = self.marqueeLi.clone();
			
			self.marqueeUl.append(clone);

			var length = self.marqueeUl.find('li').length;
			
			self.marqueeUl.css({
				width: self.w*length,
				overflow: 'auto'
			});
		}
	}
	window.Marquee = Marquee;
})(jQuery);


(function($){
	function TxtMove(self,opt){
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
	TxtMove.prototype={
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
	window.TxtMove = TxtMove;
})(jQuery);


(function($){
	function MarqueeTop(self,opt){
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
	MarqueeTop.prototype={
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
			var clone = self.marqueeLi.clone();
			
			self.marqueeUl.append(clone);

			var length = self.marqueeUl.find('li').length;


			
			self.marqueeUl.css({
				height: self.h*length,
				overflow: 'auto'
			});
		}
	}
	window.MarqueeTop = MarqueeTop;
})(jQuery);


//函数集合
jQuery.fn.extend({
	sq209_tab:function(opt){
		return this.each(function() {
			new Tab($(this),opt);

		})	
	},
	sq209_accordion:function(opt){
		return this.each(function() {
			new Accordion($(this),opt);

		})	
	},
	sq209_marquee:function(opt){
		return this.each(function() {
			new Marquee($(this),opt);

		})
	},
	sq209_txtMove:function(opt){
		return this.each(function() {
			new TxtMove($(this),opt);

		})
	},
	sq209_marqueeTop:function(opt){
		return this.each(function() {
			new MarqueeTop($(this),opt);

		})
	}
})
