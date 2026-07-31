export interface MeetingCostInput {
  attendees: number;
  hourlyWage: number;
}

/** Cost accrued so far, given elapsed milliseconds. */
export function calculateMeetingCost(input: MeetingCostInput, elapsedMs: number): number {
  const attendees = Math.max(input.attendees, 0);
  const hourlyWage = Math.max(input.hourlyWage, 0);
  const hoursElapsed = elapsedMs / 3_600_000;
  return attendees * hourlyWage * hoursElapsed;
}

/** Combined cost-per-minute across every attendee, used for the "burn rate" stat. */
export function costPerMinute(input: MeetingCostInput): number {
  return (Math.max(input.attendees, 0) * Math.max(input.hourlyWage, 0)) / 60;
}

export function costPerHour(input: MeetingCostInput): number {
  return Math.max(input.attendees, 0) * Math.max(input.hourlyWage, 0);
}

/** Formats elapsed milliseconds as H:MM:SS (or M:SS under an hour). */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export const defaultMeetingCostInput: MeetingCostInput = {
  attendees: 6,
  hourlyWage: 55,
};