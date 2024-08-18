import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const addEventToFirestore = async (event) => {
  try {
    const docRef = await addDoc(collection(db, "events"), event);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addAllEvents = () => {
  const events = [
    {
      eventName: "Jake's cricket match",
      dateTime: new Date("2024-08-22T14:30:00"),
      location: "Brunswick",
      sport: "Cricket"
    },
    // ... add all other events here
  ];

  events.forEach(event => addEventToFirestore(event));
};

export { addEventToFirestore, addAllEvents };
