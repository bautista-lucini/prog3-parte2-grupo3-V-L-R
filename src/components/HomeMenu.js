import React, { Component } from 'react';

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

    render() {
        return (
                <Tab.Navigator>
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                    }}
                        name="Home"
                        component={Home} />
                   
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="post" size={24} color="black" />
                        ),
                    }}
                        name="NewPost"
                        component={NewPost} />
                    
                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                        ),
                    }}
                        name="Profile"
                        component={Profile} />
                    
                    {/* <Tab.Screen name="Users" component={Users} /> */}
                </Tab.Navigator>
        )
    }
    

}

export default HomeMenu;