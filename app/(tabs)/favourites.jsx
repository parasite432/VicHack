import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const favoriteIds = docSnapshot.data().favorites || [];
        const favoriteEvents = await Promise.all(
          favoriteIds.map(async (id) => {
            const eventDoc = await getDoc(doc(db, "events", id));
            return { id, ...eventDoc.data() };
          })
        );
        setFavorites(favoriteEvents);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const renderFavorite = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.location}</Paragraph>
        <Paragraph>{item.sport}</Paragraph>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  if (!auth.currentUser) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your favorites.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text>You haven't added any favorites yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6EE",
  },
  card: {
    margin: 8,
    width: 300,
  },
  list: {
    width: "100%",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
