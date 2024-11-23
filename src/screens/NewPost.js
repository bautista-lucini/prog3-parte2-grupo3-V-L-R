import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class NewPost extends Component {
 constructor(props) {
        super(props)
        this.state = {
          titulo: "",
          descripcion: "",
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          likes: [],
      }   
    }
    
    handleSubmit() {
        console.log(this.state)
        db.collection("posts").add(this.state)
        .then(res => {
          // console.log("El posteo se subió")
          this.props.navigation.navigate("Home")
         })
      .catch(err => {
          console.log(err)
         })
      }
    render() {
        return(
        <View style={styles.container}>
          <Text style={styles.heading}>Formulario nuevo posteo</Text>

                <Text>Título</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={(titulo) => this.setState({titulo})}
                    placeholder="Ingrese el títlo"
                    value={this.state.titulo}
                />
                <Text>Descripción</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={(descripcion) => this.setState({descripcion})}
                    placeholder="Ingrese la descripción"
                    value={this.state.descripcion}
                />
                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
                    Subir posteo
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

export default NewPost;