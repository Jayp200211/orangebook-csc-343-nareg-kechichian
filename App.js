import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createSwitchNavigator } from '@react-navigation/compat';
import { NavigationContainer } from '@react-navigation/native';
import Logs from './Logs';
import Pag from './Pag1';
import Toast from 'react-native-toast-message';

// const firebaseConfig = {
//   apiKey: "AIzaSyCt63iKcBgVJv2dEGsyCAWA-UJTFVk0bMI",
//   authDomain: "orangebook-73fd0.firebaseapp.com",
//   databaseURL: "https://orangebook-73fd0-default-rtdb.firebaseio.com",
//   projectId: "orangebook-73fd0",
//   storageBucket: "orangebook-73fd0.appspot.com",
//   messagingSenderId: "635386053978",
//   appId: "1:635386053978:web:7dd06ba0034fb09624df63"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDbKdY_QE_LLtbRX5d4zEvmVe8ISB76C8o",
  authDomain: "new-csc343-project.firebaseapp.com",
  databaseURL: "https://new-csc343-project-default-rtdb.firebaseio.com",
  projectId: "new-csc343-project",
  storageBucket: "new-csc343-project.appspot.com",
  messagingSenderId: "916553321553",
  appId: "1:916553321553:web:6959be56c52edd7214bc70"
};

const RootStack = createSwitchNavigator({
  Logs: Logs,
  Pag: Pag,
});

firebase.initializeApp(firebaseConfig);
export default class App extends React.Component{
  componentDidMount=() => {
  firebase.auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'Pag' : 'Logs');

  });
}
render(){
  return (
    <NavigationContainer>
      <RootStack/>
      <Toast />

    </NavigationContainer>

  )}
}

