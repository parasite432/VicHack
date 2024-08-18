import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function Tab() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = auth.currentUser;
        if (user) {
          console.log("Current user UID:", user.uid);
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            console.log("User data:", userDocSnap.data());
            setUserData(userDocSnap.data());
          } else {
            console.log("No such document!");
            setError("User document not found");
          }
        } else {
          console.log("No user is signed in");
          setError("No user is signed in");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      setError("Error signing out: " + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error: {error}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centerContainer}>
        <Text>No user data available</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.profilepic}>
            {/* Add profile picture logic here if needed */}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>{userData.name || "N/A"}</Text>
            <Text style={styles.email}>{userData.email || "N/A"}</Text>
            <Text style={styles.age}>Age: {userData.age || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Interests:</Text>
          <FlatList
            data={userData.interested || []}
            renderItem={({ item }) => (
              <Text style={styles.interestItem}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.options}>
            <Text style={styles.optionsText}>Settings</Text>
            <MaterialIcons name="settings" color="black" size={35} />
          </View>

          <View style={styles.options}>
            <Text style={styles.optionsText}>Notifications</Text>
            <MaterialIcons name="notifications-none" color="black" size={35} />
          </View>

          <View style={styles.options}>
            <Text style={styles.optionsText}>Help & Support</Text>
            <Ionicons name="help-circle" color="black" size={35} />
          </View>

          <View style={styles.options}>
            <Text style={styles.optionsText}>Terms & Conditions</Text>
            <Ionicons name="document-text-outline" color="black" size={33} />
          </View>

          <View style={styles.options}>
            <Text style={styles.optionsText}>Privacy Policy</Text>
            <MaterialIcons name="privacy-tip" color="black" size={30} />
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EE",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    height: 151,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f3f9",
    borderRadius: 16,
    margin: 10,
  },
  profilepic: {
    borderColor: "black",
    borderRadius: 100,
    margin: 12,
    borderWidth: 2,
    height: 123,
    width: 123,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },
  email: {
    color: "#6C6C6C",
  },
  age: {
    color: "#6C6C6C",
  },
  interestsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  interestsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  interestItem: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 15,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});
