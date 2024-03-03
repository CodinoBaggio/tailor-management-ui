import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const toDateTimeString = (date: string | Date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Tokyo');
  return dayjs(date).tz().format('YYYY/MM/DD HH:mm:ss');
};
