import React, { Component } from 'react';
// import db, auth
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        //hacer
    }

    render() {
        return (
            <View>
                <Text>Register page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default Register;