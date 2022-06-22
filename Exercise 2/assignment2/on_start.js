

if (navigator.geolocation) {
  document.getElementById("auto_complete").innerHTML = "<button id=\"auto_complete_button\">Auto Detect</button>";
  document.getElementById("auto_complete_button").addEventListener("click",auto_complete);
  
  
}else{
  document.getElementById("address_error").innerHTML = "<span style=\"color:red\">We couldnt track automaticaly :/</span>";
}


function auto_complete(e){
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(change_position_fields);
}

function change_position_fields(position){
  
  
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  

  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      
      obj = JSON.parse(xhr.responseText);
      
      document.getElementById("city").value = obj.address.city;
      document.getElementById("country").value = obj.address.country;
      document.getElementById("adress").value = obj.address.road;
      loadDoc();
    }
  });
  
  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat="+lat+"&lon="+lon+"&accept-language=en&polygon_threshold=0.0");
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "6cab81b3a0mshde4d9cfc7706312p1fe652jsn97d06a35803c");
  
  xhr.send(data);
  
}