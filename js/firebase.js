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