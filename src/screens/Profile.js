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
                this.setState({
                    posts: this.state.posts.filter(post => post.id !== id)
                });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    logout() { 
        auth.signOut();
        this.props.navigation.navigate("Login");
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
            <View style={styles.container}>
                {
                    this.state.cargando ?
                        <Text style={styles.text}>Cargando...</Text> :
                        this.state.posts.length === 0 ?
                            <Text style={styles.text}>No hay posteos</Text> :
                            <FlatList
                                data={this.state.posts}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.postContainer}>
                                            <Text style={styles.postTitle}> {item.titulo} </Text>
                                            <Text style={styles.postDescription}> {item.descripcion}</Text>
                                            <TouchableOpacity 
                                                onPress={() => this.borrarPost(item.id)}
                                                style={styles.Button}
                                            >
                                                <Text style={styles.ButtonText}> Borrar post</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                            />
                }
                    <View style={styles.profileContainer}>
                    <Image 
                        source={require("../../assets/profile-generico.png")} 
                        style={styles.profileImage} 
                    />
                    <View>
                        <Text style={styles.username}> {this.state.username}</Text>
                        <Text style={styles.email}> {this.state.email}</Text>
                    </View>
                </View>
    
                <TouchableOpacity 
                    onPress={() => this.logout()}
                    style={styles.ButtonLogout}
                >
                    <Text style={styles.ButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        padding: 10,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20, 
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#262626",
    },
    email: {
        fontSize: 16,
        color: "#8E8E8E",
        marginTop: 5,
    },
    ButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    Button: {
        backgroundColor: "#0095F6",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    ButtonLogout: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    postContainer: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DBDBDB",
    },
    postTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#262626",
        marginBottom: 5,
    },
    postDescription: {
        fontSize: 14,
        color: "#4F4F4F",
        marginBottom: 10,
    },
    text: {
        textAlign: "center",
        color: "#8E8E8E",
        fontSize: 16,
        marginTop: 20,
    },
});


export default Profile;
