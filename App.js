import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import FormScreen from './screens/FormScreen'; // Your FormScreen component
import DashboardScreen from './screens/DashboardScreen'; // Your DashboardScreen component


// Define your custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#AD222B', // Custom primary color (red)
    accent: '#DA291C', // Custom accent color
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Form') {
                iconName = 'clipboard-outline'; // Valid Ionicon for Form tab
              } else if (route.name === 'Dashboard') {
                iconName = 'bar-chart-outline'; // Valid Ionicon for Dashboard tab
              }

              return <Ionicons name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: theme.colors.primary, // Red for active tab
            tabBarInactiveTintColor: 'gray', // Gray for inactive tab
            tabBarStyle: {
              backgroundColor: 'white', // White background for the tab bar
            },
          })}
        >
          <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
              headerTitle: 'Form',
            }}
          />
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerTitle: 'Dashboard',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
