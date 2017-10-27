/*
 *除非自己行 靠谁都不行
 *come on ！！！！！！！！！ 
 *1、tab
 */
(function($){
	var parameter={
		effect:"left",
		current:1,
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
				This.txtBox.animate({marginLeft: -This.gdW*This.num},0, function() {});
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
							clearTimeout(t);
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
			this.btn.eq(index).addClass('on').siblings().removeClass('on');
			this.txt.hide(0).eq(index).fadeIn(200);
			
		},
		effect_left:function(index){
			this.btn.eq(index).addClass('on').siblings().removeClass('on');
			this.txtBox.stop(true,true).animate({marginLeft: -this.gdW*index},300, function() {});
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

			}else{
				this.effect_default()
			}
		}
	}
	
	window.tab = tab;
})(jQuery)

jQuery.fn.extend({
	sq209_tab:function(opts){
		return this.each(function() {
			new tab($(this),opts)
		});
	}
});
