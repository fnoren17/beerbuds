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

  var ref = firebase.database().ref("users");
  var users = [];
  ref.orderByKey().on("child_added", function(snapshot) {
    users.push(snapshot.key);
  });
  

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
    document.getElementById("beerbudsIntro").style.display ="none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("welcomeBack").style.display = "block";

    printName();
    printBeer();

    // Show the navbar if logged in.
    $('#navbar').css('display','flex');

  } else {
    btnLogout.style.display = "none";
    document.getElementById("googleSignIn").style.display ="block";
    document.getElementById("emailpassSignIn").style.display ="block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("beerbudsIntro").style.display ="block";
    document.getElementById("welcomeBack").style.display = "none";



    // Hide navbar if not logged in
    $('#navbar').hide();
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
        // This is the only thing we need from go3ogle when logging in for the first time. 
        // We can set the rest of the properties in profile page later.
        });
    }
  });
}


var preObject = document.getElementById("object");
var ulList = document.getElementById("list");

//Create references
var dbRefObject = firebase.database().ref().child("object");
var dbRefList = dbRefObject.child("Hobbies");


// //Sync object changes
// dbRefObject.on("value", snap => {
//   preObject.innerText = JSON.stringify(snap.val(),null,3)
// });


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
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      var userID = firebaseUser.uid;
      firebase.database().ref('users/' + userID).set({
        name: 'John Appleseed',
        beer1: 'lager',
        beer2: 'IPA',
        beer3: 'APA',
        bio: 'Hi I am John',
        isActive: false
        });
    }
  });
}

//Add new data to firebase
function submitNameClick() {
  var userID = auth.currentUser.uid;
  var firebaseRef = firebase.database().ref('users/' + userID);
  var messageText = nameInput.value;

  firebaseRef.update({
    name: messageText
  }); //.push().
}

function submitBeerClick() {
  var userID = auth.currentUser.uid;
  var firebaseRef = firebase.database().ref('users/' + userID);
  var messageText = beer1Input.value;
  var messageText2 = beer2Input.value;
  var messageText3 = beer3Input.value;

  firebaseRef.update({
    beer1: messageText,
    beer2: messageText2,
    beer3: messageText3
  }); //.push().
}

//Retrieve data from firebase
function printName(){
  var firebaseName = document.getElementById("Name");
  var userID = auth.currentUser.uid;
  var firebaseNameRef = firebase.database().ref('users/' + userID).child("name")
  console.log("Ref: ",firebaseNameRef);
  firebaseNameRef.on("value", function(datasnapshot) {
    Name.innerText = datasnapshot.val();
    console.log("Name: ", Name.innerText);
  });
}


function printBeer(){
  var firebaseName = document.getElementById("Beer1");
  var firebaseName = document.getElementById("Beer2");
  var firebaseName = document.getElementById("Beer3");
  var userID = auth.currentUser.uid;

  var firebaseNameRef = firebase.database().ref('users/' + userID).child("beer1")
  console.log("Ref: ",firebaseNameRef);
  firebaseNameRef.on("value", function(datasnapshot) {
    Beer1.innerText = datasnapshot.val();
    console.log("beer: ", Beer1.innerText);
  });
  var firebaseNameRef = firebase.database().ref('users/' + userID).child("beer2")
  console.log("Ref: ",firebaseNameRef);
  firebaseNameRef.on("value", function(datasnapshot) {
    Beer2.innerText = datasnapshot.val();
    console.log("beer: ", Beer2.innerText);
  });
  var firebaseNameRef = firebase.database().ref('users/' + userID).child("beer3")
  console.log("Ref: ",firebaseNameRef);
  firebaseNameRef.on("value", function(datasnapshot) {
    Beer3.innerText = datasnapshot.val();
    console.log("beer: ", Beer3.innerText);
  });
}
