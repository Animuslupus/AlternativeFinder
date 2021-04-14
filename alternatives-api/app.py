from flask import Flask, jsonify, render_template, request
import sqlite3
from flask import g
from flask_cors import CORS, cross_origin

DB_NAME = './product_data.db'

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_NAME)
    db.row_factory = make_dicts
    return db


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def exec_db(query, args=()):
    con = get_db()
    cur = con.execute(query)
    con.commit()
    cur.close()
    return


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@cross_origin(headers=['Content-Type',]) # Send Access-Control-Allow-Headers 
@app.route('/products')
def get_products():
    data = query_db('select * from products')
    alternatives = query_db(
        'SELECT * FROM Products JOIN Alternatives on (Products.id = Alternatives.alternativeId);')
    
    alternatives_lookup = {}
    for a in alternatives:
        if a['productId'] in alternatives_lookup:
            alternatives_lookup[a['productId']].append(a)
        else:
            alternatives_lookup[a['productId']] = [a]
    
    for product in data:
        if product['id'] in alternatives_lookup:
            product['alternatives'] = alternatives_lookup[product['id']]
        else:
            product['alternatives'] = []

    return jsonify(data)


@cross_origin(headers=['Content-Type',]) # Send Access-Control-Allow-Headers 
@app.route('/alternative', methods=['POST'])
def add_alternative():
    data = request.get_json()
    q = f"INSERT INTO alternatives VALUES ({data['productId']}, {data['alternativeId']}, \"{data['descriptionGerman']}\", \"{data['descriptionEnglish']}\", {data['ranking']})"
    duplicate_entries = query_db(
        f"SELECT * FROM alternatives WHERE productId={data['productId']} AND alternativeId={data['alternativeId']}")
    if len(duplicate_entries) > 0:
        return jsonify({'success': False, 'message': 'Entry already exists'}), 400, {'ContentType': 'application/json'}
    try:
        exec_db(q)
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Internal Server Error 😱😱😱 - Send a message to Elias'}), 500, {'ContentType': 'application/json'}
    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@app.route('/')
def website():
    return render_template("index.html")
