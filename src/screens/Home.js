import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native";
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
                <Text>No hay posteos disponibles</Text>

                ) : (

                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.user}>{item.data.owner}</Text>
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
    container: { flex: 1, padding: 20 },
    post: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    user: { fontWeight: "bold", fontSize: 16,},
    title: { fontSize: 14, color: "#333" },
    description: { fontSize: 12, color: "#666" },
  });


export default Home;