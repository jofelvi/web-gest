import * as moment from 'moment';

export const sortingYears = (numberArray) => numberArray.sort((a, b) => (a.year > b.year) ? 1 : -1);

export const sortingDays = (numberArray) =>  numberArray.sort((a, b) => (a.day > b.day) ? 1 : -1);
export const sortingHours = (numberArray) =>  numberArray.sort((a, b) => (a.hour > b.hour) ? 1 : -1);


export const generateDays = (num = 12, key = 'months') => {
  let days = [];

  [...Array(num).keys()].map(value => {
    days = [...days, { totalnumero: 0, totalpvm: 0, day: moment().subtract(value, key).format('YYYY-MM-DD') }];
  });
  return days;
};

export const generateHours = (num = 24) => {
  let hours = [];

  [...Array(num).keys()].map(value => {
    hours = [...hours, { totalnumero: 0, totalpvm: 0, hour: moment({ minute: 0, hour: value}).format('HH:mm') }];
  });
  return hours;
};
