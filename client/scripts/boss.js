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
        img: './assets/girl.gif',
        punch: './assets/girl-punch.gif',
    },
    {
        name: 'noam',
        rank: 18,
        img: './assets/super.gif',
        punch: './assets/super-punch.gif',
    },
]

_m_enemies = [
    {
        name: 'mino',
        rank: 25,
        img: './assets/mino.gif',
        hit: './assets/mino.gif',
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

        positions = [[0.968, 1.12, 1.023],
        [0.967, 0.718, 2.185],
        [0.817, 1.072, 2.988],
        [1.102, 0.969, 4.079],
        [0.821, 1.819, 0.715],
        [1.291, 2.018, 2.191],
        [0.716, 2.198, 3.082],
        [0.771, 1.945, 3.74],
        [1.106, 2.738, 1.111],
        [0.798, 2.818, 2.29],
        [1.08, 3.176, 2.979],
        [1.144, 2.712, 3.837],
        [0.703, 3.965, 1.298],
        [1.151, 3.711, 2.009],
        [1.287, 4.245, 3.26],
        [0.716, 4.056, 4.242],
        [1.224, 5.199, 1.044],
        [0.702, 5.184, 2.094],
        [1.016, 5.119, 2.925],
        [1.13, 4.882, 3.902],
        [2.112, 1.128, 0.828],
        [1.945, 0.9, 1.757],
        [1.754, 1.176, 2.894],
        [1.84, 1.114, 3.848],
        [1.975, 1.763, 0.817],
        [2.256, 2.04, 1.948],
        [1.79, 1.759, 2.853],
        [1.872, 1.852, 3.924],
        [1.896, 3.122, 0.934],
        [1.877, 3.183, 1.707],
        [1.722, 2.789, 3.034],
        [2.03, 2.93, 3.819],
        [2.199, 3.802, 1.143],
        [1.971, 3.968, 1.979],
        [1.874, 3.88, 3.046],
        [1.816, 4.072, 3.98],
        [2.21, 5.271, 1.245],
        [1.707, 5.289, 1.789],
        [1.937, 4.74, 2.86],
        [1.746, 5.043, 3.985],
        [3.025, 1.3, 1.113],
        [2.979, 0.84, 1.754],
        [3.075, 0.781, 3.299],
        [2.791, 0.914, 4.015],
        [3.136, 2.105, 0.984],
        [2.9, 1.828, 2.12],
        [3.201, 1.779, 3.162],
        [3.009, 1.995, 4.134],
        [3.3, 3.026, 1.201],
        [3.249, 2.744, 2.175],
        [2.929, 2.743, 2.946],
        [2.858, 3.196, 3.753],
        [3.145, 3.728, 1.14],
        [3.113, 3.768, 2.062],
        [3.13, 4.243, 3.3],
        [3.069, 4.18, 4.294],
        [2.753, 5.293, 0.884],
        [3.043, 4.974, 1.783],
        [3.153, 4.826, 3.193],
        [3.005, 5.164, 3.793],
        [4.3, 0.783, 1.003],
        [4.234, 1.101, 2.097],
        [3.991, 1.101, 3.036],
        [3.905, 0.827, 3.792],
        [4.276, 2.028, 1.251],
        [3.75, 2.252, 1.995],
        [4.154, 1.842, 3.064],
        [3.941, 1.746, 4.119],
        [3.896, 3.151, 1.252],
        [4.191, 2.704, 2.183],
        [4.139, 2.985, 3.005],
        [3.746, 2.761, 3.825],
        [3.984, 4.113, 0.861],
        [4.118, 3.977, 1.789],
        [4.211, 3.858, 3.226],
        [3.718, 3.794, 4.206],
        [4.295, 4.783, 1.185],
        [4.014, 4.736, 2.063],
        [4.135, 4.909, 3.114],
        [4.065, 5.169, 4.142],
        [4.946, 0.842, 1.282],
        [5.008, 0.903, 1.972],
        [5.119, 1.043, 2.782],
        [5.19, 0.816, 3.991],
        [5.129, 1.701, 1.147],
        [5.185, 1.799, 2.269],
        [4.788, 2.268, 2.851],
        [4.989, 2.027, 4.219],
        [5.09, 2.754, 0.767],
        [4.904, 3.083, 2.165],
        [5.179, 2.948, 3.19],
        [4.792, 3.148, 3.819],
        [4.794, 4.264, 1.253],
        [5.159, 3.82, 1.716],
        [4.806, 4.178, 3.103],
        [4.724, 3.77, 3.794],
        [4.888, 4.812, 1.26],
        [4.979, 5.151, 2.259],
        [5.076, 5.016, 3.18],
        [4.955, 4.735, 3.731]]
    
        for (let i=0; i<100; i++){
            html += generate_gif_view(players[i%3], positions[i], [-1, 1, 1])
        }

        $('a-scene#players')[0].innerHTML = html
    }
    
    function draw_enemies(enemies){
        html = ''

        html += generate_gif_view(enemies[0], [-7, 1, 0], [10, 10, 10])
    
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
    preloadImage(_m_players[i].punch)
}

for (i in _m_enemies){
    preloadImage(_m_enemies[i].img)
    preloadImage(_m_enemies[i].hit)
}

$(window).on('load', battle);