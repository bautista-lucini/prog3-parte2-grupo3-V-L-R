import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Ingresar</Text>
        <Text>Esta es la pantalla donde debe ir el formulario de login.</Text>
        <Text>Navegación cruzada a Register: </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text>No tengo cuenta</Text>
        </TouchableOpacity>
        <Text>
          Navegación cruzada a ingresar a la app. Este paso se hará
          automaticamente cuando veamos la funcionalidad de loguin{" "}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("HomeMenu")}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Text>Entrar en la app.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#ffa500",
  },
});

export default Login;