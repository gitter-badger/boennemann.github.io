(function() {
  'use strict';

  var shade = function(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return '#'+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  };

  var color = randomColor({
    luminosity: 'bright'
  });
  var dark = shade(color, -0.2);

  var customStyles = document.createElement('style');
  customStyles.appendChild(document.createTextNode(
    'a {'+
      'color: ' + color +
    '} '+
    'a:hover, a:focus {'+
      'color: ' + dark +
    '}'
  ));
  document.documentElement.insertBefore(customStyles, null);

  var request = new XMLHttpRequest();
  request.open('GET', 'https://boennemann-location.herokuapp.com/location', true);

  request.onload = function() {
    if (this.status !== 200){
      return;
    }
    var location = JSON.parse(this.response).location;
    var lat = location.lat;
    var lng = location.lng;

    document.querySelector('#marker').insertAdjacentHTML('afterend',
      '<br>' +
      '<span>Last seen in ' +
        '<a href="https://maps.google.com/?q=' + lat + ',' + lng + '">' +
          location.city + ', ' + location.country +
        '</a>' +
      '</span>')
  };
  request.send();
}).call(this);
