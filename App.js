
import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import BackgroundFetch from "react-native-background-fetch";
import { Alert } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  const [state, setState] = useState({
    events: []
  })



  useEffect(() => {
    BackgroundFetch.configure({
      minimumFetchInterval: 16,      // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false,      // <-- Android-only,
      startOnBoot: true,           // <-- Android-only
      enableHeadless: true,         // <-- Android-only
      requiresBatteryNotLow: false, // <-- Android-only
      requiresCharging: false,      // <-- Android-only
      requiresStorageNotLow: false,  // <-- Android-only
      requiresDeviceIdle: false,    // <-- Android-only
      foregroundService: false      // <-- Android-only
    }, async taskId => {
      console.log("[js] Received background-fetch event: ", taskId);
      try {
        // Make an API call here
        const response = await fetch('http://192.168.18.4:3001/store/getTime');
        const data = await response.json();
        console.log(data);
        BackgroundFetch.finish(taskId);
      } catch (error) {
        console.error(error);
        BackgroundFetch.finish(taskId);
      }
    }, error => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    BackgroundFetch.start();
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'View Users', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
