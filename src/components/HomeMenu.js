import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { auth } from '../firebase/config';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Home from "../screens/Home";
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Users from '../screens/Users';

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(usr => {
            if (!usr) {
                this.props.navigation.navigate("Login")
            }
        })
    }

    mostrarHeader = (title) => (
        <View style={styles.header}>
            <Image
                source={require("../../assets/logo2.png")}
                style={styles.logo}
            />
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );

    HomeMensaje = () => (
        <View style={styles.container}>
            {this.mostrarHeader("Las publicaciones más recientes")}
            <Home />
        </View>
    );

    SearchMensaje = () => (
        <View style={styles.container}>
            {this.mostrarHeader("Busca a tus amigos")}
            <Users />
        </View>
    );

    NewPostMensaje = () => (
        <View style={styles.container}>
            {this.mostrarHeader("Crea tus posteos, para que tus amigos te den like")}
            <NewPost />
        </View>
    );

    ProfileMensaje = () => (
        <View style={styles.container}>
            {this.mostrarHeader("Tu perfil")}
            <Profile />
        </View>
    );




    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                    }}
                    name="Home"
                    component={this.HomeMensaje}
                />

                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <AntDesign name="search1" size={24} color="black" />
                        ),
                    }}
                    name="Users"
                    component={this.SearchMensaje}
                />

                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="post" size={24} color="black" />
                        ),
                    }}
                    name="NewPost"
                    component={this.NewPostMensaje}
                />

                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                        ),
                    }}
                    name="Profile"
                    component={this.ProfileMensaje}
                />

            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 90,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    logo: {
        width: 110,
        height: 85,
        resizeMode: "contain",
    },
    headerText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#4A4A4A",
        marginLeft: 20,
    },
});



export default HomeMenu;