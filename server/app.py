import sqlite3
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/create/player')
def new_session():  # put application's code here
    return 'Hello World!'


@app.route('/create/party')
def new_sn():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
