const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceSDK.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const eventsCollection = db.collection("events");


const addEventToFirestore = async (batch, event) => {
  try {
    const docRef = eventsCollection.doc();
    batch.set(docRef, event);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addAllEvents = () => {
  const events = [
    {
      eventName: "Jake's cricket match",
      dateTime: Timestamp.fromDate(new Date("2024-08-22T14:30:00")),
      location: "Brunswick",
      sport: "Cricket"
    },
    // ... add all other events here
  ];

  var batch = db.batch();
  events.forEach(event => addEventToFirestore(batch, event));
  batch.commit().then(() => {
    console.log("All events added");
  });
};

addAllEvents();
