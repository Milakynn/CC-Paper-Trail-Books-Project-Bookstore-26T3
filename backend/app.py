import mysql.connector
from flask_cors import CORS
from flask import Flask, jsonify, request

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

@app.route("/register", methods=["POST"])
def register():

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

if __name__ == "__main__":
    app.run(debug=True)