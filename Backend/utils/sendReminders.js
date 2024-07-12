const admin = require('firebase-admin');
const Reminder = require('../models/Reminder');
const User = require('../models/User');

// Send reminders
const sendReminders = async () => {
  const reminders = await Reminder.find({ isSent: false, remindAt: { $lte: new Date() } })
    .populate('task')
    .populate('task.assignedTo')
    .exec();

  for (const reminder of reminders) {
    const user = reminder.task.assignedTo;
    const token = user.firebaseToken; // Assuming you store FCM token in user document

    const message = {
      notification: {
        title: 'Task Reminder',
        body: `You have a task due in ${reminder.reminderType} days: ${reminder.task.title}`
      },
      token: token
    };

    await admin.messaging().send(message);

    reminder.isSent = true;
    reminder.sentAt = new Date();
    await reminder.save();
  }
};

module.exports = sendReminders;
