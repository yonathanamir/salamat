// function geo_success(position){
//     // str = position.coords.latitude + ', ' + position.coords.longitude
//     $('.coord .coord-lat')[0].innerHTML = position.coords.latitude
//     $('.coord .coord-lon')[0].innerHTML = position.coords.longitude
// }

alert('Test Watch')
// navigator.geolocation.getCurrentPosition(geo_success)

const watchID = navigator.geolocation.watchPosition((position) => {
    $('.coord .coord-lat')[0].innerHTML = position.coords.latitude
    $('.coord .coord-lon')[0].innerHTML = position.coords.longitude
  });
  