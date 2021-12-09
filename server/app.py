import sqlite3
from flask import Flask
import json

app = Flask(__name__)
con = sqlite3.connect('game.db', check_same_thread=False)
cur = con.cursor()

SUCCESS_STATUS = {'status': "ok"}


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/create/player/<name>')
def create_player(name):  # put application's code here
    cur.execute(f'''INSERT INTO users VALUES ('{name}', 1)''')
    con.commit()
    return SUCCESS_STATUS


@app.route('/get/player/<name>')
def get_player(name):
    data = query_db(f"SELECT name, rank FROM users WHERE name='{name}'", one=True)
    return json.dumps(data)


@app.route('/create/party')
def new_sn():  # put application's code here
    return 'Hello World!'


def query_db(query, args=(), one=False):
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
              for i, value in enumerate(row)) for row in cur.fetchall()]
    return (r[0] if r else None) if one else r


if __name__ == '__main__':
    app.run(host='0.0.0.0')
