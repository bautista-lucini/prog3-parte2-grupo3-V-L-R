import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/native-stack';

import { auth } from '../firebase/config';

import Home from "../screens/Home";

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
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }

}

export default HomeMenu;