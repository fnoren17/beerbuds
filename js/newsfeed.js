function populateFeed() {

firebase.database().ref('/users/').on('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		console.log(childSnapshot.A.k.ba.left);
		});

});
}