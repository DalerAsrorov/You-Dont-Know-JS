// Let's practice working with value types and comparisons (Chapter 4, Pillar 3) where coercion will need to be involved.

// `scheduleMeeting(..)` should take a start time (in 24-hour format as a string "hh:mm")
// and a meeting duration (number of minutes). It should return `true` if the meeting
//  falls entirely within the work day (according to the times specified in `dayStart` and `dayEnd`); return `false` if the meeting violates the work day bounds.

const dayStart = "07:30";
const dayEnd = "17:45";

const adjustUnits = (unit) => unit.length === 1 ? `0${unit}` : unit;

function scheduleMeeting(startTime, durationMinutes) {
    const columnIndex = startTime.indexOf(':');
    let meetingHour = startTime.substring(0, columnIndex);
    let meetingMinutes = startTime.substring(columnIndex + 1);

    meetingMinutes = `${Number(meetingMinutes) + durationMinutes}`;

    if (meetingMinutes >= '60') {
        meetingHour = `${meetingHour < 24 ? Number(meetingHour) + 1 : 1}`;
        meetingMinutes = `${meetingMinutes % 60}`;
    }

    const exactStartTime = `${adjustUnits(startTime.substring(0, columnIndex))}:${adjustUnits(startTime.substring(columnIndex + 1))}`;
    const exactEndTime = `${adjustUnits(meetingHour)}:${adjustUnits(meetingMinutes)}`;

    return dayStart <= exactStartTime && exactEndTime <= dayEnd;
}

console.log(scheduleMeeting("7:00", 15));     // false
console.log(scheduleMeeting("07:15", 30));    // false
console.log(scheduleMeeting("7:30", 30));     // true
console.log(scheduleMeeting("11:30", 60));    // true
console.log(scheduleMeeting("17:00", 45));    // true
console.log(scheduleMeeting("17:30", 30));    // false
console.log(scheduleMeeting("18:00", 15));    // false
