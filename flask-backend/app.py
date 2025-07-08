from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json

with open("data1.json") as f:
    timetable = json.load(f)
with open("data2.json") as f:
    subject_map = json.load(f)

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def get_students():
    data = request.json
    selectedCourseData = data['selectedCourseData']
    studentData = data['studentData']

    subgroup = studentData['subgroup']
    elective_basket = studentData['elective_basket']
    general_elective = studentData['general_elective']

    subjectCodes = []
    for i in selectedCourseData:
        subjectCodes.append(i['subjectCode'])
    print(subjectCodes)
    
    return jsonify({"key": "prthbhb"})


if __name__ == "__main__":
  app.run(debug=True, port=3001)