import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { auth, db } from  "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: auth.currentUser.email,
            posts: null,
            cargando: true
        }
    }

    borrarPost(id) { // aca hacer la funcion de borrar post. 

    }


    logout() { // creo que es signOut()

    }


    componentDidMount(){
        // hacer
    }

    render() {
        return (
            <View>

            </View>
        )
    };
}



export default Profile;
