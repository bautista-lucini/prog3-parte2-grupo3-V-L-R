import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-web";
import Card from "../components/Image";

import { auth } from "../firebase/config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit(email, password){
    auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
      this.props.navigation.navigate("HomeMenu");
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>

        <Card source={require("../../assets/logo1.png")} />

        <Text> Email </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          value={this.state.email}
        />

        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          keyboardType="default"
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          value={this.state.password}
        />

        <TouchableOpacity
          onPress={() => this.handleSubmit(this.state.email, this.state.password)}
          style={[styles.button, styles.buttonSecondary]}>
            
            <Text>Entrar en la app.</Text>

        </TouchableOpacity>
        
        <Text>Navegación cruzada a Register: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#51b9e9",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffa500",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  input:{
    padding: 10, 
    borderWidth: 1,
    borderColor: "#00000087"
  }
});

export default Login;