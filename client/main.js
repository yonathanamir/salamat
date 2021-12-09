function geo_success(position){
    str = position.coords.longitude + ', ' + position.coords.latitude
    alert(str)
}

navigator.geolocation.getCurrentPosition(geo_success)