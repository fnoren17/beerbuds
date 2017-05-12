 // Initialize Firebase
var config = {
  apiKey: "AIzaSyDxSvYZAvDu3U37hMZGuyxUvWfRT6WrDFc",
  authDomain: "authentication-mobut-proj.firebaseapp.com",
  databaseURL: "https://authentication-mobut-proj.firebaseio.com",
  projectId: "authentication-mobut-proj",
  storageBucket: "authentication-mobut-proj.appspot.com",
  messagingSenderId: "209640989261"
};
firebase.initializeApp(config);
// console.log("firebase: ",firebase)

//Login with google
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      // console.log(token)
      // console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      // console.log(error.code)
      // console.log(error.message)
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



//Login without google
var txtEmail = document.getElementById("txtEmail");
var txtPassword = document.getElementById("txtPassword");
var btnLogin = document.getElementById("btnLogin");
var btnSignUp = document.getElementById("btnSignUp");
var btnLogout = document.getElementById("btnLogout"); 


//Add login event
btnLogin.addEventListener("click", e => {
	//get email and pass
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	//sign in
	var promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e=> console.log(e.message));

});

btnSignUp.addEventListener("click", e => {
  //TODO check for real email
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();
  //Sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
    .catch(e=> console.log(e.message));
});

//Logout
btnLogout.addEventListener("click", e =>{
  firebase.auth().signOut();
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    btnLogout.style.display = "block";
    document.getElementById("googleSignIn").style.display ="none";
    document.getElementById("emailpassSignIn").style.display ="none";
  } else {
    btnLogout.style.display = "none";
    document.getElementById("googleSignIn").style.display ="block";
    document.getElementById("emailpassSignIn").style.display ="block";
  }
});

const auth = firebase.auth();

function createID() {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      // console.log(firebaseUser);
      var userID = firebaseUser.uid;
      firebase.database().ref('users/' + userID).update({
        name: firebaseUser.displayName
        // This is the only thing we need from google when logging in for the first time. 
        // We can set the rest of the properties in profile page later.
        });
    }
  });
}
