import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";

import AntDesign from '@expo/vector-icons/AntDesign';

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


          <View style={styles.searchContainer}>
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

                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.containerIcon}> 
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
                </View>

                 {
                  this.state.username === "" ?
                  null :
                    this.state.users.length === 0 ?
                    <Text>No hay resultados para su búsqueda</Text> :
                    <FlatList
                      data={this.state.users}
                      renderItem={({item}) => (
                        <View style={styles.cardResult}> 
                        <Text style={styles.resultText}>{item.username}</Text>
                        </View>
                         )}
                    />
                 }
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
  heading:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20
  },
  input:{
    flex: 1,
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
  cardResult: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  resultText: {
    fontSize: 18,
    color: "#333",
  },
  containerIcon:{
    marginLeft: 10,
  },
  searchContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "70%",
    alignItems: "center", 
    alignSelf: "center",
  }

});

export default Users;
