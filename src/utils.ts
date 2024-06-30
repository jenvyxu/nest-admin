import * as dayjs from 'dayjs';

export const generateOrderNo = () => {
  return `${dayjs().format('YYYYMMDDHHmmssSSS')}`;
};
