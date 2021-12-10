_m_players = [
    {
        name: 'yonathan',
        rank: 6,
        img: './assets/hero.gif',
        punch: './assets/hero-punch.gif',
    },
    {
        name: 'moti',
        rank: 12,
        img: './assets/hero.gif',
        punch: './assets/hero-punch.gif',
    },
    {
        name: 'noam',
        rank: 18,
        img: './assets/hero.gif',
        punch: './assets/hero-punch.gif',
    },
]

_m_enemies = [
    {
        name: 'mino',
        rank: 25,
        img: './assets/mino.gif',
        hit: './assets/mino.gif',
    },
    {
        name: 'b_troll',
        rank: 10,
        img: './assets/troll_red.gif',
        hit: './assets/troll_red_hit.gif',
    },
    {
        name: 'r_troll',
        rank: 5,
        img: './assets/troll_blue.gif',
        hit: './assets/troll_blue_hit.gif',
    }
]

function battle(){
    function damage_enemy(){
        id = parseInt(this.id[this.id.length-1])-1
        enemy = _m_enemies[id]
        entity = $('#e-'+enemy.name)[0]
        entity.components.material.attrValue.src = 'url('+enemy.hit+')'
        entity.flushToDOM()

        player_punches()

        setTimeout(heal_enemy, 5000, id)
    }

    function player_punches(){
        for (i in _m_players){
            player = _m_players[i]
            entity = $('#e-'+player.name)[0]
            entity.components.material.attrValue.src = 'url('+player.punch+')'
            entity.flushToDOM()

            setTimeout(player_stand, 5000, i)
        }
    }

    function player_stand(id){
        player = _m_players[id]
        entity = $('#e-'+player.name)[0]
        entity.components.material.attrValue.src = 'url('+player.img+')'
        entity.flushToDOM()
    }

    function heal_enemy(id){
        enemy = _m_enemies[id]
        entity = $('#e-'+enemy.name)[0]
        entity.components.material.attrValue.src = 'url('+enemy.img+')'
        entity.flushToDOM()
    }

    function generate_png_view(ent, pos, scale){
        name_str = '"e-'+ent.name+'"'
        position_str = '"'+pos.join(' ')+'"'
        scale_str = '"'+scale.join(' ')+'"'
        material_str = '"src:url('+ent.img+')"'
    
        return '<a-plane id='+name_str+' position='+position_str+' scale='+scale_str+' material='+material_str+'></a-plane>'
    }

    function generate_gif_view(ent, pos, scale){
        name_str = '"e-'+ent.name+'"'
        position_str = '"'+pos.join(' ')+'"'
        scale_str = '"'+scale.join(' ')+'"'
        material_str = '"shader:gif;side:double;src:url('+ent.img+')"'
    
        return '<a-plane id='+name_str+' position='+position_str+' scale='+scale_str+' material='+material_str+'></a-plane>'
    }
    
    function draw_players(players){
        html = ''
        positions = [[1, 0, 0], [2, 1, 0], [2, -1, 0]]
        // scales = [[-1, 1, 1], [-1, 1, 1], [-1, 1, 1]]

        // positions = [[1, 0, 1], [1, 0, -1],[1, 0, 0], [2, 1, 1], [2, 1, 0], [2, -1, -1]]
    
        for (let i=0; i<players.length; i++){
            html += generate_gif_view(players[i], positions[i], [-1, 1, 1])
        }
    
        $('a-scene#players')[0].innerHTML = html
    }
    
    function draw_enemies(enemies){
        html = ''
        positions = [[-2, 1, 0], [-5, 1, 0], [-4.5, -0.5, 0]]
        scales = [[3, 3, 3], [-2, 2, 2], [-1, 1, 1]]
    
        for (let i=0; i<enemies.length; i++){
            html += generate_gif_view(enemies[i], positions[i], scales[i],)
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

// Preload
function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}

for (i in _m_players){
    preloadImage(_m_players[i].img)
    preloadImage(_m_enemies[i].punch)
}

for (i in _m_enemies){
    preloadImage(_m_enemies[i].img)
    preloadImage(_m_enemies[i].hit)
}

$(window).on('load', battle);