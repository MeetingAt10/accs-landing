"use client";
import { Icon, Timetable, useNow, type TimetableDay, type TimetableEvent } from "@meetingat10/design-system/react";

const DAYS: TimetableDay[] = [
  { id: "mon", label: "Mon", fullLabel: "Monday" },
  { id: "tue", label: "Tue", fullLabel: "Tuesday" },
  { id: "wed", label: "Wed", fullLabel: "Wednesday", isToday: true },
  { id: "thu", label: "Thu", fullLabel: "Thursday" },
  { id: "fri", label: "Fri", fullLabel: "Friday" },
];

const EVENTS: TimetableEvent[] = [
  { id: "mon-ds", day: "mon", start: 9, end: 10.5, title: "Data Structures", meta: "CCS 201" },
  { id: "mon-study", day: "mon", start: 14, end: 15, title: "Study circle", meta: "Library 2F", lane: "community" },
  { id: "tue-open", day: "tue", start: 10, end: 11, title: "Advising", meta: "Open slot", lane: "consult", form: "open" },
  { id: "tue-web", day: "tue", start: 15, end: 16.5, title: "Web lab", meta: "Lab 3" },
  { id: "wed-hours", day: "wed", start: 9, end: 11, title: "Office hours", meta: "CCS 304", lane: "consult" },
  { id: "wed-forum", day: "wed", start: 13, end: 14.5, title: "Forum meetup", meta: "AVR", lane: "community" },
  { id: "thu-algo", day: "thu", start: 8, end: 9.5, title: "Algorithms", meta: "CCS 105" },
  { id: "thu-check", day: "thu", start: 13, end: 14, title: "Check-in", lane: "consult", form: "pending" },
  { id: "fri-cap", day: "fri", start: 8, end: 10, title: "Capstone", meta: "Lab 3" },
];

/** A sample week as the product will show it; the now-line follows the clock while it falls inside the sheet. */
export function SampleWeek() {
  const live = useNow();
  const now = live !== undefined && live >= 8 && live <= 17 ? live : 10.7;
  return (
    <Timetable
      label="A sample week in ACCS"
      days={DAYS}
      events={EVENTS}
      now={now}
      band={<><span className="ds-timetable__band-label"><Icon name="lock" size={16} weight="fill" /><strong>Reports</strong></span>Sample restricted lane. Report visibility depends on your role and case assignment.</>}
    />
  );
}
