const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://<your-database-name>.firebaseio.com"
});

module.exports = admin;
