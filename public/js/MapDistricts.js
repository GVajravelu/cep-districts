var primaryColor = "#7CA3CA";
var highlightColor = "#E7B222";

function initialize()
{
  var address = '61702';
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status)
  {
    if (status == google.maps.GeocoderStatus.OK)
    {
      var styles = [
        {
          stylers: [
            { /*hue: "#00ff66"*/ },
            { saturation: -80 }
          ]
        },{
          featureType: "road",
          elementType: "labels",
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
        //draggable: false,
        zoom: 7,
        //minZoom: 11,
        //maxZoom: 11
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      /* add CEP logo to the map */
      var logoLatLng = new google.maps.LatLng(42.070000,-87.498163);
      var logoSrc = 'images/CEP_small_logo.gif';
      var logo = new google.maps.Marker({
        position: logoLatLng,
        map: map,
        icon: logoSrc
      });
      /* end adding CEP logo to the map */


      /* map the district */
      for (districtNum = 0; districtNum < districtCoordsArray.length; ++districtNum)
      {
        (function(districtNum) // this function is necessary so districtNum is not 50 on the mouseover event
        {
          var district = new google.maps.Polygon({
            paths: districtCoordsArray[districtNum],
            fillColor: primaryColor,
            fillOpacity: 0.7,
            strokeColor: "#FFFFFF",
            strokeWeight: 1
          });
          district.setMap(map);

/*
          var contentText = "<div id='universal'><h4>Ward " + (districtNum+1).toString() + "</h4>";
          contentText += "Families served: " + famServArray[districtNum] + "<br/>";
          contentText += "Volunteers: " + volArray[districtNum] + "<br/>";
          contentText += "Total Federal Refund: " + numeral(totFedArray[districtNum]).format('$0,0.00') + "<br/>";
          contentText += "Average Federal Refund: " + numeral(avgFedArray[districtNum]).format('$0,0.00') + "<br/>";
          contentText += "Total State Refund: " + numeral(totStateArray[districtNum]).format('$0,0.00') + "<br/>";
          contentText += "Average State Refund: " + numeral(avgStateArray[districtNum]).format('$0,0.00') + "</div>";

          var infowindow = new google.maps.InfoWindow({
            position: districtCenterCoordsArray[districtNum],
            maxWidth: 500,
            content: contentText
          });
*/

          google.maps.event.addListener(district,"mouseover",function(){
            this.setOptions({fillColor: highlightColor});
            //infowindow.open(map);
          });

          google.maps.event.addListener(district,"mouseout",function(){
            this.setOptions({fillColor: primaryColor});
            //infowindow.close();
          });
        })(districtNum);
      }
      /* end code for mapping the district */
    }
    else
    {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
