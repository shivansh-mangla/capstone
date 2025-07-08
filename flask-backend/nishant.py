import json
from typing import List, Dict, Any

def get_occupancy_map(
    data: Dict[str, Any], subgroup: str, total_slots: int = 140
) -> List[int]:
    """
    Returns a binary list marking occupied slots (lecture, lab, tutorial, electives).
    """
    occupancy = [0] * total_slots
    def mark_intervals(intervals: List[List[int]]):
        for start, end in intervals:
            if 0 <= start <= end < total_slots:
                for i in range(start, end + 1):
                    occupancy[i] = 1
    grp = data.get(subgroup)
    if not grp:
        raise ValueError(f"Subgroup '{subgroup}' not found")
    # mark all categories
    for cat in ("lecture", "lab", "tutorial"):
        for details in grp.get(cat, {}).values():
            mark_intervals(details.get("slots", []))
    for elective in grp.get("elective", {}).values():
        for cat in ("lecture", "lab", "tutorial"):
            part = elective.get(cat)
            if part:
                mark_intervals(part.get("slots", []))
    return occupancy


def assign_subjects_sequentially(
    timetable: Dict[str, Any],
    current_subgroup: str,
    subject_order: List[str],
    subject_map: Dict[str, List[str]],
    total_slots: int = 140
) -> Dict[str, List[str]]:
    """
    Sequentially assigns subjects to subgroups without time clashes.
    For each subject in order, picks all subgroups whose lecture slots do not
    conflict with already occupied slots, marks them occupied, and returns the
    chosen subgroups per subject (uniquely).
    """
    occupancy = get_occupancy_map(timetable, current_subgroup, total_slots)
    assignments: Dict[str, List[str]] = {}

    def lecture_slots_for(sg: str, subj: str) -> List[int]:
        grp = timetable.get(sg, {})
        lec = grp.get("lecture", {}).get(subj)
        if not lec:
            return []
        slots = []
        for start, end in lec.get("slots", []):
            slots.extend(range(start, end + 1))
        return slots

    for subj in subject_order:
        available: List[str] = []
        for sg in subject_map.get(subj, []):
            slots = lecture_slots_for(sg, subj)
            # check if no clash
            if all(occupancy[s] == 0 for s in slots):
                available.append(sg)

        # remove duplicates while preserving order
        unique_available = list(dict.fromkeys(available))
        assignments[subj] = unique_available

        # mark those slots occupied
        for sg in unique_available:
            for s in lecture_slots_for(sg, subj):
                occupancy[s] = 1

    return assignments


if __name__ == "__main__":
    with open("data1.json") as f:
        timetable = json.load(f)
    with open("data2.json") as f:
        subject_map = json.load(f)

    current = "3C4A"
    targets = ["UHU003", "UMA023", "UES102"]
    assignments = assign_subjects_sequentially(timetable, current, targets, subject_map)

    for subj, sgs in assignments.items():
        print(f"Subject {subj} can be taken with subgroups: {sgs}")
