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

    borrarPost(id) { 
        db.collection("posts").doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                this.setState({
                    posts: this.state.posts.filter(post => post.id !== id)
                });
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }


    logout() { 
        auth.signOut();
    }


    componentDidMount(){
        db.collection("posts").where("owner", "==", this.state.email).get()
            .then((querySnapshot) => {
                let posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.setState({
                    posts,
                    cargando: false
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        db.collection("users").where("email", "==", this.state.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        username: doc.data().username
                    });
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <View>
                {
                    this.state.cargando ?
                        <Text>Cargando...</Text> :
                        this.state.posts.length === 0 ?
                            <Text>No hay posteos</Text> :
                            <FlatList
                                data={this.state.posts}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Text>{item.titulo}</Text>
                                            <Text>{item.descripcion}</Text>
                                            <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                                                <Text>Borrar post</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                            />
                }
                <Text>{this.state.username}</Text>
                <Text>{this.state.email}</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    };
}



export default Profile;
