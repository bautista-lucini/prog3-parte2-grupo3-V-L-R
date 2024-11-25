import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: "",
      descripcion: "",
      msgExito: "",
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      likes: [],
      errMsg: "",
    }
  }

  handleSubmit() {
    console.log(this.state)
    db.collection("posts").add(this.state)
      .then(res => {
        // console.log("El posteo se subió")
        this.setState({titulo: "", descripcion: "", msgExito:"Publicación subida con éxito"})
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errMsg: error.message });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Formulario nuevo posteo</Text>

        <Text style={styles.subheading}>Título</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(titulo) => this.setState({ titulo })}
          placeholder="Ingrese el título"
          value={this.state.titulo}
        />
        
        
        <Text style={styles.subheading}>Descripción</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(descripcion) => this.setState({ descripcion })}
          placeholder="Ingrese la descripción"
          value={this.state.descripcion}
        />
        <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.button}>
         <Text style={styles.buttonText}> Subir posteo</Text>
        </TouchableOpacity>
        <Text> {this.state.msgExito}</Text>
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
  heading:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#00000087",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0095F6",
    borderRadius: 5,
    padding: 10,
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },
  subheading:{
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  }

});

export default NewPost;