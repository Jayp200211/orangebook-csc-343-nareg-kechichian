import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, Modal, TouchableHighlight, ImageBackground, TouchableOpacity, TextInput, Linking,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Toast from 'react-native-toast-message';

const Books = ({ route, navigation }) => {
  const { isbn } = route.params || {};
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [bookMark, setBookMark] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isbn) {
          const response = await fetch(isbn);
          const data = await response.json();
          setBook(data);
          setLoading(false);
        } else {
          console.error('ISBN is undefined');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isbn]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error("No current user");
      return;
    }

    const uid = currentUser.uid;
    const namesRef = firebase.database().ref(`users/${uid}/Book`);

    // Check if the book is already bookmarked
    namesRef
      .orderByValue()
      .equalTo(isbn)
      .once("value")
      .then((snapshot) => {
        const isBookmarked = snapshot.exists(); // Check if the snapshot has any data
        setBookMark(isBookmarked);
      })
      .catch((error) => {
        console.error('Error checking bookmark:', error);
      });
  }, [isbn]);

  const handleBookMark = () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error("No current user");
      return;
    }

    const uid = currentUser.uid;
    const namesRef = firebase.database().ref(`users/${uid}/Book`);

    if (!bookMark) {
      namesRef.push(isbn);
      setBookMark(true);
      Toast.show({
        type: 'success',
        text1: 'Bookmarked!',
        text2: 'The book has been bookmarked.',
      });
    } else {
      namesRef
        .orderByValue()
        .equalTo(isbn)
        .once("value")
        .then((snapshot) => {
          const key = Object.keys(snapshot.val())[0];
          namesRef.child(key).remove();
          setBookMark(false);
          Toast.show({
            type: 'success',
            text1: 'Bookmark Removed',
            text2: 'The bookmark has been removed.',
          });
        })
        .catch((error) => {
          console.error('Error removing bookmark:', error);
        });
    }
  };

  const Read = () => {
    const downloadLink = book?.volumeInfo?.accessInfo?.pdf?.downloadLink;
    if (!downloadLink) {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: 'the download link is not available.',
      });
    } else {
      Linking.openURL(downloadLink);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, height: 400, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <ImageBackground
            source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail }}
            style={{
              flex: 1,
              resizeMode: 'repeat',
              width: 300,
            }}
            imageStyle={{ opacity: 0.5 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail }}
                style={{ height: 250, width: 170, borderRadius: 20 }}
              />
            </View>
          </ImageBackground>
        </View>

        <View style={{
          padding: 10,
          backgroundColor: 'black',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
          <View style={{ padding: 10, marginTop: 10 }}>

            <Text style={styles.titleMod}>{`${book?.volumeInfo?.title}`}</Text>

            <View>
              <View style={styles.authorContainer}>

                <Text style={styles.author}> By {`${book?.volumeInfo?.authors}`}</Text>
                <TouchableHighlight onPress={handleBookMark} style={{ marginRight: '10%' }} >
                  <Icon name={bookMark ? 'bookmark' : 'bookmark-border'} color='#FFF' size={40} />
                </TouchableHighlight>
              </View>

            </View>
          </View>
          <Text style={styles.desc}>About the book</Text>
          <Text style={styles.details}>
            {showFullDescription
              ? `${book?.volumeInfo?.description}`
              : `${book?.volumeInfo?.description?.slice(0, 150)}...`}
          </Text>
          {book?.volumeInfo?.description?.length > 150 && (
            <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
              <Text style={{ color: '#1DB954', textAlign: 'center', marginTop: 10 }}>
                {showFullDescription ? 'View Less' : 'View More'}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.rightButton} onPress={Read}>
              <Text style={styles.buttonText}>Read </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    paddingTop: 8,
  },

  modalContainer: {
    paddingTop: 10,
    paddingBottom:40,
    backgroundColor: 'white',
  },
  title:{
    fontSize:15,
    fontWeight:'600',
  },
  titleMod:{
    fontSize: 24,
    fontWeight: '700',
    paddingLeft:10,
    color: '#1DB954',
  },
   noElevation: {
    elevation: 0,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between',
  },
  author:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    paddingTop:10,
    paddingLeft:10,

  },
  details:{
    paddingLeft:20,
    fontSize: 16,
    lineHeight:24,
    color: 'white',
  },
  back:{
    borderRadius:30,
    padding:5,
    justifyContent:'flex-start',
    alignItems:"flex-start",
    width:40,
  },
  desc:{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop:20,
    paddingLeft:20,
    color:'#1DB954',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align the single button to the right
    paddingHorizontal: 20, // Adjust the padding as needed
    marginBottom: 10, // Adjust the margin as needed
   
  },
  leftButton: {

    backgroundColor: '#1DB954',
    width:'40%',
    height:50,
    padding: 10,
borderTopRightRadius:10,
    bottom: -10, // Position it at the bottom
    left: -10, // Align to the left
    right: 0, // Align to the right  },
  },

  rightButton: {

    backgroundColor: '#1DB954',
    width:'55%',
    height:50,
    padding: 10,
borderTopLeftRadius:10,
    bottom: -20, // Position it at the bottom
    right: -30, // Align to the left
  },


  buttonText: {
    fontSize: 18,
    textAlign: 'center', // Align text in the middle
    color: 'white',
    fontWeight: 'bold',
  },
})
export default Books;