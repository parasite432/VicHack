import EventList from '@/components/EventList';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Home</Text>
        <EventList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});