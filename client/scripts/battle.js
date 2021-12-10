_m_players = [
    {
        name: 'yonathan',
        rank: 6,
        img: './assets/hero.png'
    },
    {
        name: 'moti',
        rank: 12,
        img: './assets/hero.png'
    },
    {
        name: 'noam',
        rank: 18,
        img: './assets/hero.png'
    },
]

_m_enemies = [
    {
        name: 'Mino the Inspector',
        rank: 25,
        img: './assets/mino.png'
    },
    {
        name: 'Big Blue Troll',
        rank: 10,
        img: './assets/troll_red.gif'
    },
    {
        name: 'Small Red Troll',
        rank: 5,
        img: './assets/troll_red.gif'
    }
]

function battle(){
    function damage_enemy(){
        entity = $('#enemy')[0]
        entity.components.material.attrValue.src = 'url(./assets/mino.gif)'
        entity.components.material.attrValue.shader = 'gif'
        entity.components.material.attrValue.side = 'double'
        entity.flushToDOM()
    }

    function generate_png_view(ent, pos, scale){
        name_str = '"p-'+ent.name+'"'
        position_str = '"'+pos.join(' ')+'"'
        scale_str = '"'+scale.join(' ')+'"'
        material_str = '"src:url('+ent.img+')"'
    
        return '<a-plane id='+name_str+' position='+position_str+' scale='+scale_str+' material='+material_str+'></a-plane>'
    }
    
    function draw_players(players){
        html = ''
        positions = [[1, 0, 0], [2, 1, 0], [2, -1, 0]]
        scales = [[-1, 1, 1], [-1, 1, 1], [-1, 1, 1]]
    
        for (let i=0; i<players.length; i++){
            html += generate_png_view(players[i], positions[i], scales[i],)
        }
    
        $('a-scene#players')[0].innerHTML = html
    }
    
    function draw_enemies(enemies){
        html = ''
        positions = [[-2, 1, 0], [-4, 2, 0], [-3, -1, 0]]
        scales = [[3, 3, 3], [-1, 1, 1], [-1, 1, 1]]
    
        for (let i=0; i<enemies.length; i++){
            html += generate_png_view(enemies[i], positions[i], scales[i],)
        }
    
        $('a-scene#enemies')[0].innerHTML = html
    }
    
    draw_players(_m_players)
    draw_enemies(_m_enemies)

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