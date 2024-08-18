const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebaseServiceSDK.json");

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
      name: "Sarah's football game",
      datetime: new Date("2024-09-05T18:00:00"),
      location: "Footscray",
      max_players: 18,
      current_players: 12,
      sport: "football",
    },
    {
      name: "Oliver's rugby tournament",
      datetime: new Date("2024-09-15T10:00:00"),
      location: "St Kilda",
      max_players: 30,
      current_players: 22,
      sport: "rugby",
    },
    {
      name: "Emma's basketball championship",
      datetime: new Date("2024-10-01T19:30:00"),
      location: "Docklands",
      max_players: 12,
      current_players: 8,
      sport: "basketball",
    },
    {
      name: "George's golf outing",
      datetime: new Date("2024-10-12T07:00:00"),
      location: "Sandringham",
      max_players: 16,
      current_players: 7,
      sport: "golf",
    },
    {
      name: "Mia's soccer practice",
      datetime: new Date("2024-11-03T16:00:00"),
      location: "Coburg",
      max_players: 22,
      current_players: 18,
      sport: "soccer",
    },
    {
      name: "Liam's tennis tournament",
      datetime: new Date("2024-11-20T09:00:00"),
      location: "Kew",
      max_players: 32,
      current_players: 24,
      sport: "tennis",
    },
    {
      name: "Sophia's badminton league",
      datetime: new Date("2024-12-05T18:30:00"),
      location: "Moonee Ponds",
      max_players: 16,
      current_players: 10,
      sport: "badminton",
    },
    {
      name: "Alex's chess competition",
      datetime: new Date("2024-12-15T13:00:00"),
      location: "Carlton",
      max_players: 64,
      current_players: 48,
      sport: "chess",
    },
    {
      name: "Nathan's table tennis showdown",
      datetime: new Date("2025-01-10T17:00:00"),
      location: "Fitzroy",
      max_players: 32,
      current_players: 20,
      sport: "table-tennis",
    },
    // ... add all other events here
  ];

  var batch = db.batch();
  events.forEach((event) => addEventToFirestore(batch, event));
  batch.commit().then(() => {
    console.log("All events added");
  });
};

addAllEvents();
