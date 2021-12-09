function main(){
    function get_session(){
        if ('session' in localStorage){
            return JSON.parse(localStorage['session']);
        }

        return false;
    }

    function logout(){
        localStorage.removeItem('session')
        window.location.replace('./login.html')
    }

    const watchID = navigator.geolocation.watchPosition((position) => {
        // $('.coord .coord-lat')[0].innerHTML = position.coords.latitude;
        // $('.coord .coord-lon')[0].innerHTML = position.coords.longitude;
    });

    session = get_session()
    if (!session){
        window.location.replace('./login.html')
    }

    $('.username')[0].innerHTML = session.username;
    $('#btn_logout').click(logout);
    $('.content').show();
    $('.loading').hide();
}

$(window).on('load', main);