const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceSDK.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const sportsCollection = db.collection("sports");

const addSportToFirestore = async (batch, sport) => {
  try {
    const docRef = sportsCollection.doc();
    batch.set(docRef, sport);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// MaterialCommunityIcons
const addAllSports = () => {
  const sports = [
    {
      name: "cricket",
      icon: "cricket",
    },
    {
      name: "football",
      icon: "football",
    },
    {
      name: "rugby",
      icon: "rugby",
    },
    {
      name: "basketball",
      icon: "basketball",
    },
    {
      name: "golf",
      icon: "golf",
    },
    {
      name: "soccer",
      icon: "soccer",
    },
    {
      name: "tennis",
      icon: "tennis",
    },
    {
      name: "badminton",
      icon: "badminton",
    },
    {
      name: "chess",
      icon: "chess-pawn",
    },
    {
      name: "table-tennis",
      icon: "table-tennis",
    },
  ];

  var batch = db.batch();
  sports.forEach((sport) => addSportToFirestore(batch, sport));
  batch.commit().then(() => {
    console.log("All sports added");
  });
};

addAllSports();

