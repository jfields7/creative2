let map;
let service;
let infowindow;

function initialize(){
  let byu = new google.maps.LatLng(40.251887,-111.649332);

  map = new google.maps.Map(document.getElementById('map'),{
    center: byu,
    zoom: 15
  });
  document.getElementById('map').innerHTML = '';

  let request = {
    location: byu,
    radius: '3200',
    query: 'apartment'
  };
  
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request,callback);
}

function callback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK){
    let data = "";
    for(let i = 0; i < results.length; i++){
      let place = results[i];
      let request = {
        placeId: results[i].place_id,
        fields: ['name', 'formatted_address', 'rating', 'photo', 'formatted_phone_number', 'website']
      }
      service.getDetails(request, detailCallback);
    }
    //document.getElementById('map').innerHTML = data;
  }
  else{
    document.getElementById('map').innerHTML = '<p>Map not loaded.</p>';
  }
}

function detailCallback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK){
    let data = "";
    data += '<div class="apartment">';
    data += '<p>' + results.name + '</p>';
    if(typeof results.photos !== 'undefined'){
      data += '<img src="' + results.photos[0].getUrl() + '"></img>';
    }
    else{
      data += '<img src="/images/noimage.png"></img>';
    }
    if(typeof results.rating !== 'undefined'){
      data += '<p class="rating">' + results.rating + ' out of 5 stars</p>';
    }
    else{
      data += '<p class="rating">No rating available</p>';
    }
    data += '<p class="address">' + results.formatted_address + '</p>';
    if(typeof results.formatted_phone_number !== 'undefined'){
      data += '<p class="telephone">' + results.formatted_phone_number + '</p>';
    }
    else{
      data += '<p class="telephone">No phone number available</p>';
    }
    if( typeof results.website !== 'undefined'){
      url = results.website;
      data += '<p>Website: <a href="' + url + '">' + url + '</a></p>';
    }
    else{
      data += '<p>Website: None available</p>';
    }
    document.getElementById('map').innerHTML += data;
    
  }
}

document.getElementById("submitSearch").addEventListener("click",function(event){
  event.preventDefault();
  const value = document.getElementById("map").value;
  console.log("Button clicked");
  if(value===""){
    console.log("Returning prematurely.");
    return;
  }
  initialize();
});

/*document.getElementById("submitSearch").addEventListener("click",function(event){
  event.preventDefault();
  const value = document.getElementById("map").value;
  console.log("Button clicked.");
  if(value===""){
    console.log("Returning prematurely.");
    return;
  }
  const url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=apartment&inputtype=textquery&fields=photos,formatted_address,name,rating&locationbias=circle:3200@40.2518887,-111.649332&key=AIzaSyAJwquJfMDwf08FXui36GwgWHKhcd49-a4";
  fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(json){
      let results = "";
      results += '<h2>Apartments near BYU</h2>';
      for(let i=0; i < json.candidates.length; i++){
        results += '<p>' + json.candidates[i].name + '</p>';
      }
      document.getElementById("map").innerHTML = results;
    });
});*/
