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

@app.route("/add-book", methods=["POST"])
def add_book():

    data = request.get_json()

    title = data["title"]
    author = data["author"]
    category = data["category"]
    price = data["price"]

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO books
    (title, author, category, price, stock_quantity)
    VALUES (%s, %s, %s, %s, %s)
    """

    cursor.execute(
        sql,
        (title, author, category, price, 10)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Book added successfully"
    })

@app.route("/delete-book/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    DELETE FROM books
    WHERE book_id = %s
    """

    cursor.execute(sql, (book_id,))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Book deleted successfully"
    })

@app.route("/update-book/<int:book_id>", methods=["PUT"])
def update_book(book_id):

    data = request.get_json()

    title = data["title"]
    author = data["author"]
    category = data["category"]
    price = data["price"]

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    UPDATE books
    SET
        title = %s,
        author = %s,
        category = %s,
        price = %s
    WHERE book_id = %s
    """

    cursor.execute(
        sql,
        (
            title,
            author,
            category,
            price,
            book_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Book updated successfully"
    })

@app.route("/add-to-cart", methods=["POST", "OPTIONS"])
def add_to_cart():

    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response

    data = request.get_json()

    user_id = data["user_id"]
    book_id = data["book_id"]

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO cart (user_id, book_id, quantity)
    VALUES (%s, %s, %s)
    """

    cursor.execute(
        sql,
        (user_id, book_id, 1)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Book added to cart"
    })

@app.route("/cart/<int:user_id>")
def get_cart(user_id):

    connection = get_db_connection()

    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT
        cart.cart_id,
        books.title,
        books.price,
        cart.quantity
    FROM cart
    JOIN books
    ON cart.book_id = books.book_id
    WHERE cart.user_id = %s
    """

    cursor.execute(sql, (user_id,))

    items = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(items)

@app.route("/checkout", methods=["POST"])
def checkout():

    data = request.get_json()

    user_id = data["user_id"]

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT books.price, cart.quantity
        FROM cart
        JOIN books
        ON cart.book_id = books.book_id
        WHERE cart.user_id = %s
        """,
        (user_id,)
    )

    cart_items = cursor.fetchall()

    total_amount = 0

    for item in cart_items:
        total_amount += float(item["price"]) * item["quantity"]

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO orders
        (user_id, total_amount)
        VALUES (%s, %s)
        """,
        (user_id, total_amount)
    )

    order_id = cursor.lastrowid

    cursor.execute(
        """
        DELETE FROM cart
        WHERE user_id = %s
        """,
        (user_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Order placed successfully",
        "order_id": order_id
    })

if __name__ == "__main__":
    app.run(debug=True)