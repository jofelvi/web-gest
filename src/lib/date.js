import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.locale('es');
dayjs.extend(relativeTime);

export const calculateTimeDistance = date => {
  const parsedDate = dayjs(date);
  return dayjs().to(parsedDate);
};
