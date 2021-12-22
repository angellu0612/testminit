import moment from 'moment';
import { isArray } from './type';

const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
const FORMAT_DATE = 'YYYY-MM-DD 00:00:00';

export function formatDate(date) {
  return date?.format(FORMAT_DATETIME);
}

export function formatRangeDate(date, time = false) {
  if (isArray(date) && date.length === 2) {
    if (time) return date.map(v => v.format(FORMAT_DATETIME));
    else return [date[0].format(FORMAT_DATE), moment(date[1]).add(1, 'd').format(FORMAT_DATE)];
  }
  return [];
}
