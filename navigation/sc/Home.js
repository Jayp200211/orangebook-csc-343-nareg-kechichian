import React,{useState,useEffect,useContext} from 'react';
import { Text, ScrollView, StyleSheet, View ,TouchableOpacity,Image,ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

function PromotionBanner(){

}

const Home = ({navigation}) => {
  
  return (

 <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/bookshop-concept-illustration_114360-2694.jpg?w=1060&t=st=1701255196~exp=1701255796~hmac=1cb5235cc075797d7b4535913a67d5500910b655352316fe31e22f891eba581d',
        }}
        style={styles.image}
      />
  );
};

const styles = StyleSheet.create({

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // Additional styling for your image if needed
  },
});

export default Home;