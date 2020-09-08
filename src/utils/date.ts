import moment from 'moment';

export function testDate(value: string): boolean {
  if (!value) {
    return false;
  }

  const regEx = /^\d{4}-\d{2}-\d{2}$/;

  if (!value.match(regEx)) {
    return false;
  }

  const date = new Date(value);
  const dateTime = date.getTime();

  if (!dateTime && dateTime !== 0) {
    return false;
  }

  return value === date.toISOString().slice(0, 10);
}

export function getWeekStart(week = 0): string {
  return moment()
    .weekday(0 + week * 7)
    .toISOString()
    .slice(0, 10);
}

export function getWeekEnd(week = 0): string {
  return moment()
    .weekday(6 + week * 7)
    .toISOString()
    .slice(0, 10);
}
