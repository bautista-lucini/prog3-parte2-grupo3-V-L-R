import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class Users extends Component {
 constructor(props) {
        super(props)
        this.state = {
            username: "",
            errMsg: "",
            input: ''
      }   
    }
    handleSubmit(username) {
        auth.createUserWithEmailAndPassword(email, pass)
          .then((response) => {
              if (response) {
                db.collection("users").add({
                  username : username,
                  email : email,
                  password : pass
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
        return(
        <View style={styles.container}>
          <Text style={styles.heading}>Buscar usuarios</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={(titulo) => this.setState({titulo})}
                    placeholder="Ingrese el nombre de usuario"
                    value={this.state.titulo}
                />
               
                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
                    Buscar
                </TouchableOpacity>
            </View>
        )
    }
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    padding: 10, 
    borderWidth: 1,
    borderColor: "#00000087"
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 5,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 10,
  },

});

export default Users;
