$(document).ready(function() {
	// Track the current page, starts with page 1
	var currentpage = '#page1';

	$('.navBtn').click(function(){
		var targetpage = $('#'+$(this).attr('targetpage'));
		show(targetpage);
	});

	var show = function(targetpage){
		$(currentpage).hide()
		targetpage.show();
		currentpage = targetpage;
	}
});

var app = {};

var host = 'vernemq.evothings.com';
var port = 8084;
var user = 'anon';
var password = 'ymous';

app.connected = false;
app.ready = false;

app.initialize = function() {
	document.addEventListener(
		'deviceready',
		app.onReady,
		false);
}

app.onReady = function() {
	if (!app.ready) {
		app.username = 'Anonymous';
		app.pubTopic = '/beerbuds/' + device.uuid + '/evt'; // We publish to our own device topic
		app.subTopic = '/beerbuds/+/evt'; // We subscribe to all devices using "+" wildcard
		// app.setupInfo();
		app.setupSendMessage();
		app.setupConnection();
		app.ready = true;
	}
}

// app.setupInfo = function(){
// 	var unamebtn = document.getElementById('changeuname');
// 	var unameinput = document.getElementById('username');

// 	unamebtn.addEventListener("click", function(event) {
// 		app.username = unameinput.value;
// 	});
// }
app.setupSendMessage = function() {
	var newMessageBtn = document.getElementById('submitMessage');
	var newMessageInput = document.getElementById('newMessage');

	newMessageBtn.addEventListener("click", function(event) {
		var message = newMessageInput.value;
		var recieverInput = document.getElementById('recieverInput').value;
		var recieverName = recieverInput;
		newMessageInput.value = '';
		if (app.connected) {
			var msg = JSON.stringify({user: app.username, message: message, reciever: recieverName})
			app.publish(msg);
		}
		document.getElementById('recieverInput').value = '';
	});
}

app.setupConnection = function() {
	console.log('connecting');
	app.status("Connecting to " + host + ":" + port + " as " + device.uuid);
	app.client = new Paho.MQTT.Client(host, port, device.uuid);
	app.client.onConnectionLost = app.onConnectionLost;
	app.client.onMessageArrived = app.onMessageArrived;
	var options = {
		useSSL: true,
		onSuccess: app.onConnect,
		onFailure: app.onConnectFailure
	}
	app.client.connect(options);
}

app.publish = function(json) {
	message = new Paho.MQTT.Message(json);
	message.destinationName = app.pubTopic;
	app.client.send(message);
};

app.subscribe = function() {
	app.client.subscribe(app.subTopic);
	console.log("Subscribed: " + app.subTopic);
}

app.unsubscribe = function() {
	app.client.unsubscribe(app.subTopic);
	console.log("Unsubscribed: " + app.subTopic);
}

app.onMessageArrived = function(message) {
	var showMessages = document.getElementById('showMessages');
	var o = JSON.parse(message.payloadString);
	hyper.log(o.user);

	if(o.reciever == app.username || app.username == o.user || o.reciever == ''){
		var finalmessage = '<div class="messageContainer style="padding:5px;"><span class="name" style="font-weight:bold;">'+ o.user +': </span><span class="message">'+o.message+'</div>';
		showMessages.innerHTML = showMessages.innerHTML + finalmessage;
	}	
}

app.onConnect = function(context) {
	app.subscribe();
	app.status("Connected!");
	app.connected = true;
}

app.onConnectFailure = function(e){
  console.log("Failed to connect: " + JSON.stringify(e));
}

app.onConnectionLost = function(responseObject) {
	app.status("Connection lost!");
	console.log("Connection lost: "+responseObject.errorMessage);
	app.connected = false;
}

app.status = function(s) {
	console.log('körs status');
	console.log(s);
	var info = document.getElementById("info");
	info.innerHTML = s;
}

app.initialize();