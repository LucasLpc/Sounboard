import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import Library from './Library';
import Search from './Search';

const Tabs = createBottomTabNavigator();

const Samples = ({route}) => {
  return (
    <Tabs.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Library') {
            iconName = focused
              ? 'library'
              : 'library-outline';
          } else if (route.name === 'Search') {
            iconName = focused
              ? 'search'
              : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="Library" options={{ headerShown: false, title: "All samples" }}>
        {() => <Library route={route} />}
      </Tabs.Screen>
      <Tabs.Screen name="Search" options={{ headerShown: false, title: "Search on freesound" }}>
        {() => <Search route={route} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default Samples;