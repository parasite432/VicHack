import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Searchbar,
} from "react-native-paper";
import { collection, query, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { db } from "../firebaseConfig";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const eventList = [];
      querySnapshot.forEach((doc) => {
        eventList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventList);
      setLoading(false);
      // Store the events in AsyncStorage
      await AsyncStorage.setItem("events", JSON.stringify(eventList));
    });

    // Check for internet connection and load from AsyncStorage if offline
    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        AsyncStorage.getItem("events").then((storedEvents) => {
          if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const renderEvent = ({ item }) => {
    // Function to format the Firebase Timestamp
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

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph>{formatDate(item.datetime)}</Paragraph>
          <Paragraph>{item.location}</Paragraph>
          <Chip icon="tag" style={styles.chip}>
            {item.sport}
          </Chip>
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
  },
});
