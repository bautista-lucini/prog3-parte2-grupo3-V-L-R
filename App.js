import HomeMenu from "./src/components/HomeMenu";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
           {/* hay que armar que mande al homemenu si estan logueados.  */}
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

            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeMenu"
              component={HomeMenu}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
