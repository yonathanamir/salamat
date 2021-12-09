function main(){
    function create_session(username){
        session_obj = {
            username: username,
            session_id: 'placeholder'
        }
        
        localStorage.setItem('session', JSON.stringify(session_obj))
        window.location.replace('./index.html');
    }
        
    function btn_click(){
        username = $('#txt_user').val();
        create_session(username);
    }

    $('#btn_login').click(btn_click)
}    

$(window).on('load', main);