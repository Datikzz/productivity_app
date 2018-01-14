const Handlebars = require('handlebars/runtime');
 
Handlebars.registerHelper('formatDateNum', (date) => {
  return new Date(date).getDate();
});

Handlebars.registerHelper('formatDateMonth', (date) => {
  return new Date(date).toLocaleString('en-us', {month: 'short'});
});

Handlebars.registerHelper('formatFullDate', (date) => {
  const month = new Date(date).toLocaleString('en-us', {month: 'long'});
  month.toUpperCase();
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return  `${day} ${month}, ${year}`;
});