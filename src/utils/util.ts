import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const toDateTimeString = (date: string | Date, format: string = 'YYYY/MM/DD HH:mm:ss') => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Tokyo');
  return dayjs(date).tz().format(format);
};

export const hasDependencyCharacter = (str: string) => {
  // 機種依存文字を表す正規表現
  const dependencyCharPattern = /[\uFF61-\uFF9F\uE000-\uF8FF\u2460-\u24FF]/;
  
  // 文字列に機種依存文字が含まれているかチェック
  return dependencyCharPattern.test(str);
}