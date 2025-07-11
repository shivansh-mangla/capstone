import json
from typing import List, Dict, Any, Set, Tuple


def get_occupancy_map(
    data: Dict[str, Any],
    subgroup: str,
    total_slots: int = 140,
    electives: List[str] = None
) -> List[int]:
    """
    Returns a binary list marking occupied slots (lecture, lab, tutorial, and
    only the specified electives).
    """
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

    return occupancy


def lecture_slots_for(
    sg: str,
    subj: str,
    timetable: Dict[str, Any]
) -> List[int]:
    """
    Flattens slots for a given subject in a subgroup.
    """
    grp = timetable.get(sg, {})
    slots: List[int] = []
    for cat in ("lecture", "lab"):
        part = grp.get(cat, {}).get(subj)
        if not part:
            continue
        for start, end in part.get("slots", []):
            slots.extend(range(start, end + 1))
    return slots


def run_backtracking(
    timetable: Dict[str, Any],
    subject_map: Dict[str, List[str]],
    current: str,
    electives: List[str],
    subjects: List[str],
    total_slots: int = 140
) -> Dict[int, List[Tuple[List[Tuple[str, Any]], int]]]:
    """
    Performs backtracking over the list of subjects, trying all subgroup assignments
    (or skipping a subject) and classifies the results by how many got scheduled.

    Returns a dict mapping k -> list of (assignments, count) where k is 1,2,3.
    """
    # initial occupancy as a set for easy bitwise
    base_occ = {i for i,v in enumerate(get_occupancy_map(timetable, current, total_slots, electives)) if v}
    buckets: Dict[int, List[Tuple[List[Tuple[str, Any]], int]]] = {1: [], 2: [], 3: []}
    n = len(subjects)

    def backtrack(
        idx: int,
        occ: Set[int],
        assignment: List[Tuple[str, Any]]
    ):
        if idx == n:
            # count non-empty picks
            picked = [(subj, sg) for subj, sg in assignment if sg]
            k = len(picked)
            if 1 <= k <= 3:
                buckets[k].append((assignment.copy(), k))
            return

        subj = subjects[idx]
        # try assigning each subgroup
        for sg in subject_map.get(subj, []):
            slots = set(lecture_slots_for(sg, subj, timetable))
            # if fits
            if slots.isdisjoint(occ):
                # mark and recurse
                backtrack(idx + 1, occ.union(slots), assignment + [(subj, sg)])
        # also try skipping this subject
        backtrack(idx + 1, occ, assignment + [(subj, None)])

    backtrack(0, base_occ, [])
    return buckets


if __name__ == "__main__":
    # load data
    with open("data1.json") as f:
        timetable = json.load(f)
    with open("data2.json") as f:
        subject_map = json.load(f)

    # example definitions for subjects A, B, C
    # these are your targets
    subjects = ["UHU003", "UES103", "UES102"]
    # current group and electives
    current = "3C4A"
    electives = ["ucs635", "ucs645"]

    buckets = run_backtracking(timetable, subject_map, current, electives, subjects)

    # pretty print
    for k in (3, 2, 1):
        print(f"Priority {4-k}: {k} non-empty assignments (count={len(buckets[k])})")
        for assign, count in buckets[k]:
            print(assign)