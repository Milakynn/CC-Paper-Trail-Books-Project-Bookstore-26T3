import mysql.connector
from flask_cors import CORS
from flask import Flask, jsonify, request
from flask import make_response

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}}
)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="bookstore_user",
        password="Bookstore123!",
        database="paper_trail_books"
    )

@app.route("/")
def home():
    return jsonify({
        "message": "Paper Trail Books API Running"
    })

@app.route("/books")
def get_books():

    connection = get_db_connection()

    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM books")

    books = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(books)

@app.route("/register", methods=["POST", "OPTIONS"])
def register():

    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response

    data = request.get_json()

    full_name = data["full_name"]
    email = data["email"]
    password = data["password"]

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO users(full_name, email, password)
    VALUES(%s, %s, %s)
    """

    cursor.execute(
        sql,
        (full_name, email, password)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "User registered successfully"
    })

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT * FROM users
    WHERE email = %s AND password = %s
    """

    cursor.execute(sql, (email, password))

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user
        })

    return jsonify({
        "success": False,
        "message": "Invalid email or password"
    }), 401

if __name__ == "__main__":
    app.run(debug=True)