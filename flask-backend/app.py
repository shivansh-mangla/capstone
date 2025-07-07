from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_students():
    return "Helo"


if __name__ == "__main__":
  print("helloooo to flask")
  app.run(debug=True, port=6000)