import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Searchbar,
  IconButton,
} from "react-native-paper";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useRouter } from "expo-router";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const eventList = [];
      querySnapshot.forEach((doc) => {
        eventList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventList);
      setLoading(false);
      await AsyncStorage.setItem("events", JSON.stringify(eventList));
    });

    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        AsyncStorage.getItem("events").then((storedEvents) => {
          if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
          }
        });
      }
    });

    // Fetch user's favorites
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setFavorites(doc.data().favorites || []);
        }
      });
    }

    return () => unsubscribe();
  }, [auth.currentUser]);

  const toggleFavorite = async (eventId) => {
    if (!auth.currentUser) {
      // Handle the case where the user is not logged in
      console.log("User must be logged in to add favorites");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    if (favorites.includes(eventId)) {
      await updateDoc(userRef, {
        favorites: arrayRemove(eventId),
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayUnion(eventId),
      });
    }
  };

  const renderEvent = ({ item }) => {
    const formatDate = (timestamp) => {
      if (!timestamp || !timestamp.seconds) {
        return "Date not available";
      }
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const isFavorite = favorites.includes(item.id);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{formatDate(item.datetime)}</Paragraph>
          <Paragraph>{item.location}</Paragraph>
          <Chip icon="tag" style={styles.chip}>
            {item.sport}
          </Chip>
          <IconButton
            icon={isFavorite ? "heart" : "heart-outline"}
            onPress={() => toggleFavorite(item.id)}
            color={isFavorite ? "red" : "grey"}
          />
        </Card.Content>
      </Card>
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.sport?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search events"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EE",
  },
  card: {
    margin: 8,
    elevation: 4,
    width: 300,
  },
  chip: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 16,
  },
  searchbar: {
    margin: 8,
    width: 300,
  },
});
