import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import {View} from 'react-native'

const CustomIcon = ({ IconComponent, name, color, size, focused }) => (
    <View style={{
      width: focused ? 50 : 40,
      height: focused ? 50 : 40,
      borderRadius: 25,
      backgroundColor: focused ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
  
  export default function TabLayout() {
    return (
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'black',
            height: 60,
          },
          tabBarIcon: ({ color, focused }) => {
            let IconComponent = Ionicons;
            let iconName;
            let iconSize = 24;
  
            if (route.name === 'index') {
              iconName = 'home-outline';
            } else if (route.name === 'favourites') {
              IconComponent = FontAwesome;
              iconName = 'heart-o';
            } else if (route.name === 'add') {
              iconName = 'add';
              iconSize = 35;
            } else if (route.name === 'messages') {
              IconComponent = Feather;
              iconName = 'message-square';
            } else if (route.name === 'profile') {
              IconComponent = FontAwesome;
              iconName = 'user-o';
            }
  
            return (
              <CustomIcon
                IconComponent={IconComponent}
                name={iconName}
                color={color}
                size={iconSize}
                focused={focused}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="favourites" options={{ headerShown: false }} />
        <Tabs.Screen name="add" options={{ headerShown: false }} />
        <Tabs.Screen name="messages" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
    );
  }