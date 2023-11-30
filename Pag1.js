import React,{useState,Component} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert, Image} from 'react-native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import Notification from './Notification';
import Main from './Main';

const Stack = createStackNavigator();
const Pag=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Main' component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name='Notification' component={Notification}/>
        </Stack.Navigator>
    )
}
export default Pag;