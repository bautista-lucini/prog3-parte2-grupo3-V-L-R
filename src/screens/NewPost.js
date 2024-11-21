import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

// class NewPost extends Component {
//     constructor(props) {
//         super(props)
       
//     }

//     handleSubmit() {
//         console.log(this.state)
//         db.collection("posts").add({
//             owner: auth.currentUser.email,
//             descripcion: this.state.descripcion,
//             createdAt: Date.now(),
//         })
//         .then()
//         .catch

//     render() {
//         return(
//             <View>
//                 <Text>Formulario nuevo posteo</Text>
//                 <Text>Título</Text>
//                 <TextInput
//                     style={Style}
//                     keyboardType="default"
//                     onChangeText={(titulo) => this.setState({titulo})}
//                     placeholder="Ingrese el títlo"
//                     value={this.state.titulo}
//                 />
//                 <Text>Descripción</Text>
//                 <TextInput
//                     style={Style}
//                     keyboardType="default"
//                     onChangeText={(descripcion) => this.setState({descripcion})}
//                     placeholder="Ingrese la descripción"
//                     value={this.state.descripcion}
//                 />
//                 <TouchableOpacity onPress={() => this.handleSubmit()}>
//                     Subir posteo
//                 </TouchableOpacity>
//             </View>
//         )
//     }


// export default NewPost;

// const Style = StyleSheet.create({});