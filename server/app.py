import sqlite3
from flask import Flask
from flask import request
import json
from random import choices
from string import ascii_lowercase

app = Flask(__name__)
con = sqlite3.connect('game.db', check_same_thread=False)
cur = con.cursor()

SUCCESS_STATUS = {'status': "ok"}


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/create/player/<name>')
def create_player(name):
    cur.execute(f'''INSERT INTO users VALUES ('{name}', 1, 'none', '(1, 1)', 0)''')
    con.commit()
    return SUCCESS_STATUS


@app.route('/get/player/<name>')
def get_player(name):
    data = query_db(f"SELECT name, rank, room, location, ismaster FROM users WHERE name='{name}'", one=True)
    return json.dumps(data)


@app.route('/get/player/')
def get_players():
    data = query_db(f"SELECT name, rank, room, location, ismaster FROM users")
    return json.dumps(data)


@app.route('/create/party/<name>')
def create_party(name):
    code = "".join(choices(ascii_lowercase, k=4)).upper()
    update_player(name, 'room', code)
    update_player(name, 'ismaster', "true")
    return {"room": code}


@app.route('/update/location/<name>', methods=['PUT', 'POST'])
def update_location(name):
    body = request.json
    coor = f"({body['lon']},{body['lat']})"
    update_player(name, 'location', coor)
    return SUCCESS_STATUS


@app.route('/get/rooms/<name>', methods=['GET'])
def get_rooms(name):
    rooms = query_db('''SELECT a.room, location, players from (SELECT room, location FROM users WHERE ismaster='true') as 'a'
JOIN (SELECT room, count(name) as players FROM users WHERE room!='null' GROUP BY room) as 'b'
ON a.room=b.room''')
    return json.dumps(rooms)


@app.route('/update/room/<name>', methods=['PUT', 'POST'])
def update_room(name):
    body = request.json
    room = body['room']
    update_player(name, 'room', room)
    return SUCCESS_STATUS


def update_player(name, col, value):
    execute_query(f"UPDATE users SET {col}='{value}' WHERE name='{name}'")


def execute_query(query, args=()):
    cur.execute(query, args)
    con.commit()


def query_db(query, args=(), one=False):
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
              for i, value in enumerate(row)) for row in cur.fetchall()]
    return (r[0] if r else None) if one else r


if __name__ == '__main__':
    app.run(host='0.0.0.0')
