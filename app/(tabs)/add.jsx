import { sports } from "@/data/sports";
import { db } from "@/firebaseConfig";
import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Menu, TextInput } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const addEventToFirestore = async (event) => {
  const eventsCollection = db.collection("events");
  try {
    const docRef = eventsCollection.doc();
    await docRef.set(event);
    console.log("Event added successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
    Alert.alert("Error", "There was an error adding the event. Please try again.");
  }
};

const getIcon = (sport) => {
  if (sport === 'chess') {
    return 'chess-pawn';
  }
  return sport;
}

export default function Tab() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleSport = (selectedSport) => {
    setSport(selectedSport);
    setMenuVisible(false); // Hide menu after selection
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDateTime(false);
    if (selectedDate) {
      setDatetime((prevDatetime) => new Date(selectedDate.setHours(prevDatetime.getHours(), prevDatetime.getMinutes())));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDatetime((prevDatetime) => new Date(prevDatetime.setHours(selectedTime.getHours(), selectedTime.getMinutes())));
    }
  };

  const handleSubmit = async () => {
    if (!name || !datetime || !location || !sport || !maxPlayers || !currentPlayers) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    await addEventToFirestore({
      name,
      datetime,
      location,
      sport,
      max_players: parseInt(maxPlayers, 10),
      current_players: parseInt(currentPlayers, 10),
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => setShowDateTime(true)} style={styles.input}>
        Select Date: {datetime.toLocaleDateString()}
      </Button>
      {showDateTime && (
        <DateTimePicker
          value={datetime}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      <Button mode="contained" onPress={() => setShowTimePicker(true)} style={styles.input}>
        Select Time: {datetime.toLocaleTimeString()}
      </Button>
      {showTimePicker && (
        <DateTimePicker
          value={datetime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="contained" onPress={() => setMenuVisible(true)} style={styles.input}>
            {sport ? `Selected Sport: ${sport}` : "Select Sport"}
            <MaterialCommunityIcons name={getIcon(sport)} size={16} color="white" />
          </Button>
        }
      >
        {sports.map((sportItem) => (
          <Menu.Item
            key={sportItem}
            onPress={() => toggleSport(sportItem)}
            title={sportItem}
            style={sport === sportItem ? { fontWeight: 'bold' } : {}}
          />
        ))}
      </Menu>
      <TextInput
        label="Max Players"
        value={maxPlayers}
        onChangeText={setMaxPlayers}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Current Players"
        value={currentPlayers}
        onChangeText={setCurrentPlayers}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Add Event
      </Button>
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
  input: {
    marginBottom: 12,
    width: '90%',
  },
  button: {
    marginTop: 16,
    width: '90%',
  },
});
