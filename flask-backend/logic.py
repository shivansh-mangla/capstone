import json
from typing import Dict, List, Any

class SlotFinder:

  def __init__(self, data1, data2, electiveData):
    self.data1 = data1
    self.data2 = data2
    self.electiveData = electiveData

  def get_occupancy_list(self, data : Dict[str, Any], subgroup: str, total_slots: int=140, electives: List[str] = None) -> List[int]:
    if electives is None:
      electives = []
    occupancy = [0] * total_slots

    def mark_intervals(intervals: List[List[int]]):
        for start, end in intervals:
            if not (0 <= start <= end < total_slots):
                raise ValueError(f"Invalid interval ({start},{end})")
            for i in range(start, end + 1):
                occupancy[i] = 1

    grp = data.get(subgroup)
    if not grp:
        raise ValueError(f"Subgroup '{subgroup}' not found in timetable")

    # mark lectures, labs, tutorials
    for cat in ("lecture", "lab", "tutorial"):
        for details in grp.get(cat, {}).values():
            mark_intervals(details.get("slots", []))

    # mark only the chosen electives
    for code, elective_data in grp.get("elective", {}).items():
        if code.lower() in (e.lower() for e in electives):
            for cat in ("lecture", "lab", "tutorial"):
                part = elective_data.get(cat)
                if part:
                    mark_intervals(part.get("slots", []))

    # for extracting the slot indixes which are free
    newlist = []
    for index, value in enumerate(occupancy):
      if value == 0:
        newlist.append(index)

    return newlist

  def subjectSlotInGroup(self, timetable : Dict[str, Any], group : str, subject : str):
    allSlots = []
    groupTimetable = timetable[group]

    def fullInterval(interval: List[int]):
      fullSlot = []
      for i in range(interval[0], interval[1] + 1):
        fullSlot.append(i)
      return fullSlot

    for cat in ("lecture", "lab", "tutorial"):
        if subject in groupTimetable.get(cat, {}):
            slots = groupTimetable[cat][subject].get("slots", [])
            for slot in slots:
                allSlots.extend(fullInterval(slot))

    groupTimetableElective = timetable[group]["elective"].get(subject, {})
    for cat in ("lecture", "lab", "tutorial"):
        if groupTimetableElective.get(cat):
            slots = groupTimetableElective[cat].get("slots", [])
            for slot in slots:
                allSlots.extend(fullInterval(slot))
    return allSlots
  
  def get_choices(self, timetable : Dict[str, Any], freeSlots: List[int], subject3: str="", subject2 : str ="", subject1 : str = "") -> List[Dict[str, str]]:
    choices = []

    data = self.data2

    groupsforsubject1 = []
    groupsforsubject2 = []
    groupsforsubject3 = []

    if subject1 and subject1 in data: groupsforsubject1 = list(set(data[subject1]))
    if subject2 and subject2 in data: groupsforsubject2 = list(set(data[subject2]))
    if subject3 and subject3 in data: groupsforsubject3 = list(set(data[subject3]))

    # print(groupsforsubject1)
    # print(groupsforsubject2)
    # print(groupsforsubject3)

    for group1 in (groupsforsubject1 or [None]):
      if subject1:
        if group1 is None: continue
        slots1 = self.subjectSlotInGroup(timetable, group1, subject1)
        if( not set(slots1).issubset(freeSlots)):
          continue
        freeSlotsAfter1 = list(set(freeSlots) - set(slots1))
      else:
        group1 = ""
        freeSlotsAfter1 = freeSlots

      for group2 in (groupsforsubject2 or [None]):
              if subject2:
                  if group2 is None: continue
                  slots2 = self.subjectSlotInGroup(timetable, group2, subject2)
                  if not set(slots2).issubset(freeSlotsAfter1):
                      continue
                  freeSlotsAfter2 = list(set(freeSlotsAfter1) - set(slots2))
              else:
                  group2 = ""
                  freeSlotsAfter2 = freeSlotsAfter1

              for group3 in (groupsforsubject3 or [None]):
                  if subject3:
                      if group3 is None: continue
                      slots3 = self.subjectSlotInGroup(timetable, group3, subject3)
                      if not set(slots3).issubset(freeSlotsAfter2):
                          continue
                  else:
                      group3 = ""

                  choice = {}
                  if subject1: choice[subject1] = group1
                  if subject2: choice[subject2] = group2
                  if subject3: choice[subject3] = group3
                  choices.append(choice)

                  if len(choices) == 5:
                      return choices

      return choices
    
  def subjectDetailsInGroup(self, timetable : Dict[str, Any], group : str, subject : str):  #gives complete details of a subject in a group
    groupTimeTable = timetable[group]
    result = {}

    if subject in groupTimeTable["elective"]:
      result = groupTimeTable["elective"][subject]
      result['group'] = group
      return result


    for cat in ("lecture", "lab", "tutorial"):
      if subject in groupTimeTable.get(cat, {}):
        result[cat] = groupTimeTable[cat][subject]
    result['group'] = group
    return result
  
  def slotsFullDetails(self, timetable : Dict[str, Any], choices : List[Dict[str, str]]):
    results = []
    for choice in choices:
      result = {}
      for subject, group in choice.items():
        result[subject] = self.subjectDetailsInGroup(timetable, group, subject)
      results.append(result)
    return results
  
  def resultFinder(self, batch, electiveBasket, sub1='', sub2='', sub3=''):
    timetable = self.data1

    tempElective = self.electiveData
    electives = tempElective.get("main-elective")
    electiveList = electives.get(electiveBasket, [])

    freeSlotList = self.get_occupancy_list(timetable, batch, 140, electiveList)

    # choices = get_choices(timetable, freeSlotList, "UCS635")
    choices = self.get_choices(timetable, freeSlotList, sub1, sub2, sub3)
    # choices = get_choices(timetable, freeSlotList,  "UCS415")
    # print(choices)
    # print("Printing choices: ----------------------")
    # for i in choices:
    #   print(i)

    result = self.slotsFullDetails(timetable, choices)
    # print("\n\n\nPrinting result: ----------------------")
    # for i in result:
    #   print(i)
    return result, choices

  def giveDayTime(self, x):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    hours = ['8:00 AM', '8:50 AM', '9:40 AM', '10:30 AM', '11:20 AM', '12:10 PM', '1:00 PM', '1:50 PM', '2:40 PM', '3:30 PM', '4:20 PM', '5:10 PM', '6:00 PM']
    day = days[x//27]
    
    x = x%28
    # 0 based indexing
    hour = hours[x//2]
    
    return day,hour

  def mainF(self, batch, electiveBasket, sub1='', sub2='', sub3=''):
    result, choices = self.resultFinder(batch, electiveBasket, sub1, sub2, sub3)

    options = [] # will contain data in compatibility with frontend
    for j in range(len(result)):
        temp = []
        for subCode in result[j].keys():
            d1 = result[j][subCode]
            lec = d1['lecture']
            lab = d1['lab']
            if 'tutorial' not in list(d1.keys()):
                d1['tutorial'] = {'slots': [], 'teacher_code': None, 'venue': []}
            tut = d1['tutorial']
                


            for i in range(len(lec['slots'])):
                slots = lec['slots']
                slot = slots[i]
                s1 = slot[0]
                s2 = slot[1]

                day, t1 = self.giveDayTime(s1)
                venue = ''
                if lec['venue'][i]:
                    venue = lec['venue'][i]
                d = {"day": day, "hour": t1, "subjectName": subCode, "subjectCode": subCode, "venue": venue, "color": 'red'}
                temp.append(d)

            for i in range(len(lab['slots'])):
                slots = lab['slots']
                slot = slots[i]
                s1 = slot[0]
                s2 = slot[1]

                day, t1 = self.giveDayTime(s1)
                venue = ''
                if lab['venue'][i]:
                    venue = lab['venue'][i]
                d = {"day": day, "hour": t1, "subjectName": subCode, "subjectCode": subCode, "venue": venue, "color": 'red'}
                temp.append(d)

                if s2-s1 > 1:
                  day, t1 = self.giveDayTime(s1+2)
                  venue = ''
                  if lab['venue'][i]:
                      venue = lab['venue'][i]
                  d = {"day": day, "hour": t1, "subjectName": subCode, "subjectCode": subCode, "venue": venue, "color": 'red'}
                  temp.append(d)

            for slot in tut['slots']:
                s1 = slot[0]
                s2 = slot[1]

                day, t1 = self.giveDayTime(s1)
                venue = ''
                if tut['venue'][0]:
                    venue = tut['venue'][0]
                d = {"day": day, "hour": t1, "subjectName": subCode, "subjectCode": subCode, "venue": venue, "color": 'red'}
                temp.append(d)
        options.append(temp)

        
    return options, choices