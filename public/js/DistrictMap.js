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
      var styles = [
        {
          stylers: [
            { hue: "#00ff66" },
            { saturation: -20 }
          ]
        },{
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
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

      /* map the wards */
      for (i = 0; i < wardArray.length; i++)
      {
        ward = new google.maps.Polygon({
          paths: wardArray[i],
          fillColor: '#000000'
        });
        ward.setMap(map);

        google.maps.event.addListener(ward,"mouseover",function(){
          this.setOptions({fillColor: "#00FF00"});
        });

        google.maps.event.addListener(ward,"mouseout",function(){
          this.setOptions({fillColor: "#000000"});
        });
      }
      /* end code for mapping the wards */
    }
    else
    {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
