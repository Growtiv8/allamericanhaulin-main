"use server";
import "server-only";
import { googleAddEvent, googleListEvents } from "@localwebleads/google";
import { addMinutes, areIntervalsOverlapping, eachMinuteOfInterval, format, isWeekend } from "date-fns";


export async function addEvent({ firstName, lastName, email, phone, message, datetime }: { firstName: string, lastName: string, email: string, phone: string, message: string, datetime: string }): Promise<void> {
  try {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALENDAR_REFRESH_TOKEN, GOOGLE_USERNAME } = process.env;
    const date = new Date(datetime);
    await googleAddEvent({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_CALENDAR_REFRESH_TOKEN,
      status: "confirmed",
      summary: "Hoppe Home Loans",
      description: `${message} ${[firstName, lastName].join(' ')}'s email: ${email} and phone: ${phone}.`,
      creator: { email: 'prichardson@hoppehomeloans.com', self: true },
      attendees: [
        { email: GOOGLE_USERNAME, displayName: 'Paul Richardson', organizer: true, responseStatus: 'accepted' },
        { email, displayName: [firstName, lastName].join(' '), organizer: false, responseStatus: 'accepted' }
      ],
      startDateTime: date.toISOString(),
      endDateTime: addMinutes(date, 60).toISOString(),
      timeZone: 'America/Los_Angeles'
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.');
    }
  }
}

export async function getAvailableAppointments({ start, end, step }: { start: Date, end: Date, step: number }) {
  function zuluLocalOffset({ zuluTime, timeZone = 'America/Los_Angeles' }: { zuluTime: Date, timeZone?: string }) {
    const localTime = new Date(zuluTime.toLocaleString('en-us', { timeZone }));
    const offset = Math.round((zuluTime.valueOf() - localTime.valueOf()));
    return offset;
  }
  function filterAvailableMeetinSlots(zuluTime: Date): boolean {
    const timeLocal = new Date(zuluTime.toLocaleString('en-us', { timeZone: 'America/Los_Angeles' }));
    const offset = zuluLocalOffset({ zuluTime }) * (1 / (60 * 60 * 1000));
    const availabilityLocalTime = [13, 16]
    const availabilityZuluTime = [
      availabilityLocalTime[0] + offset,
      ((availabilityLocalTime[1] + offset) < 24) ? availabilityLocalTime[1] + offset : 0
    ]
    let isInTimeInterval = false;
    if (!isWeekend(timeLocal)) {
      if (availabilityZuluTime[0] <= availabilityZuluTime[1]) {
        if ((zuluTime.getHours() >= availabilityZuluTime[0]) && (zuluTime.getHours() <= availabilityZuluTime[1])) {
          isInTimeInterval = true;
        }
      } else {
        if ((zuluTime.getHours() >= availabilityZuluTime[0]) || (zuluTime.getHours() <= availabilityZuluTime[1])) {
          isInTimeInterval = true;
        }
      }
    }
    return isInTimeInterval;
  }
  let availableAppointments: { [key: string]: string[] } = { "2020-01-01": ["2020-01-01 00:00:00"] }
  try {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALENDAR_REFRESH_TOKEN, GOOGLE_USERNAME } = process.env;

    const bookedMeetingSlots = await googleListEvents({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_CALENDAR_REFRESH_TOKEN,
      calendarId: GOOGLE_USERNAME
    });

    const allMeetingSlots = eachMinuteOfInterval({ start: new Date(start), end: new Date(end) }, { step })
      .filter(timeZulu => filterAvailableMeetinSlots(timeZulu))
      .map(v => v);

    const timeSlots = allMeetingSlots
      .filter(timeZulu => !(bookedMeetingSlots.map(v => areIntervalsOverlapping(v, { start: timeZulu, end: addMinutes(timeZulu, 60) })).some(v => v)))
      .map(v => v.toLocaleString('en-us', { timeZone: 'America/Los_Angeles' }))

    availableAppointments = Object.groupBy(timeSlots, (timeZulu) => format(new Date(timeZulu), 'yyyy-MM-dd')) as { [key: string]: string[] };

    const keys = Object.keys(availableAppointments)
    for (const key of keys) {
      availableAppointments[key] = availableAppointments[key].map(v => (new Date((new Date(v)).valueOf() + zuluLocalOffset({ zuluTime: new Date(v), timeZone: 'America/Los_Angeles' }))).toISOString())
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occured.')
    }
  }
  return availableAppointments
}