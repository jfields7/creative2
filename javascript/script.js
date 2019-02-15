var map;
var service;
var infowindow;

function initialize(){
  var byu = new google.maps.LatLng(40.251887,-111.649332);

  map = new google.maps.Map(document.ElementById('map'),{
    center: byu,
    zoom: 15
  });

  var request = {
    location: byu,
    radius: '3200',
    query: 'apartment'
  };
  
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request,callback);
}

function callback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK){
    for(let i = 0; i < results.length; i++){
      var place = results[i];
      createMarker(results[i]);
    }
  }
  else{
    document.ElementById('map').innerHTML('<p>Map not loaded.</p>');
  }
}
