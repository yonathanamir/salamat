function battle(){
    function damage_enemy(){
        entity = $('#enemy')[0]
        entity.components.material.attrValue.src = 'url(./assets/mino.gif)'
        entity.components.material.attrValue.shader = 'gif'
        entity.components.material.attrValue.side = 'double'
        // material="shader:gif;src:url(./assets/mino-t.gif); side: double"
        entity.flushToDOM()
    }

    $('.attack-btn').click(damage_enemy)
    $('.ui .user .username')[0].innerHTML = session.username

    function update_rooms() {
        el = $('.ui .rooms')[0]
        el.innerHTML = '<ul>'
        for (i in session.rooms){
            el.innerHTML += '<li>'+session.rooms[i].room+'</li>'
        }
        el.innerHTML += '</ul>'
    }

    _dag.rooms_updated = update_rooms
}

$(window).on('load', battle);