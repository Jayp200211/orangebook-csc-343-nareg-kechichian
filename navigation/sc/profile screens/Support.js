import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Pressable,Image } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { Ionicons } from '@expo/vector-icons'; // Import the necessary icon from react-native-vector-icons
import SupportImg from '../pictures/support.png'
const Support = () => {
  const [reviewText, setReviewText] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const emailDetails = {
    recipients: ['nakhouljp@gmail.com'],
    subject: 'Review App or Question',
    body: reviewText,
    isHtml: false,
    attachments: [],
  };

  const handleIt = () => {
    setReviewText('');
    MailComposer.composeAsync(emailDetails)
      .then((result) => {
        setIsEmailSent(true);
        setModalVisible(true);
      })
      .catch((error) => {
        alert('Error sending email', error);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsEmailSent(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={{ color: '#1DB954', fontSize: 25, alignSelf: 'center', fontWeight: '600', marginBottom: 20, marginTop: 20 }}>
            Message:
          </Text>
          <TextInput
            placeholder="Please tell us some details about this app, and we will keep working hard to improve your experience"
            placeholderTextColor="#666"
            style={styles.input}
            value={reviewText}
            onChangeText={setReviewText}
            multiline={true}
            numberOfLines={5}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.but} onPress={handleIt} disabled={!reviewText || isEmailSent}>
            {isEmailSent ? (
              <Ionicons name="md-checkmark-circle" size={30} color="#FFF" /> // Success icon
            ) : (
              <Text style={styles.butText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Modal for success message */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#FFF', height: 380, width: 320, alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',borderRadius:20, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
      <Image source={SupportImg} style={styles.image} />
            <Text style={styles.modalText}>Thank you!</Text>
            <Text style={{color:'grey'}}>Your message has been sent</Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
          
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  input: {
    height: 250,
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 5,
    marginBottom: 20,
    padding: 20,
    textAlignVertical: 'top',
  },
  but: {
    borderRadius: 50,
    backgroundColor: '#1DB954',
    height: 50,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  butText: {
    color: 'white',
    fontWeight: '800',
    alignSelf: 'center',
    fontSize: 20,
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalText: {
    color: 'black',
    fontSize: 38,
    letterSpacing: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#1DB954',
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center', // Align content vertically
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  
  closeButtonText: {
    color: 'white',
    letterSpacing:2,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Support;
