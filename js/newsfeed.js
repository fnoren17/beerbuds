function populateFeed() {

var ref = firebase.database().ref("users/");
ref.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
	var activeUsers = [];
	snapshot.forEach(testfunc(snapshot))
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
	var firebaseName = document.getElementById("nameOfUsers");
	firebaseName.innerText += snapshot.child("name").val();

  // var userID = auth.currentUser.uid;
  // var firebaseNameRef = firebase.database().ref('users/' + userID).child("name")
  // console.log("Ref: ",firebaseNameRef);
  // firebaseNameRef.on("value", function(datasnapshot) {
  //   Name.innerText = datasnapshot.val();
  //   console.log("Name: ", Name.innerText);
  //  });
}