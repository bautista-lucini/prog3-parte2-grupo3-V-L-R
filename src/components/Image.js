import React from "react";
 import { View, Text, Image, StyleSheet} from 'react-native';
 

 export default function Card({ source }) { 
    return (
      <Image style={styles.image}
        source={source} 
        resizeMode="contain"
      />
    );
  }
  
  const styles = StyleSheet.create({
    image: { height: 200, width: 200 }, 
  });