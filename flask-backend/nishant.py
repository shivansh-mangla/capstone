import json
from typing import List, Dict, Any

def get_occupancy_map(
    data: Dict[str, Any], subgroup: str, total_slots: int = 140
) -> List[int]:
    """
    Build a binary occupancy map for a subgroup's timetable:
      - 1 indicates the slot is occupied by lecture, lab, tutorial, or elective.
      - 0 indicates the slot is free.
    """
    occupancy = [0] * total_slots

    def mark_intervals(intervals: List[List[int]]):
        for start, end in intervals:
            if 0 <= start <= end < total_slots:
                for i in range(start, end + 1):
                    occupancy[i] = 1

    grp = data.get(subgroup)
    if not grp:
        raise ValueError(f"Subgroup '{subgroup}' not found in timetable data")

    # Mark all top‑level lecture, lab, tutorial slots
    for category in ("lecture", "lab", "tutorial"):
        for details in grp.get(category, {}).values():
            mark_intervals(details.get("slots", []))

    # Mark electives (also having lecture/lab/tutorial)
    for elective in grp.get("elective", {}).values():
        for category in ("lecture", "lab", "tutorial"):
            part = elective.get(category)
            if part:
                mark_intervals(part.get("slots", []))

    return occupancy


def find_course_clashes(
    timetable: Dict[str, Any],
    current_subgroup: str,
    subject_map: Dict[str, List[str]]
) -> Dict[str, Dict[int, List[str]]]:
    """
    For each subject in subject_map, determine which teaching subgroups
    have zero total clashes (over lecture, lab, tutorial) or exactly one clash.
    Returns a dict:
      { subject: { 0: [subgroups], 1: [subgroups] } }
    """
    occupied = get_occupancy_map(timetable, current_subgroup)
    report: Dict[str, Dict[int, List[str]]] = {}

    for subj, teaching_subs in subject_map.items():
        zero_clash, one_clash = set(), set()

        # dedupe input subgroups
        for sg in set(teaching_subs):
            grp = timetable.get(sg, {})
            all_slots: List[int] = []

            # Aggregate all slots for lecture, lab, tutorial
            for category in ("lecture", "lab", "tutorial"):
                part = grp.get(category, {}).get(subj)
                if part:
                    for start, end in part.get("slots", []):
                        all_slots.extend(range(start, end + 1))

            # Count occupied collisions
            collisions = sum(1 for slot in all_slots if occupied[slot] == 1)

            if collisions == 0:
                zero_clash.add(sg)
            elif collisions == 1:
                one_clash.add(sg)

        report[subj] = {
            0: sorted(zero_clash),
            1: sorted(one_clash)
        }

    return report


if __name__ == "__main__":
    # Load data files
    with open("data1.json", "r") as f:
        timetable = json.load(f)
    with open("data2.json", "r") as f:
        full_subject_map = json.load(f)

    # Define current subgroup and desired courses
    current_subgroup = "3C4A"
    target_subjects = ["UHU003", "UES101", "UES102"]

    # Filter mapping for only the target subjects
    subject_map = {
        subj: full_subject_map.get(subj, [])
        for subj in target_subjects
    }

    # Compute and display the clash report
    report = find_course_clashes(timetable, current_subgroup, subject_map)
    for subj, buckets in report.items():
        print(f"Subject {subj}:")
        print(f"  0 clashes: {buckets[0]}")
        print(f"  1 clash:  {buckets[1]}\n")