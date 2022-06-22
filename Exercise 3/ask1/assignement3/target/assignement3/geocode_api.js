
document.getElementById("whole_form").addEventListener("sumbit",loadDoc);
document.getElementById("adress").addEventListener("input",loadDoc);
document.getElementById("city").addEventListener("input",loadDoc);
var obj;
function loadDoc(){
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
  obj = JSON.parse(xhr.responseText);
  
  markers.clearMarkers();
  if(Object.keys(obj).length === 0){
    address_doesnt_exist();
  }else{
    address_exists(obj);
    
  }
  }
  });

  let addressName=document.getElementById("adress").value;;
  
  let city=document.getElementById("city").value;
  let country=document.getElementById("country").value;
  
  let address=addressName+" "+city+" "+country;
  
  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&acceptlanguage=en&polygon_threshold=0.0");
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "6cab81b3a0mshde4d9cfc7706312p1fe652jsn97d06a35803c");
  xhr.send(data);
  }

function address_exists(obj){
  
  const address_error = document.getElementById("address_error");
  
  if(obj[0].display_name.includes("Region of Crete")){
    address_error.innerHTML = "<button id=\"spawn_map_button\">MAP</button>";
    document.getElementById("spawn_map_button").addEventListener("click",spawn_map);
    
    
    //Putting the marker of the found address
    var position = setPosition(obj[0].lat, obj[0].lon);
    var mar = new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function (evt) {
      handler(position, 'Given Address');
    }
    );
    //Orismos zoom	
    const zoom = 14;
    map.setCenter(position, zoom);

  }else{
    address_error.innerHTML = "<span style=\"color:red\">Service works only for crete residents !</span>";
  }
}



function address_doesnt_exist(){
  const address_error = document.getElementById("address_error");
  address_error.innerHTML = "<span style=\"color:red\">Address not found !</span>";
  const tr = document.getElementById("Map");
  tr.style.display = "none";
  tr.flag = false;
}



function spawn_map(e){
  e.preventDefault();
  const tr = document.getElementById("Map");
  if(tr.flag){
    tr.style.display = "none";
    tr.flag = false;
  }else{
    tr.flag = true ;
    tr.style.display = "block";
  }
}

  //Orismos Marker
    map = new OpenLayers.Map("Map");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    //Orismos Thesis
    function setPosition(lat, lon) {
      var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
      var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
      var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
      return position;
    }

    //Orismos Handler

    function handler(position, message) {
      var popup = new OpenLayers.Popup.FramedCloud("Popup",
        position, null,
        message, null,
        true // <-- true if we want a close (X) button, false otherwise
      );
      map.addPopup(popup);
      
    }

    //Markers	
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);

    
