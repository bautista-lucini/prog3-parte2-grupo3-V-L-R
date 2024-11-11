import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { auth } from '../firebase/config';

import Login from '../screens/Login';
import Register from '../screens/Register';


const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }
    }

    componentDidMount() {
      //hacer
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

}

export default MainNavigation;