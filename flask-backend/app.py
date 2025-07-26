from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
import logic

with open("data1.json") as f:
    timetable = json.load(f)
with open("data2.json") as f:
    subject_map = json.load(f)
with open("elective.json") as f:
    electives = json.load(f)

app = Flask(__name__)
CORS(app)
sf = logic.SlotFinder(timetable, subject_map, electives)


@app.route("/", methods=["POST"])
def get_students():

    data = request.json
    selectedCourseData = data['selectedCourseData']
    studentData = data['studentData']

    # print(selectedCourseData)

    subgroup = studentData['subgroup']
    elective_basket = studentData['elective_basket']
    general_elective = studentData['general_elective']

    subjectCodes = ["", "", ""]
    for i in range(len(selectedCourseData)):
        subjectCodes[i] = selectedCourseData[i]['subjectCode']
    # print(subjectCodes)

    newTT, choices = sf.mainF(subgroup, elective_basket, subjectCodes[0], subjectCodes[1], subjectCodes[2])
    
    print(newTT[0])

    return jsonify({"newTimeTable": newTT, "choices": choices})


if __name__ == "__main__":
  app.run(debug=True, port=3001)