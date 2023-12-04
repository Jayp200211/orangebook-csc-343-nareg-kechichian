import React, { useState, useEffect } from "react";
import styled from 'styled-components/native';
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

import {
  Svg,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import { SafeAreaView } from "react-native-safe-area-context";
const barheight = Constants.statusBarHeight;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const PageTitle = styled.Text`
  font-size: 40px;
  color: white;
  padding-left:15px;
`;
export const SubPageTitle = styled.Text`
  font-size: 40px;
  color: white;
  padding-left:15px;

`;
const SignUp = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate("LoginScreen");
  };
  const [name, setName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [op, setOp] = useState(0);
  const [showPassword,setShowPassword] = useState(false)
  const [eye,setEye] = useState('eye-slash')
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [LnameError, setLNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const isEmailValid = (email) => {
    // Simple email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleNameChange = (text) => {
    setName(text);
    setNameError(null);
  }
  const handleLNameChange = (text) => {
    setLName(text);
    setLNameError(null);
  }
  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(null); // Clear email error when typing
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(null); // Clear password error when typing
  }
  const handleConfirmPasswordChange = (text) => {
    setConfirm(text);
    setConfirmError(null); // Clear confirm password error when typing
  }
  const handleIt = async () => {

    // Resetting previous errors
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setLNameError(null);
setConfirmError(null);
    // Validation
    if (!name ||!Lname|| !email || !password || !confirm || password !== confirm ||!isEmailValid(email)) {
      if(!name) setNameError("First Name is required");
      if(!Lname) setLNameError("Last Name is required");
      if (!email) setEmailError("Email is required");
     if (!isEmailValid(email)) setEmailError("Invalid email format");
      if (!password) setPasswordError("Password is required");
      if (!confirm) setConfirmError("Please confirm your password");
      if (password !== confirm) setConfirmError("Passwords do not match");
      setOp(0); // Set loading spinner back to hidden
      return;
    }
    setOp(1); // Set loading spinner to visible

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;
    
    if (uid) {
      // Update this part to push both first and last names
      const namesRef = firebase.database().ref(`users/${uid}/Names`);
      await namesRef.set({
        firstName: name,
        lastName: Lname,
      });
      navigation.navigate("Pag");
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      text2: error.message,
    });
  } finally {
    // Set op back to 1 after Firebase authentication
    setOp(0);
  }
     
  };
  const [scrollHeight, setScrollHeight] = useState(screenHeight);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        setScrollHeight(screenHeight - endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setScrollHeight(screenHeight);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [screenHeight]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
<ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
   <Svg xmlns="http://www.w3.org/2000/svg" id="visual" version="1.1" width={screenWidth}
        height={screenHeight + 200} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Rect x="0" y="0"  width={screenWidth}
        height={screenHeight + 200} fill="#8E3200" />
    
      <Defs>
        
      </Defs>
      <G transform="translate(450, 0)">
        <Path
          d="M0 382.5C-63.3 366.9 -126.5 351.2 -185.5 321.3C-244.5 291.4 -299.1 247.2 -331.3 191.3C-363.4 135.3 -372.9 67.7 -382.5 0L0 0Z"
          fill="#E1BB80"/>
      </G>
      <G transform="translate(0, 900)">
        <Path
          d="M0 -382.5C68.6 -373.5 137.2 -364.4 191.2 -331.3C245.3 -298.1 284.9 -240.7 314.4 -181.5C343.8 -122.3 363.2 -61.1 382.5 0L0 0Z"
          fill="#361500"/>
      </G>
      </Svg>

    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-scrollHeight}
        >
       <View style={styles.container}>

      {/* <View style={{opacity : op}}><ActivityIndicator size="large" color="orange" /></View> */}
      <PageTitle>Create</PageTitle>
      <SubPageTitle>Account</SubPageTitle>

    <View style={{marginTop: 30}}>
    <Text style={styles.subsub}>First name</Text>
        <View style={styles.k}>
            <Icon name="user" size={25} color="#FFF" style={{paddingRight: 15}}/>
            <TextInput
                placeholder='John'
                placeholderTextColor='#FFF'
                onChangeText={(text)=>{setName(text);
                handleNameChange(text)}}
                value={name}
                style={styles.input}
            />
        </View>
        <Text style={styles.errorText}>{nameError}</Text>
        <Text style={styles.subsub}>Last name</Text>
        <View style={styles.k}>
            <Icon name="user" size={25} color="#FFF" style={{paddingRight: 15}}/>
            <TextInput
                placeholder='Doe'
                placeholderTextColor='#FFF'
                onChangeText={(text)=>{
                  setLName(text);  // <-- Fix: setlName instead of setName
                  handleLNameChange(text)}}
                value={Lname}
                style={styles.input}
            />
        </View>
        <Text style={styles.errorText}>{LnameError}</Text>

        <Text style={styles.subsub}>Email</Text>
    <View style={styles.k}>
      <Icon name="envelope" size={25} color="#FFF" style={{paddingRight: 15}}/>
      <TextInput
        placeholder='JohnDoe@gmail.com'
        placeholderTextColor='#FFF'
        onChangeText={(text) => {
              handleEmailChange(text);
              setEmail(text); // Add this line to preserve existing behavior
            }}    
        value={email}
        keyboardType='email-address'
        style={styles.input}
      />

    </View>
    <Text style={styles.errorText}>{emailError}</Text>

    <Text style={styles.subsub}>Password</Text>
    <View style={styles.k}>
        <Icon name="lock" size={25} color="#FFF" style={{paddingRight: 15}}/>
        <TextInput
            placeholder='******'
            secureTextEntry={!showPassword}

            placeholderTextColor='#FFF'
            onChangeText={(text)=>{
              handlePasswordChange(text);
              setPassword(text)}}
            value={password}
            id='password'
            style={styles.input}
        />
        <Icon name={eye} size={25} color="#FFF" style={{justifyContent:'flex-end'}} onPress={()=>{
             setShowPassword(!showPassword)
             if(!showPassword){
               setEye('eye')
             }
             else{
               setEye('eye-slash')
             }
           }}/>
    </View>

    <Text style={styles.errorText}>{passwordError}</Text>

    <Text style={styles.subsub}>Confirm Password</Text>
        <View style={styles.k}>
        <Icon name="lock" size={25} color="#FFF" style={{paddingRight: 15}}/>
        <TextInput
            placeholder='******'
            secureTextEntry
            placeholderTextColor='white'
            onChangeText={(text)=>{setConfirm(text);
              handleConfirmPasswordChange(text);
            }}
            value={confirm}
            id='confirm'
            style={styles.input}
        />
        </View>
        <Text style={styles.errorText}>{confirmError}</Text>

        </View>
        {op === 1 ? (
            // Show ActivityIndicator when op is 1
            <ActivityIndicator size="large" color="orange" />
          ) : (
            // Show TouchableOpacity when op is 0
            <TouchableOpacity style={styles.but} onPress={handleIt}>
              <Text style={styles.butText}>Sign Up</Text>
              <Icon name="arrow-right" color="white" size={25} />
            </TouchableOpacity>
          )}

    <View style={{flexDirection:'row',paddingTop: 40, alignSelf:'center'}}>
      <Text style={{color:'rgb(128,128,128)'}}>Already have an account? </Text>
      <TouchableOpacity onPress={pressHandler}>
        <Text style={styles.high}>Sign in</Text>
        </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>

    </ScrollView>
  </SafeAreaView>
  
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
  sub: {
    fontSize: 20,
    color: "white",
  },
 subsub:{   
    paddingBottom:5,
    fontSize: 17,
    letterSpacing:1,
    color:'#F2ECBE',
  },
  but: {
    borderRadius: 40,
    backgroundColor: "#C38154",
    height: 45,
    width: '100%',
    alignSelf: "flex-end",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  butText: {
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 20,
    marginRight: 5,
  },
  high: {
    color: "#C38154",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "white",
  },
  k: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ecf0f1",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    shadowColor: "rgb(128,128,128)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontWeight:'bold',
    marginTop: -10,
    marginBottom: 5,
  },

});
export default SignUp;
