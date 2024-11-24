import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { db, auth } from "../firebase/config"; 

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
          .get()
          .then((docs) => {
            let posts = [];
            docs.forEach((doc) => {
              posts.push({ id: doc.id, data: doc.data() }); 
            });
            this.setState({ posts }); 
          })
          .catch((err) => console.log(err));
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
                        </View>
                    )}
                />
                )}
            </View>
        )
    }
};


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
});

export default Home;