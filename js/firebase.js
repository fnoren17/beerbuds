 // Initialize Firebase
      var config = {
        apiKey: "AIzaSyDxSvYZAvDu3U37hMZGuyxUvWfRT6WrDFc",
        authDomain: "authentication-mobut-proj.firebaseapp.com",
        databaseURL: "https://authentication-mobut-proj.firebaseio.com",
        projectId: "authentication-mobut-proj",
        storageBucket: "gs://authentication-mobut-proj.appspot.com",
        messagingSenderId: "209640989261"
      };
      firebase.initializeApp(config);
      //console.log("firebase: ",firebase)


//Login with google
var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      //console.log(token)
      //console.log(user)
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
    //console.log("firebaseUser: ",firebaseUser);
    btnLogout.style.display = "block";
    document.getElementById("googleSignIn").style.display ="none";
    document.getElementById("email/passSignIn").style.display ="none";
  } else {
    console.log("not logged in");
    btnLogout.style.display = "none";
    document.getElementById("googleSignIn").style.display ="block";
    document.getElementById("email/passSignIn").style.display ="block";
  }
})

const auth = firebase.auth();




//Add data to database
//Get elements
var preObject = document.getElementById("object");
var ulList = document.getElementById("list");

//Create references
var dbRefObject = firebase.database().ref().child("object");
var dbRefList = dbRefObject.child("Hobbies");


//Sync object changes
dbRefObject.on("value", snap => {
  preObject.innerText = JSON.stringify(snap.val(),null,3)
});


//Changing the database
dbRefList.on("child_added", snap=> {
  var li = document.createElement('li');
  li.innerText = snap.val();
  li.id = snap.key;
  ulList.appendChild(li);
});

dbRefList.on("child_changed", snap=> {
  var liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});

dbRefList.on("child_removed", snap=> {
  var liToRemove = document.getElementById(snap.key);
  liToRemove.remove();
});

var nameInput = document.getElementById("nameInput");
var submitNameBtn = document.getElementById("submitNameBtn");
var submitBeerBtn = document.getElementById("submitBeerBtn");

//Add files to storage
//var storage = firebase.storage();
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

fileButton.addEventListener("change", function(e){
  //Get file
  var file = e.target.files[0];
  //console.log("firebasestorage: ", firebase.storage().ref("sweet_gifs/"));
  console.log("firebase: ", firebase)

  //Create a storage ref
  var storageRef = firebase.storage().ref("ProfilePic/").child(file.name);

  //Upload file
  storageRef.put(file);

  //Update progress bar
  task.on("state_changed",
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      uploader.value = percentage;

    },

    function error(err) {

    },
    function complete() {

    }
    );
});



//TODO skapa submitclick lägg in firebase.database().ref() med sitt id så det läggs till när
// man skapar en användare med ett id. Sen kan all info länkas lätt till det specifika id:t när man loggar in

//Create ID to database with your UUID
var googleSignIn = document.getElementById("googleSignIn")
function createID() {
  var firebaseRef = firebase.database().ref();
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser.uid);
      var userID = firebaseUser.uid;
      firebaseRef.child("Users").set(userID);
    }
  });
  //var userID = googleSignIn.value;
  //console.log("UserID: ",userID)
  //firebaseRef.push().set(userID)
}


//Add new data to firebase
function submitNameClick() {
  var firebaseRef = firebase.database().ref();
  var messageText = nameInput.value;

  firebaseRef.child("text").set(messageText) //.push().
}
//Retrieve data from firebase
var firebaseName = document.getElementById("Name");

var firebaseNameRef = firebase.database().ref().child("text")
firebaseNameRef.on("value", function(datasnapshot) {
  Name.innerText = datasnapshot.val();
});

function submitBeerClick() {
  var firebaseRef = firebase.database().ref();
  var messageText = beerInput.value;

  firebaseRef.child("beers").set(messageText) //.push().
}

//Retrieve data from firebase
var firebaseBeers = document.getElementById("Beers");

var firebaseNameRef = firebase.database().ref().child("beers")
firebaseNameRef.on("value", function(datasnapshot) {
  Beers.innerText = datasnapshot.val();
  console.log("beerS", Beers.innerText)
});

// //Retrieve data from firebase
// var firebaseName = document.getElementById("Name");

// var firebaseNameRef = firebase.database().ref().child("text")
// firebaseNameRef.on("value", function(datasnapshot) {
// Name.innerText = datasnapshot.val();
// });