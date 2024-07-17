import os
from flask import Flask, render_template, redirect, request, session, g
from flask_session import Session # type: ignore
from werkzeug.security import check_password_hash, generate_password_hash # type: ignore
import sqlite3
from parameters import apology, login_required
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = "/tmp/flask_session"
Session(app)

DATABASE = "socialdata.db"

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            DATABASE,
            detect_types=sqlite3.PARSE_DECLTYPES,
            check_same_thread=False
        )
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

# Homepage
@app.route("/")
@login_required
def index():
    return render_template("homepage.html")

# Login
@app.route("/login", methods=["GET", "POST"])
def login():
    """Log the user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (by submitting a form via POST, trying to log in)
    if request.method == "POST":
        
        email = request.form.get("email")
        password = request.form.get("psw")

        # Ensure the email was submitted
        if not email:
            return apology("Email needed ", 403)
        
        # Ensure the password was submitted
        elif not password:
            return apology("Password needed", 403)
        
        # Query database for username
        db = get_db()
        cursor = db.execute("SELECT * FROM users WHERE email = ?", (email,))
        rows = cursor.fetchall()

        # Ensure that the username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], password):
            return apology("Invalid email or password", 403)
        
        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        return redirect(("/"))

    # If the user clicked on a link (GET)
    return render_template("login.html")

# Register
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":

        password = request.form.get("psw")
        username = request.form.get("username")
        email = request.form.get("email")

        # Ensure the username was submitted
        if not username:
            return apology("Username needed", 403)

        # Ensure the email was submitted
        elif not email:
            return apology("Email needed", 403)
        
        # Ensure the password was submitted
        elif not password:
            return apology("Password needed", 403)
        
        # Ensure if the password check is correct
        if request.form.get("psw-check") != password:
            return apology("The password check doesn't match", 403)
        
        # Check if the username already exists
        db = get_db()
        cursor = db.execute("SELECT * FROM users WHERE username = ?", (username,))
        rows = cursor.fetchall()
        if len(rows) > 0:
            return apology("This username already exist",403)
        
        # Hash the password
        hashed_password = generate_password_hash(password)

        # Insert the user into the database
        db.execute("insert into users (username,email, hash) values(?,?,?)", (username,email,hashed_password))
        db.commit()

        # Redirect the user to the login page
        return redirect("/login")
    
        # If the user clicked on a link (GET)
    return render_template("register.html")

# Logout
@app.route("/logout")
def logout():
    
    # Forget any user_id
    session.clear()

    # Redirect the user to login form
    return redirect("/")