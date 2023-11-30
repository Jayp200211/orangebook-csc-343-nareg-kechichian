import React,{useState} from 'react';
import { Text, View, StyleSheet,TextInput, TouchableHighlight, Alert } from 'react-native';
import Constants from 'expo-constants';
import Navigation from './routes/logNavigation'; 

const Logs=()=>{
    return (
            <View style={styles.container}>
                <Navigation/>
            </View>
    )
}
export default Logs;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
    },
})