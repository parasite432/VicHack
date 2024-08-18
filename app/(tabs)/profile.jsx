import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../firebaseConfig"; // Adjust this import path as needed
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Tab() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      // You might want to show an error message to the user here
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilepic}></View>
        <View style={styles.userDetails}>
          <Text style={styles.username}>Emma Philips</Text>
          <Text style={styles.email}>emmaphilips@gmail.com</Text>
          <Text style={styles.location}>Springvale</Text>
        </View>
      </View>

      <View style={styles.followings}>
        <View style={styles.followers}>
          <Text>Followers</Text>
          <Text>1,234</Text>
        </View>
        <View style={styles.following}>
          <Text>Following</Text>
          <Text>300</Text>
        </View>
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

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#F6F6EE",
  },
  profileContainer: {
    height: 151,
    width: 325,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#f7f3f9",
    borderRadius: 16,
  },
  profilepic: {
    borderColor: "black",
    borderRadius: 100,
    margin: 12,
    borderWidth: 2,
    height: 123,
    width: 123,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },

  email: {
    color: "#6C6C6C",
  },
  location: {
    color: "#6C6C6C",
  },
  followings: {
    borderColor: "#6C6C6C",
    display: "flex",
    flexDirection: "row",
    padding: (0, 40, 0, 40),
    width: 300,
    justifyContent: "space-between",
  },
  following: {
    alignItems: "center",
  },
  followers: {
    alignItems: "center",
  },
  optionsContainer: {
    width: 300,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 25,
  },

  optionsText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  logout: {
    padding: 20,
    fontSize: 18,
    color: "red",
  },
});
