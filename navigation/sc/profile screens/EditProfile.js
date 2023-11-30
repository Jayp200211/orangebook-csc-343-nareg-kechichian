import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Svg, { Path, Rect, G } from "react-native-svg";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
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
  
  useEffect(() => {
    // Assuming you have Firebase initialized in your app
    const user = firebase.auth().currentUser;
    if (user) {
      setEmail(user.email || '');
    }
  }, []);

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    const namesRef = firebase.database().ref(`users/${uid}/Names`);

    namesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Assuming your data structure has properties for firstName and lastName
        const { firstName, lastName } = data;
        setFirstName(firstName || '');
        setLastName(lastName || '');
      }
    });

    return () => {
      namesRef.off();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const saveChanges = async () => {
    try {
      // Check if any of the required fields is empty
      if (!firstName || !lastName || !email) {
        console.log("Please fill in all the required fields");
        return;
      }

      const user = firebase.auth().currentUser;
      const uid = user.uid;

      // Update the display name with the first name and last name
      const displayName = `${firstName} ${lastName}`;
      await user.updateProfile({
        displayName: displayName,
      });

      console.log("User profile updated successfully!");

      // Update the user info in the database under the user's UID
      const namesRef = firebase.database().ref(`users/${uid}/Names`);
      await namesRef.update({
        firstName: firstName,
        lastName: lastName,
      });

      console.log("User info in the database updated successfully!");

      console.log("All updates completed successfully!");
    } catch (error) {
      console.error("Error updating user information: ", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
<View style={styles.header}>
        <Text style={styles.headerText}>Edit Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Icon name="times" size={30} color="black" />
        </TouchableOpacity>
        </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
         <Svg xmlns="http://www.w3.org/2000/svg"  width={screenWidth}
        height={screenHeight} version="1.1"
       style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
      >
        <Rect x="0" y="0" width={screenWidth}
        height={screenHeight} fill="#E6E5DE" />
        <G transform="translate(400.5418090243755 800.9497294276979)">
          <Path d="M312.4 -238.9C403.8 -134.5 476.1 -4.7 446.7 93.1C417.4 191 286.4 256.8 165.7 296.6C45.1 336.4 -65.1 350.2 -172.2 315C-279.3 279.7 -383.4 195.5 -400 98.3C-416.6 1.1 -345.7 -109 -264.5 -211.1C-183.2 -313.1 -91.6 -407.1 9.4 -414.6C110.5 -422.1 221 -343.2 312.4 -238.9" fill="#8E3200" />
        </G>
      </Svg>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-scrollHeight}
        >
          {/* <Text>fef</Text> */}
          <View style={styles.container}>
          <Text style={{color:"#777777", marginLeft: 5,marginTop:-30,marginBottom:20}}>Provide details about yourself and any other pertinent information</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                right={<TextInput.Affix />}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                right={<TextInput.Affix />}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                right={<TextInput.Affix />}
              />
            </View>

            <TouchableOpacity style={styles.but} onPress={saveChanges}>
              <Text style={styles.butText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  header: {
    backgroundColor:"#E6E5DE",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 4,
},
headerText: {
  color: "black",
  fontSize: 25,
  marginLeft:20,
  fontWeight: "bold",
},
closeButton: {
  padding: 10,
  fontSize:25,
  color:"black",
 marginRight:20,

},
  inputContainer: {
    width: '90%', // You can adjust the width to make the input smaller or larger
    alignSelf: 'center', // Center the input horizontally
    paddingBottom: 30,
  },
  input: {
    fontSize: 16,
    borderColor: 'gray',
    borderRadius: 6,
  },
  but: {
    borderRadius: 5,
    backgroundColor: "#C38154",
    height: 45,
    width: '90%',
    marginTop: 20,
    alignSelf: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  butText: {
    color: "white",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 16,
    marginRight: 5,
  },
});

export default EditProfile;
