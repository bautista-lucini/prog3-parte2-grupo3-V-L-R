import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config"; 
import firebase from 'firebase';


class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        posts: [], 
      };
    }
    componentDidMount() {
        db.collection("posts")
          .orderBy("createdAt", "desc") 
          .onSnapshot((docs) => { 
            let posts = [];
            docs.forEach((doc) => {
              let data = doc.data();
              //Este if lo puse por que la consola se rompia por que decia que no había un array
              if (!data.likes) {
                  data.likes = [];
              }
              posts.push({ id: doc.id, data }); 
            });
            this.setState({ posts }); 
          });
    }

    handleLike(postId, likes) {
        const emailUsuario = auth.currentUser.email;
        if (likes.includes(emailUsuario)) {
            db.collection("posts").doc(postId).update({
                likes: firebase.firestore.FieldValue.arrayRemove(emailUsuario)
            });
        } else {
            db.collection("posts").doc(postId).update({
                likes: firebase.firestore.FieldValue.arrayUnion(emailUsuario)
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.posts.length === 0 ? (
                <Text>No hay posteos </Text>
                ) : (
                    <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <View style={styles.row}>
                                <Image 
                                    source={require("../../assets/profile-generico.png")} 
                                    style={styles.profileImage}
                                />
                                <Text style={styles.user}>{item.data.owner}</Text>
                            </View>
                            <Text style={styles.title}>{item.data.titulo}</Text>
                            <Text style={styles.description}>{item.data.descripcion}</Text>
                            <View style={styles.likeContainer}>
                                <TouchableOpacity onPress={() => this.handleLike(item.id, item.data.likes)}>
                                    <Image 
                                        source={
                                            item.data.likes.includes(auth.currentUser.email) 
                                            ? require("../../assets/like.png") 
                                            : require("../../assets/no-like.png")
                                        }
                                        
                                        style={styles.likeIcon}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.textoLike}>{item.data.likes.length} Me gusta</Text>
                            </View>
                        </View>
                    )}
                />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    post: { 
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: "#ccc", 
        marginBottom: 10
    },
    row: {
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 5
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    user: { 
        fontWeight: "bold", 
        fontSize: 16, 
    },
    title: { 
        fontSize: 14, 
        color: "#333", 
        marginVertical: 5
    },
    description: { 
        fontSize: 12, 
        color: "#666" 
    },
    likeContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 10
    },
    likeIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    textoLike: {
        fontSize: 14,
        color: "#666",
    }
});

export default Home;