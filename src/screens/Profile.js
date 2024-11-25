import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: auth.currentUser.email,
            posts: [],
            cargando: true,
        };
    }

    componentDidMount() {
        db.collection("posts")
            .where("owner", "==", this.state.email)
            .onSnapshot((querySnapshot) => {
                let posts = [];
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    if (!data.likes) {
                        data.likes = []; 
                    }
                    posts.push({
                        id: doc.id,
                        data,
                    });
                });
                this.setState({
                    posts,
                    cargando: false,
                });
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

    render() {
        return (
            <View style={styles.container}>
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

                {this.state.cargando ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : this.state.posts.length === 0 ? (
                    <Text style={styles.text}>No hay posteos</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>
                                <Text style={styles.postTitle}>{item.data.titulo}</Text>
                                <Text style={styles.postDescription}>{item.data.descripcion}</Text>
                                <Text style={styles.likeText}>{item.data.likes.length} Me gusta</Text>
                                <TouchableOpacity
                                    onPress={() => this.borrarPost(item.id)}
                                    style={styles.Button}
                                >
                                    <Text style={styles.ButtonText}> Borrar post</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        );
    }
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
        marginTop: 10,
    },
    ButtonLogout: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 20,
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
    likeText: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    text: {
        textAlign: "center",
        color: "#8E8E8E",
        fontSize: 16,
        marginTop: 20,
    },
});

export default Profile;
