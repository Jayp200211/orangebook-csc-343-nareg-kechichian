import React, { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, Modal, TouchableHighlight, ImageBackground, TouchableOpacity, TextInput, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const Books=({ route, navigation })=>{
    const [bookMark,setBookMark] = useState(false)
    const [ic,setIc] = useState('bookmark-border')
    const {isbn} = route.params;
    const [book,setBook] = useState([])
    useEffect(() => {
      fetch(isbn)
        .then((response) => response.json())
        .then((data) => {
          setBook(data);
        });
    }, []); 
    const handleBookMark = () => {
      setBookMark(!bookMark);
      setIc((prevState) => (prevState === "bookmark-border" ? "bookmark" : "bookmark-border"));
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.error("No current user");
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
          .once("value")
          .then((snapshot) => {
            const key = Object.keys(snapshot.val())[0];
            namesRef.child(key).remove();
          });
      }
    }; 
    const Read = () => {
      const downloadLink = book?.volumeInfo?.accessInfo?.pdf?.downloadLink;
      if (!downloadLink) {
        alert("Sorry, the download link is not available.");
      } else {
        Linking.openURL(downloadLink);
      }
    }    
    return(
      <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
<ImageBackground
source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail ||
  book?.volumeInfo?.imageLinks?.smallThumbnail }}
style={{
  flex: 1,
  resizeMode: 'repeat',
}}
imageStyle={{ opacity: 0.5 }}>
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Image
    source={{ uri: book?.volumeInfo?.imageLinks?.thumbnail ||
      book?.volumeInfo?.imageLinks?.smallThumbnail}}
    style={{ height: 200, width: 120 }}
  />
</View>
</ImageBackground>
</View>
        <View style={{padding:10,marginTop:10}}>
        <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:130,alignSelf:'center'}}/>
        <Text style={styles.titleMod}>{`${book?.volumeInfo?.title}`}</Text>
        <View style={{alignItems:'center'}}>
          <Text>By </Text>
          <Text style={styles.author}>{`${book?.volumeInfo?.authors}`}</Text>
        </View>
        <View>
          <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:200,alignSelf:'center'}}/>
          <View style={{flexDirection:'row',padding:10,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={styles.but} onPress={Read}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.butText}>READ</Text>
            <Icon name='menu-book' color="white" size={30}/>
            </View>
          </TouchableOpacity>
          <TouchableHighlight onPress={handleBookMark} underlayColor="white">
            <Icon name={ic} color='#666' size={40}/>
          </TouchableHighlight>
          </View>
        </View>
        </View>
        <View style={{padding:10, backgroundColor:'rgb(240,240,240)',borderRadius:20,}}>
          <Text style={styles.desc}>Description</Text> 
          <Text style={styles.details}>{`${book?.volumeInfo?.description}`}</Text>
        </View>
    </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        padding: 8,
    },
   titleMod:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:'center',
      },
    author:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'orange',
        textAlign:'center',
      },
    details:{
        textAlign:'center',
        fontSize: 18,
      },
    desc:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom: 10,
      },
      but:{
        borderRadius: 50,
        backgroundColor: 'rgba(246,152,13,255)',
        height: 50,
        width: 125,
        alignSelf:'flex-end',
        textAlign:'center',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
      butText:{
        color:'white',
        fontWeight:'600',
        alignSelf:'center',
        fontSize:20,
        marginRight: 5,
      },
})
export default Books;