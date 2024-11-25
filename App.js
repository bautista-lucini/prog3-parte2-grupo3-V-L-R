import React, { Component } from 'react';

import HomeMenu from "./src/components/HomeMenu";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from './src/firebase/config';

const Stack = createNativeStackNavigator()

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      loading: true,   
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true, loading: false})
      } else {
        this.setState({loading: false})
      }
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator>
            {
              this.state.loggedIn ? 
              <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="HomeMenu"
                component={HomeMenu}
              />
              </> : 
              <>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Register"
                  component={Register}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={Login}
                />
              </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});