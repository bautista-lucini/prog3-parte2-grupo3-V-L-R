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

  handleSubmit(email, password) {
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        this.props.navigation.navigate("HomeMenu");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("HomeMenu")
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>

        <Card source={require("../../assets/logo1.png")} />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          value={this.state.email}
        />

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

          <Text style={styles.navText}>Entrar en la app.</Text>

        </TouchableOpacity>

        <Text>Navegación cruzada a Register: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.navText}>No tengo cuenta</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0095F6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#0095F6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    marginTop: 10,
  },
  input: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    marginBottom: 15,
    fontSize: 16,
    color: "#262626",
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default Login;