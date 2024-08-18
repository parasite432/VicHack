import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DATA from "../../data/data.jsx";

const Item = ({ title, message }) => (
  <View style={styles.item}>
    <View style={styles.profilepic}></View>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  </View>
);

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} message={item.message} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#",
  },

  outer: {
    backgroundColor: "#ACD1BF",
    height: "85%",
    width: "85%",
    borderRadius: 16,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 15,
  },

  item: {
    paddingTop: 35,

    flexDirection: "row",
  },

  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  message: {
    color: "#6C6C6C",
    fontSize: 12,
  },
  profilepic: {
    borderRadius: 50,
    borderColor: "black",
    height: 50,
    width: 50,
    borderWidth: 2,
    marginRight: 10,
  },
});
