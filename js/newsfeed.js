function populateFeed() {

var ref = firebase.database().ref("users/");
ref.orderByChild("isActive").equalTo(true).on("child_added", function(snapshot) {
	var activeUsers = [];
	snapshot.forEach(activeUsers.push(snapshot.key);

		console.log(snapshot);
		var firebaseNameRef = firebase.database().ref('users/' + userID).child("name")
		console.log(firebaseNameRef);
	});
});

}