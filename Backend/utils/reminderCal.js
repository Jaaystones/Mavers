const moment = require('moment');

const calculateReminderDates = (dueDate) => {
  const reminders = [];
  const due = moment(dueDate);

  reminders.push({
    remindAt: due.clone().subtract(5, 'days').toDate(),
    reminderType: 'green'
  });
  reminders.push({
    remindAt: due.clone().subtract(3, 'days').toDate(),
    reminderType: 'yellow'
  });
  reminders.push({
    remindAt: due.clone().subtract(1, 'days').toDate(),
    reminderType: 'red'
  });
  reminders.push({
    remindAt: due.toDate(),
    reminderType: 'black'
  });

  return reminders;
};

module.exports = calculateReminderDates;