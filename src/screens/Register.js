import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
// import {auth} from  "../firebase/config";


class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        registered: false,
        errMsg: "",
      };
    }
  
    handleSubmit(email, pass) {
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then((response) => this.setState({ registered: true, errMsg: "" }))
        .catch((error) => {
          console.log(error.message);
          this.setState({ errMsg: error.message });
        });
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Registro</Text>
  
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
            placeholder="Ingrese su password"
            secureTextEntry={true}
            value={this.state.password}
          />
  
          <TouchableOpacity
            onPress={() =>
              this.handleSubmit(this.state.email, this.state.password)
            }
            style={styles.button}
          >
            <Text>Registrarse</Text>
          </TouchableOpacity>
          {this.state.errMsg && <Text>{this.state.errMsg}</Text>}
          <Text>Navegación cruzada a Login: </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text>Ya tengo cuenta</Text>
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
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#00000087",
  
    },
  });
  
export default Register;
  