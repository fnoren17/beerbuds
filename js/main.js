
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

var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});

