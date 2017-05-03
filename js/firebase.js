var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}



//console.log("#43")


/*
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("testing")
    $("loginCover").hide();
  } else {
    // No user is signed in.
    console.log("testing2")
    alert("You are not logged in");
  }
});

$("loginButton").click(
function() {
	var email = $("#loginEmail").val();
	var password = $("#loginPassword").val();

	if(email!="" && password!=""){
		$("loginButton").hide()

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
			$("loginError").show().text(error.message);
		})
	}
});

*/



/*
    // LOGIN FUNCTIONS
    this.login = function(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
      
      firebase.auth().onAuthStateChanged(function(user){
        if(user) {
         window.location = "#/question";
        }
      });

      //if(firebase.auth().currentUser.email){
      //  window.location.href = "#/question";
      //}
    }

    // SIGNOUT FUNCTION
    this.signOut = function(){
      firebase.auth().signOut().then(function() {
        ///console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

    // NEW ACCOUNT FUNCTION
    this.newAccount = function(email, password) {
      user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
      
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        console.log("TESt")
      }
      });
    // ADDING NEW USER DATA
    // SERVER TAKES SOME TIME TO STORE NEW USER AND ASSIGNING ID

    setTimeout(function() {
        var userId = user.na.uid;
        var JSONDATA = '{"highScore":0,"right":0,"wrong":0}';
        firebase.database().ref('users/' + userId).set(JSON.parse(JSONDATA));
      }, 1000);
    }
    // RETURNING THIS
    return this;
    */