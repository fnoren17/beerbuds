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

// console.log(provider);

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

//Logout
btnLogout.addEventListener("click", e =>{
  firebase.auth().signOut();
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    btnLogout.style.display = "block";
    document.getElementById("googleSignIn").style.display ="none";
    // document.getElementById("emailpassSignIn").style.display ="none";
    document.getElementById("beerbudsIntro").style.display ="none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("welcomeBack").style.display = "block";
    document.getElementById("Name").style.display = "block";

    printName();
    printBeer();

    // Show the navbar if logged in.
    $('#navbar').css('display','flex');

  } else {
    btnLogout.style.display = "none";
    document.getElementById("googleSignIn").style.display ="block";
    // document.getElementById("emailpassSignIn").style.display ="block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("beerbudsIntro").style.display ="block";
    document.getElementById("welcomeBack").style.display = "none";
    document.getElementById("Name").style.display = "none";




    // Hide navbar if not logged in
    $('#navbar').hide();
  }
});


const auth = firebase.auth();


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


//Create ID to database with your UUID
var googleSignIn = document.getElementById("googleSignIn")

function createID() {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      $('#profilePic').html("<img style='height:150px; width:150px; border-radius: 50%; border-style:solid; border-color:white; border-width:3px;' src=" + firebaseUser.photoURL + ">");
      $('#profilePic').show();
      var userID = firebaseUser.uid;
      fireBaseRef = firebase.database().ref('users/' + userID).child('name');
      fireBaseRef.on("value", function(snapshot) {
      if (!snapshot.val()) {
        setNewUserData(userID);
      }
      else {
      // console.log('loggar in???');
      firebase.database().ref('users/' + userID).update({
        isActive: false
        });
      }
      });
    }
  });
}

function setNewUserData(userID) {
  $("#page1").hide();
  $("#navbar").hide();
  document.getElementById("page5").style.display = "block";
}

function submitInfoClick() {
    document.getElementById("submitInfoBtn").addEventListener("click", e => {
    var name = firstNameInput.value;
    var beer = firstBeerInput.value;
    if (!name || !beer) {
      $("#errorMess").show();
    }
    else {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
      $('#profilePic').html("<img style='height:150px; width:150px; border-radius: 50%; border-style:solid; border-color:white; border-width:3px;' src=" + firebaseUser.photoURL + ">");
      $('#profilePic').show();

      firebase.database().ref('users/' + firebaseUser.uid).set({
        name: name,
        beer1: beer,
        photoUrl: firebaseUser.photoURL,
        isActive: false
        });
      $("#errorMess").hide();
      $("#page1").show();
      $("#page5").hide();
      $("#navbar").show();
    }
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
  var beerInput = document.getElementById('beer1Input');
  var messageText = beerInput.value;

  firebaseRef.update({
    beer1: messageText,
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
    // console.log("Name: ", Name.innerText);
  });
}


function printBeer(){
  var firebaseName = document.getElementById("Beer1");
  var userID = auth.currentUser.uid;

  var firebaseNameRef = firebase.database().ref('users/' + userID).child("beer1")
  console.log("Ref: ",firebaseNameRef);
  firebaseNameRef.on("value", function(datasnapshot) {
    Beer1.innerText = datasnapshot.val();
    // console.log("beer: ", Beer1.innerText);
  });
}
