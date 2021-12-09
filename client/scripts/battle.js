function battle(){
    function damage_enemy(){
        // alert('Attack!')
        ent = $('#enemy')
        ent.prop('opacity', 0.5)
        ent[0].emit('damage')
    }

    $('.attack-btn').click(damage_enemy)
}

$(window).on('load', battle);