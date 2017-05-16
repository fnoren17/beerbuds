function populateFeed() {

	var firebaseName = document.getElementById("activeUsers");
	firebaseName.innerHTML = ""

	var ref = firebase.database().ref("users/");
	ref.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
		snapshot.forEach(testfunc(snapshot));
	});

}

function testfunc(snapshot) {
	var lat = snapshot.child('position').val().lat;
	var lng = snapshot.child('position').val().lng;
	var name = snapshot.child('name').val();
	var photoURL = snapshot.child('photoUrl').val();
	if(!photoURL){
		photoURL = 'http://www.clevelandheights.com/modules/showimage.aspx?imageid=601';
	}

	var firebaseName = document.getElementById("activeUsers");
	firebaseName.innerHTML += '<div onclick="showPos(' + lat + ',' + lng + ',\''+ name+'\')" class="row" targetpage="page3" id="flex" style="border: 1px solid black; border-radius: 5px;"><div class="col-4"><img src="'+photoURL+'" id="profilepic" width="100px" height="100px"></img></div><div class="col-8" style="font-size: 10pt"><b>' + snapshot.child("name").val() + '</b> wants to get his drink on <i><br/><br/>Tap to see position</div></div>'
}

function showPos(lat, lng, name) {
	var h1 = $("#page6 h1");
	h1.html(name +'s position');
	var pos = {"lat":lat, "lng":lng};
	// console.log(hej);

	var map2 = new google.maps.Map(document.getElementById('map_p6'), {
		center: pos,
		zoom: 17,
		disableDefaultUI: true
	});

   var marker2 = new google.maps.Marker({
      position: pos,
      draggable: false,
      animation: google.maps.Animation.DROP
    });
    marker2.setMap(map2);

   	targetpage = $("#page6");
	showpage(targetpage);

	google.maps.event.trigger(map2, 'resize');
	// map2.controls[google.maps.ControlPosition.LEFT_TOP].push(markerwrap);
	
}