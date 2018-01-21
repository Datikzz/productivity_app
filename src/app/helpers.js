const Handlebars = require('handlebars/runtime');

const today = new Date();
const todayDate = `${today.getDate()} ${today.getMonth()+1}, ${today.getFullYear()}`;

/**
 * Register helper that gets Date from input
 * @param {number} date - date in milliseconds
 */
Handlebars.registerHelper('formatDateNum', (date) => {
  const input = new Date(date);
  const inputDate = `${input.getDate()} ${input.getMonth()+1}, ${input.getFullYear()}`;
  let outputDate;
  if(inputDate === todayDate) {
    outputDate = '';
  } else {
    outputDate = new Date(date).getDate();
  }

  return outputDate;
});

/**
 * Register helper that gets Month from input
 * @param {number} date - date in milliseconds
 */
Handlebars.registerHelper('formatDateMonth', (date) => {
  const input = new Date(date);
  const inputDate = `${input.getDate()} ${input.getMonth()+1}, ${input.getFullYear()}`;
  let outputDate;
  if(inputDate === todayDate) {
    outputDate = 'today';
  } else {
    outputDate = new Date(date).toLocaleString('en-us', {month: 'short'});
  }
  return outputDate;
});

/**
 * Register helper that gets full date from input
 * @param {number} date - date in milliseconds
 */
Handlebars.registerHelper('formatFullDate', (date) => {
  const month = new Date(date).toLocaleString('en-us', {month: 'long'});
  month.toUpperCase();
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return  `${day} ${month}, ${year}`;
});

/**
 * Register helper that checks if deadline is overdue
 * @param {date} date - date in milliseconds
 * @param {object} options - 'if' handlebars value
 */
Handlebars.registerHelper('ifOver', (date, options) => {
  const someday = new Date(date);
  const today = new Date();
  today.setHours(0,0,0,0);
  if(someday < today) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});