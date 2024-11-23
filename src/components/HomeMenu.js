import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from '../firebase/config';

import Home from "../screens/Home";
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';

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
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="NewPost" component={NewPost} />
                    <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
        )
    }
}


export default HomeMenu;