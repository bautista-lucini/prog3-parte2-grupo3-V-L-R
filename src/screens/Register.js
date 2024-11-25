import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { auth, db } from "../firebase/config";
import Card from "../components/Image";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      registered: false,
      errMsg: "",
      errorEmail: "",
      errorUsername: "",
      errorPassword: "",
    };
  }

  handleSubmit(username, email, pass) {
    
    if (email === "") {
      this.setState({ errorEmail: "el email es requerido"})
    } else {
      this.setState({ errorEmail: ""})
    }

    if (username=== "") {
      this.setState({ errorUsername: "el usuario requerido"})
    } else{
      this.setState ({ errorUsername: ""})
    }
    
    if (pass === "") {
      this.setState({ errorPassword: "la contraseña es requerida"})
    } else {
      this.setState({ errorPassword: ""})
    }

    auth.createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        if (response) {
          db.collection("users").add({
            username: username,
            email: email,
            password: pass
          })
            .then(() => {
              this.setState({ registered: true, errorMsg: '' });
              this.props.navigation.navigate('Login');
            })
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errMsg: error.message });
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.heading}>Registro</Text>
        <Card source={require("../../assets/logo1.png")} />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
          keyboardType="default"
          placeholder="Ingrese su nombre de usario"
          value={this.state.username}
        />
        <Text> {this.state.errorUsername}</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType="email-address"
          placeholder="Ingrese su email"
          value={this.state.email}
        />
        <Text> {this.state.errorEmail}</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          keyboardType="default"
          placeholder="Ingrese su contraseña"
          secureTextEntry={true}
          value={this.state.password}
        />
         <Text> {this.state.errorPassword}</Text>

        <TouchableOpacity
          onPress={() =>
            this.handleSubmit(this.state.username, this.state.email, this.state.password)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}> Registrarse</Text>
        </TouchableOpacity>

        {this.state.errMsg && <Text style={styles.errorText}> {this.state.errMsg}</Text>}

        <Text><br /></Text>
        <Text>¿Tienes una cuenta? Entrar</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.navText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#262626",
    marginBottom: 20,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 10,
  },
});

export default Register;
