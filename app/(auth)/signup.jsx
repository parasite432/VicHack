import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, HelperText, Menu } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import { sports } from "@/data/sports";

export default function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interested, setInterested] = useState([]);
  const [error, setError] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !age || !email || !password || interested.length === 0) {
      setError("Please fill in all fields and select at least one sport.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        age: parseInt(age),
        email,
        interested,
        name,
        password, // Note: Storing password in Firestore is not recommended for security reasons
      });

      router.replace("/(tabs)");
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleSport = (sport) => {
    setInterested((prevSports) =>
      prevSports.includes(sport)
        ? prevSports.filter((s) => s !== sport)
        : [...prevSports, sport]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button onPress={() => setMenuVisible(true)} style={styles.input}>
            Select Interested Sports
          </Button>
        }
      >
        {sports.map((sport) => (
          <Menu.Item
            key={sport}
            onPress={() => toggleSport(sport)}
            title={sport}
            leadingIcon={interested.includes(sport) ? "check" : ""}
          />
        ))}
      </Menu>
      <HelperText type="info" visible={true}>
        Selected sports: {interested.join(", ")}
      </HelperText>
      {error ? (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      ) : null}
      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
      <Button mode="text" onPress={() => router.back()} style={styles.button}>
        Back to Login
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});
