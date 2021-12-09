function geo_success(position){
    str = position.coords.longitude + ', ' + position.coords.latitude
    alert(str)
}

alert('Test')
navigator.geolocation.getCurrentPosition(geo_success)