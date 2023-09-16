import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import CustomChoresTab from './components/CustomChoresTab';
import Chores from './pages/Chores';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import Bills from './pages/Bills';

const ChoresTab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const ChoresStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECF0EB'
  },
};


const App = () => {
  const [user, setUser] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const retrieveUser = async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        setUser(value);
      } else {
        setUser(undefined);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    retrieveUser();
  }, []);
  return (
    <SafeAreaProvider>
      {isLoading ?
        (
          <ActivityIndicator />
        ) :
        <NavigationContainer theme={MyTheme}>
          {user ?
            <Tab.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#ECF0EB'
              }, headerShown: true
            }}>
              <Tab.Screen name="Home" component={Home} options={{ title: `Hello ${user}!` }} />
              <Tab.Screen name="Chores" children={(props) => <CustomChoresTab {...props} user={user} />} />
              <Tab.Screen name="Bills" component={Bills} />
              <Tab.Screen name="Log Out" children={(props) => <SignOut {...props} refetch={retrieveUser} />} />
            </Tab.Navigator>
            : <Stack.Navigator>
              <Stack.Screen name="Sign In" children={(props) => <SignIn {...props} refetch={retrieveUser} />} />
            </Stack.Navigator>}
        </NavigationContainer>
      }
    </SafeAreaProvider>
  );
};

export default App;