import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, ImageBackground, TouchableOpacity, Linking, ActivityIndicator, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Toast from 'react-native-toast-message';

const Bbooks = ({ route, navigation }) => {
  const [bookMark, setBookMark] = useState(false);
  const [ic, setIc] = useState('bookmark');
  const { isbn } = route.params;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch the book details
    fetch(isbn)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.error('Error fetching book data:', error);
      });

    // Check if the book is bookmarked
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const namesRef = firebase.database().ref(`users/${uid}/Book`);

      namesRef
        .orderByValue()
        .equalTo(isbn)
        .once('value')
        .then((snapshot) => {
          const isBookmarked = snapshot.exists();
          setBookMark(isBookmarked);
          setIc(isBookmarked ? 'bookmark' : 'bookmark-border');
        })
        .catch((error) => {
          console.error('Error checking bookmark status:', error);
        });
    }
  }, [isbn]);

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

  const handleBookMark = () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      console.error('No current user');
      return;
    }
    const uid = currentUser.uid;
    const namesRef = firebase.database().ref(`users/${uid}/Book`);
    if (!bookMark) {
      namesRef.push(isbn);
    } else {
      namesRef
        .orderByValue()
        .equalTo(isbn)
        .once('value')
        .then((snapshot) => {
          const key = Object.keys(snapshot.val())[0];
          namesRef.child(key).remove();
        });
    }
    setBookMark(!bookMark);
    setIc((prevState) => (prevState === 'bookmark' ? 'bookmark-border' : 'bookmark'));
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
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
                  <Icon name={ic} color='#FFF' size={40} />
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  titleMod: {
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 10,
    color: '#1DB954',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    paddingTop: 10,
    paddingLeft: 10,
  },
  details: {
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  desc: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 20,
    color: '#1DB954',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  rightButton: {
    backgroundColor: '#1DB954',
    width: '55%',
    height: 50,
    padding: 10,
    borderTopLeftRadius: 10,
    bottom: -20,
    right: -30,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Bbooks;
