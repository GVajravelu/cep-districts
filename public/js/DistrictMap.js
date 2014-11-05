function addTaxSite(map, latLng, siteTitle, numClients) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: siteTitle
  });
  var infoWindow = new google.maps.InfoWindow({
    content: '<h4>' + siteTitle + '</h4> <h5>Clients: ' + numClients + '</h5>'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.open(map,marker);
  });
}

function initialize()
{
  var address = '60661';
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status)
  {
    if (status == google.maps.GeocoderStatus.OK)
    {
      //alert('Latitude: ' + results[0].geometry.location.lat().toString() + ' Longitude: ' + results[0].geometry.location.lng().toString());
      //alert('Bounds: ' + results[0].geometry.bounds.toString());
      var mapOptions =
      {
        center: results[0].geometry.location,
        zoom: 8
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      addTaxSite(map,new google.maps.LatLng(41.750761, -87.653492),"Auburn Gresham","1206");
      addTaxSite(map,new google.maps.LatLng(41.811897, -87.707734),"Brighton Park","328");
      addTaxSite(map,new google.maps.LatLng(41.823083, -87.625810),"Bronzeville","1263");
      addTaxSite(map,new google.maps.LatLng(41.854686, -87.714431),"Lawndale","662");
      addTaxSite(map,new google.maps.LatLng(41.886259, -87.626778),"Loop","4036");
      addTaxSite(map,new google.maps.LatLng(41.845863, -87.684122),"Pilsen","1118");
      addTaxSite(map,new google.maps.LatLng(41.964811, -87.658816),"Uptown","3556");
      addTaxSite(map,new google.maps.LatLng(41.758685, -88.317071),"Aurora","902");
      //addTaxSite(map,new google.maps.LatLng(41.750761, -87.653492),"South Suburbs","576");
      addTaxSite(map,new google.maps.LatLng(42.042935, -88.287852),"Elgin","1556");
      addTaxSite(map,new google.maps.LatLng(42.048615, -87.679974),"Evanston","405");
      addTaxSite(map,new google.maps.LatLng(41.533601, -88.097103),"Joliet","648");
      //addTaxSite(map,new google.maps.LatLng(41.750761, -87.653492),"Lake County","740");
      //addTaxSite(map,new google.maps.LatLng(41.750761, -87.653492),"West Chicago","0 (New 2015 site)");
      addTaxSite(map,new google.maps.LatLng(39.788367, -89.646304),"Springfield","888");

      /* new code for shaded area */
      var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: results[0].geometry.bounds
      });
      /* end new code for shaded area */
    }
    else
    {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
