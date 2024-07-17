import os
from flask import Flask, render_template, redirect, request, session # type: ignore
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

db = sqlite3.connect("socialdata.db")

@app.route("/")
@login_required
def index():
    return render_template("path-notes.html")



@app.route("/login", methods=["GET", "POST"])
def login():
    """Log the user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (by submitting a form via POST, trying to log in)
    if request.method == "POST":
        
        # Ensure the email was submitted
        if not request.form.get("email"):
            return apology("Email needed ", 403)
        
        # Ensure the password was submitted
        elif not request.form.get("psw"):
            return apology("Password needed", 403)
        
        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE email = ?", request.form.get("email"))

        # Ensure that the username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("psw")):
            return apology("Invalid email or password", 403)
        
        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        return redirect("/")


    # If the user clicked in a link (GET)
    return render_template("login.html")