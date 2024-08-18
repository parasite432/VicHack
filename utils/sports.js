// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com" // Replace with your database URL
});

const db = admin.firestore();

const addSportToFirestore = async (event) => {
  try {
    const docRef = await addDoc(collection(db, "sports"), event);
    console.log("Document written with ID: ", docRef.id);
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

  sports.forEach((sport) => addSportToFirestore(sport));
};

addAllSports();

