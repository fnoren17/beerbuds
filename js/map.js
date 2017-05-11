
var map;
var markerwrap = document.getElementById("marker");
markerwrap.index = 1;
var markers = [];
var beer = document.getElementById('beer');

$(document).ready(function() {
    $('#js-show-map').click(function(event) {
          /* Act on the event */
          console.log('jsshowmap');
          google.maps.event.trigger(map, 'resize');
    });
});
  
beer.addEventListener('click',function(){
    deleteMarkers();
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP
      // icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
    });
    markers.push(marker);
    marker.addListener('dragend',function(){
      console.log('Here we can update the position');
      console.log(marker.position);
    });
});
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: setCenter(),
      zoom: 17,
      disableDefaultUI: true
      });
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(markerwrap);
}

function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function setCenter(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
}

function handleLocationError(browserHasGeolocation, pos) {
    alert('no geolocation');
}
}
