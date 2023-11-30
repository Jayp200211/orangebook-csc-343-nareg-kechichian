import React, { useState,useEffect} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';

import {
  View,
  Text,
  TextInput,
    ActivityIndicator,
Keyboard,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Svg,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import book from  '../assets/pngegg.png';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const barheight = Constants.statusBarHeight;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export const PageTitle = styled.Text`
  font-size: 40px;
  color: white;
  padding-top:50;
`;
export const SubPageTitle = styled.Text`
  font-size: 40px;
  color: white;
  
`;
const LoginScreen = ({navigation}) => {
  const pressHandler = ()=>{
    navigation.navigate('SignUp') 
  }
    const [op,setOp] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false)
    const [eye,setEye] = useState('eye-slash')
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const handleEmailChange = (text) => {
      setEmail(text);
      setEmailError(null); // Clear email error when typing
    };
  
    const handlePasswordChange = (text) => {
      setPassword(text);
      setPasswordError(null); // Clear password error when typing
    }
    const handleIt = () => {
      setEmailError(null);
      setPasswordError(null);
    
      // Check if email is empty
      if (!email) {
        setEmailError('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Validate email format only if it's not empty
        setEmailError('Please enter a valid email address');
      }
    
      // Check if password is empty
      if (!password) {
        setPasswordError('Password is required');
      }
    
      
        if (email && password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      // If inputs are correct and not empty, proceed with Firebase authentication
      setOp(1);
    
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setOp(0);
          navigation.navigate('Pag');
          // You are now signed in, you can also handle additional logic here if needed
        })
        .catch((error) => {
          setOp(0);
          Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Email or password incorrect',
          });
        
        // Display the error message to the user (you can use a state variable for this)
          // For example, assuming you have a state variable called 'firebaseError'
          // setFirebaseError(error.message);
    
          // Handle other authentication errors here
        });
    };
  }

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
     <Svg xmlns="http://www.w3.org/2000/svg" id="visual" version="1.1" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Rect
        x="0"
        y="0"
        width={screenWidth}
        height={screenHeight}
        fill="#8E3200"
      />
      <Defs>
        <LinearGradient id="grad1_0" x1="0%" y1="100%" x2="100%" y2="0%">
          <Stop offset="30%" stopColor="#001220" stopOpacity="1" />
          <Stop offset="70%" stopColor="#001220" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Defs>
        <LinearGradient id="grad2_0" x1="0%" y1="100%" x2="100%" y2="0%">
          <Stop offset="30%" stopColor="#001220" stopOpacity="1" />
          <Stop offset="70%" stopColor="#001220" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G transform={`translate(${screenWidth}, ${screenHeight})`}>
        <Path
          d="M-337.5 0C-335.5 -46.1 -333.5 -92.2 -311.8 -129.2C-290.1 -166.1 -248.8 -193.8 -211.4 -211.4C-174 -229.1 -140.6 -236.6 -106 -255.9C-71.4 -275.2 -35.7 -306.4 0 -337.5L0 0Z"
          fill="#E6E5DE"
        />
      </G>
      <G transform="translate(0, 0)">
        <Path
          d="M337.5 0C297.1 28.8 256.7 57.5 246.7 102.2C236.6 146.8 256.9 207.3 238.6 238.6C220.4 269.9 163.7 272 117.5 283.6C71.3 295.2 35.6 316.4 0 337.5L0 0Z"
          fill="#361500"
        />
      </G>
 
    </Svg>

      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-scrollHeight}
        >
       <View style={styles.container}>

        <PageTitle>Welcome</PageTitle>
        <SubPageTitle>Back</SubPageTitle>
            <View style={{marginTop: 30}}>

         <Text style={styles.subsub}>Email</Text>
         <View style={styles.k}>
           <Icon name="envelope" size={20} color="#FFF" style={{paddingRight: 15}}/>
           <TextInput 
             placeholder='domain@gmail.com'
            placeholderTextColor='#FFF'
            onChangeText={(text) => {
              handleEmailChange(text);
              setEmail(text); // Add this line to preserve existing behavior
            }}            value={email}
             keyboardType='email-address'
             style={styles.input}
           />
           </View>
           <Text style={styles.errorText}>{emailError}</Text>

            <Text style={styles.subsub}>Password</Text>
         <View style={styles.k}>
           <Icon name="lock" size={25} color="#FFF" style={{paddingRight: 15}}/>
           <TextInput
             placeholder='Password'
             secureTextEntry={!showPassword}
             placeholderTextColor='#FFF'
             onChangeText={(text) => {
              handlePasswordChange(text);
              setPassword(text); // Add this line to preserve existing behavior
            }}           
              value={password}
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
</View>
{op === 1 ? (
            // Show ActivityIndicator when op is 1
            <ActivityIndicator size="large" color="orange" />
          ) : (
            // Show TouchableOpacity when op is 0
            <TouchableOpacity style={styles.but} onPress={handleIt}>
              <Text style={styles.butText}>Login</Text>
              <Icon name="arrow-right" color="white" size={25} />
            </TouchableOpacity>
          )}
         <View style={{flexDirection:'row',paddingTop: 80, alignSelf:'center'}}>
           <Text style={{color:'rgb(128,128,128)'}}>Don't have an account? </Text>
           <TouchableOpacity onPress={pressHandler}><Text style={styles.high}>Sign up</Text></TouchableOpacity>
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
    color:'#FFF',
  },
  but: {
    borderRadius: 40,
    backgroundColor: "#C38154",
    height: 45,
    width: '100%',
    marginTop:20,
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
    color: "rgba(246,152,13,255)",
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
export default LoginScreen;