import React from "react";
 import { View, Text, Image } from 'react-native';

  //tengo que seguir firma bauti
 function Card() {
    return <Image style={styles.image}
                  source={{uri:'https://reactnative.dev/img/photo.png'}}
                  resizeMode='contain'/>
  }
  
  const styles = StyleSheet.create({
     image: {
      height: 400,
    },
  }) 
