var primaryColor = "#0080FF";
var highlightColor = "#FF8000";

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
  var address = '60623';
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
        zoom: 11,
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      contentText = "<h4>Ward 1</h4>";
      contentText += "Families served: 96<br/>";
      contentText += "Volunteers: 10<br/>";
      contentText += "Total Federal Refund: $178,058.00<br/>";
      contentText += "Average Federal Refund: $2,000.65<br/>";
      contentText += "Total State Refund: $13,595.00<br/>";
      contentText += "Average State Refund: $181.27";

      /* map the wards */
      for (i = 0; i < wardArray.length; i++)
      {
        var infowindow = new google.maps.InfoWindow({
          content: contentText
        });

        var ward = new google.maps.Polygon({
          paths: wardArray[i],
          fillColor: primaryColor,
          strokeColor: "#FFFFFF",
          strokeWeight: 1
        });
        ward.setMap(map);

        google.maps.event.addListener(ward,"mouseover",function(event){
          this.setOptions({fillColor: highlightColor});
          infowindow.setPosition(new google.maps.LatLng(41.8369,-87.6847));
          infowindow.open(map, this);
        });

        google.maps.event.addListener(ward,"mouseout",function(){
          this.setOptions({fillColor: primaryColor});
          infowindow.close();
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
