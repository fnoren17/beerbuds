function populateFeed() {

var ref = firebase.database().ref("users/");
ref.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
	var activeUsers = [];
	snapshot.forEach(testfunc(snapshot));

	});//console.log("snapshot.child(name).val() ", snapshot.child("name").val()));//function(){
		//var firebaseName = document.getElementById("nameOfUsers");
		//console.log("snapshot.child(name).val() ", snapshot.child("name").val());
		//firebaseName.innerText = snapshot.child("name").val();
		//console.log("names", firebaseName.innerText)

	//});//console.log(snapshot.child("name").val()));

		//console.log(snapshot);
		//var firebaseNameRef = firebase.database().ref('users/' + userID).child("name")
		//console.log(firebaseNameRef);
	//});
//});

}

function testfunc(snapshot) {
	var firebaseName = document.getElementById("activeUsers");
	firebaseName.innerHTML += '<div class="row" id="flex" style="border: 1px solid black; border-radius: 5px;"><div class="col-4"><img src="https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15128952_10207573719443039_6551904099240725029_o.jpg?oh=3fb5df0585953f3bb5f5b8b42d67460a&oe=59B936A6" id="profilepic" width="100px" height="100px"></img></div><div class="col-8" style="font-size: 10pt"><b>' + snapshot.child("name").val() + '</b> wants to get his drink on <i><br/>near Östermalmstorg</i><br/><br/>Swipe right to start chatting ></div></div>'


  // var userID = auth.currentUser.uid;
  // var firebaseNameRef = firebase.database().ref('users/' + userID).child("name")
  // console.log("Ref: ",firebaseNameRef);
  // firebaseNameRef.on("value", function(datasnapshot) {
  //   Name.innerText = datasnapshot.val();
  //   console.log("Name: ", Name.innerText);
  //  });
}