var primaryColor = "#0080FF";
var highlightColor = "#FF8000";

function showIndex(index)
{
  document.getElementById('index').innerHTML = index;
}

function makeCallback(index)
{
  return function() {
    showIndex(index);
  };
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
        draggable: false,
        zoom: 11,
        minZoom: 11,
        maxZoom: 11
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      /* map the wards */
      for (wardNum = 0; wardNum < wardCoordsArray.length; ++wardNum)
      {
        (function(wardNum) // this function is necessary so wardNum is not 50 on the mouseover event
        {
          var ward = new google.maps.Polygon({
            paths: wardCoordsArray[wardNum],
            fillColor: primaryColor,
            strokeColor: "#FFFFFF",
            strokeWeight: 1
          });
          ward.setMap(map);

          var contentText = "<h4>Ward " + (wardNum+1).toString() + "</h4>";
          contentText += "Families served: 96<br/>";
          contentText += "Volunteers: 10<br/>";
          contentText += "Total Federal Refund: $178,058.00<br/>";
          contentText += "Average Federal Refund: $2,000.65<br/>";
          contentText += "Total State Refund: $13,595.00<br/>";
          contentText += "Average State Refund: $181.27";

          var infowindow = new google.maps.InfoWindow({
            position: new google.maps.LatLng(41.8369,-87.6847),
            content: "<h4>Ward " + (wardNum+1).toString() + "</h4>"
          });

          google.maps.event.addListener(ward,"mouseover",function(){
            this.setOptions({fillColor: highlightColor});
            infowindow.open(map, this);
          });

          google.maps.event.addListener(ward,"mouseout",function(){
            this.setOptions({fillColor: primaryColor});
            infowindow.close();
          });
        })(wardNum);
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
