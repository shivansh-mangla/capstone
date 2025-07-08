import json
from typing import List, Dict, Any
import itertools

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

    # helper function h flatten krne ke liye

    def lecture_slots_for(sg: str, subj: str) -> List[int]:
        # for lect only->


        # grp = timetable.get(sg, {})
        # lec = grp.get("lecture", {}).get(subj)
        # if not lec:
        #     return []
        # slots = []
        # for start, end in lec.get("slots", []):
        #     slots.extend(range(start, end + 1))
        # return slots
        # Collect both lecture and lab slot indices for sg, subj

        # for lect+lab->

        grp = timetable.get(sg, {})
        slots: List[int] = []
        for cat in ("lecture", "lab"):
            part = grp.get(cat, {}).get(subj)
            if not part:
                continue
            for start, end in part.get("slots", []):
                slots.extend(range(start, end + 1))
        return slots


    for subj in subject_order:
        chosen_sg = None
        for sg in subject_map.get(subj, []):
            slots = lecture_slots_for(sg, subj)
            # check if no clash
            if all(occupancy[s] == 0 for s in slots):
                chosen_sg = sg
                break

        # record either a single-item list or empty list
        assignments[subj] = [chosen_sg] if chosen_sg else []

        # mark that subgroup's slots occupied (if found)
        if chosen_sg:
            for s in lecture_slots_for(chosen_sg, subj):
                occupancy[s] = 1

    return assignments


if __name__ == "__main__":
    with open("data1.json") as f:
        timetable = json.load(f)
    with open("data2.json") as f:
        subject_map = json.load(f)

    current = "3C4A"
    targets = ["UCB009","UTA016"]

    # for perm in itertools.permutations(targets):
    #     print(f"Trying subject order: {perm}")
    #     assignments = assign_subjects_sequentially(timetable, current, list(perm), subject_map)
    #     for subj, sgs in assignments.items():
    #         print(f"  {subj} → {sgs}")
    #     print("\n" + "-" * 40 + "\n")


    # assignments = assign_subjects_sequentially(timetable, current, targets, subject_map)

    # for subj, sgs in assignments.items():
    #     print(f"Subject {subj} can be taken with subgroups: {sgs}")


    # Prepare buckets for permutations by number of non-empty assignment lists
    best: List[tuple] = []   # 3 non-empty
    second: List[tuple] = [] # 2 non-empty
    third: List[tuple] = []  # 1 non-empty

    # Iterate through every possible ordering of targets
    for perm in itertools.permutations(targets):
        assignments = assign_subjects_sequentially(timetable, current, list(perm), subject_map)
        non_empty_count = sum(1 for sgs in assignments.values() if sgs)
        entry = (perm, assignments)
        if non_empty_count == 3:
            best.append(entry)
        elif non_empty_count == 2:
            second.append(entry)
        elif non_empty_count == 1:
            third.append(entry)

    # Print results in priority order
    def print_bucket(bucket_name: str, bucket: List[tuple]):
        print(f"\n{bucket_name} (count={len(bucket)}):")
        for perm, assignments in bucket:
            print(f"\nOrder: {perm}")
            for subj, sgs in assignments.items():
                print(f"  {subj} → {sgs}")

    print_bucket("Priority 1: All 3 non-empty", best)
    print_bucket("Priority 2: 2 non-empty", second)
    print_bucket("Priority 3: 1 non-empty", third)