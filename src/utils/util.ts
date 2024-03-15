import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const toDateTimeString = (date: string | Date, format: string = 'YYYY/MM/DD HH:mm:ss') => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Tokyo');
  return dayjs(date).tz().format(format);
};
