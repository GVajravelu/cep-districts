function showInContentWindow(map, position, text)
{
  var content = "<div>" + text + "</div>";
  var infowindow = new google.maps.InfoWindow({
    content: content,
    position: new google.maps.LatLng(position.lat(),position.lng()-0.205), // offset the longitude by 0.205 to the west to make up for the weird offset
    pixelOffset: new google.maps.Size(300,0),
  })
  infowindow.open(map);
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
      var styles = [
        {
          stylers: [
            { hue: "#00ff66" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];
      var styledMap = new google.maps.StyledMapType(styles, { named: "Styled Map"});
      var mapOptions =
      {
        center: results[0].geometry.location,
        zoom: 8,
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      /* code for Chicago Wards */
      /*
      var wardLayers = new google.maps.KmlLayer({
        url: 'http://cep-districts.herokuapp.com/ChicagoWards.kml'
      });
      wardLayers.setMap(map);
      */
      /* end code for Chicago Wards */
      /* code for info windows on Chicago Wards */
      /*
      google.maps.event.addListener(wardLayers,'click',function(kmlEvent)
      {
        showInContentWindow(map, kmlEvent.latLng, kmlEvent.featureData.description);
      });
      */
      /* end code for info windows on Chicago Wards */

      ward1 = new google.maps.Polygon({
        paths: square,
        fillColor: '#000000'
      });
      ward1.setMap(map);

      google.maps.event.addListener(ward1,"mouseover",function(){
        this.setOptions({fillColor: "#00FF00"});
      });

      google.maps.event.addListener(ward1,"mouseout",function(){
        this.setOptions({fillColor: "#000000"});
      });
    }
    else
    {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
