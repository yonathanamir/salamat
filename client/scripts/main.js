_api_base = 'https://cors-everywhere.herokuapp.com/http://34.215.64.38:5000'

_dag = {
}

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
        dataobj = {
            'lon': position.coords.longitude,
            'lat': position.coords.latitude,
        }

        $.ajax({
            type: "POST",
            url: _api_base + '/update/location/' + session.username,
            data: JSON.stringify(dataobj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {'X-Requested-With': 'salamat'},
        });

        $.ajax({
            type: "GET",
            url: _api_base + '/get/rooms/' + session.username,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                session.rooms = data
                
                if ('rooms_updated' in _dag){
                    _dag.rooms_updated()
                }
            },
            headers: {'X-Requested-With': 'salamat'},
        });
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