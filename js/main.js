
$(document).ready(function() {
	// Track the current page, starts with page 1
	var currentpage = '#page1';

	$('.navBtn').click(function(){
		var targetpage = $('#'+$(this).attr('targetpage'));
		show(targetpage);
	});

	var show = function(targetpage){
		$(currentpage).hide()
		targetpage.show();
		currentpage = targetpage;
	}
});

