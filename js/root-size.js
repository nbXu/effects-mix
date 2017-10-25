$(function(){
	size();
	$(window).resize(function() {
		size();
	});
	function size(){
		var w= $('.container').width();
		var size =w/24+'px';
		$('html').css('fontSize', size);
	}
})

