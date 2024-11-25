import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";

class Users extends Component {
 constructor(props) {
        super(props)
        this.state = {
            username: "",
            errMsg: "",
            users: [],
      }   
    }
    
    handleSubmit() {
      // hacer con users. lo anterior no va mas. 
      db.collection("users").onSnapshot(doc => {
        let users = [];
        doc.forEach(user => {
          users.push(user.data())
      })
      users = users.filter(user => {
        return user.username.includes(this.state.username)
      })
      this.setState({ users })
    })
  }
    
   
    render() {
        return(
        <View style={styles.container}>
          <Text style={styles.heading}>Buscar usuarios</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    onChangeText={ (text) => {
                      this.setState({username: text})
                      this.handleSubmit()
                    }}
                    placeholder="Ingrese el nombre de usuario"
                    value={this.state.username}
                />
                 {
                  this.state.username === "" ?
                  null :
                    this.state.users.length === 0 ?
                    <Text>No hay resultados para su búsqueda</Text> :
                    <FlatList
                      data={this.state.users}
                      renderItem={({item}) => <Text>{item.username}</Text>}
                    />
                 }
               
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
