import React, { useState, useEffect } from 'react';
import {  View, StyleSheet, Image, ImageBackground, TouchableOpacity,ScrollView,Modal, TouchableHighlight, ActivityIndicator, TextInput} from 'react-native';
import Romance from './pictures/romance.jpg';
import Fiction from './pictures/fiction.jpg';
import Mystery from './pictures/mystery.jpg';
import Horror from './pictures/horror.jpg';
import Fantasy from './pictures/fantasy.jpg';
import History from './pictures/history.jpg';
import Auto from './pictures/autobiography.jpg';
import Poetry from './pictures/poetry.jpg';
import Comedy from './pictures/comedy.jpg';
import Travel from './pictures/travel.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const Library=({navigation})=>{
  const [loading, setLoading] = useState(true);
  const [type,setType] = useState('')
  const [books,setBooks] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setLoading(true)
    fetch(
      'https://www.googleapis.com/books/v1/volumes?q=subject:'+type+'&startIndex=0&maxResults=40'
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setBooks(data.items);
      });
  }, [type]);
  return(
    <View style={styles.container}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <TouchableOpacity
      onPress={() => {
        setType('romance');
        setModalVisible(true);
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginRight: 20, backgroundColor: 'rgba(255, 182, 193, 1)' }}>
        <Card.Cover
          source={Romance}
          resizeMode="cover"
          style={{ opacity: 0.7 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 182, 193, 0.4)' }}>
          <Text style={{ color: 'white',fontWeight:'bold', fontSize: 16 }}>Romance</Text>
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        setType('science fiction');
        setModalVisible(true);
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={{
            uri: 'https://th.bing.com/th/id/OIG.UCABG6FYxrr3lnq7dVvd?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn'
          }}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(0, 0, 255, 0.3)' }}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Science Fiction</Text>
        </View>
      </View>
    </TouchableOpacity>

    {/* Repeat the same structure for other TouchableOpacity components */}

    <TouchableOpacity
      onPress={() => {
        setType('horror');
        setModalVisible(true);
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Horror}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Horror</Text>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{
      setType('fantasy');
      setModalVisible(true);
    }}>
 <View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Fantasy}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'rgba(204, 204, 255, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Fantasy</Text>
        </View>
      </View>

    </TouchableOpacity>
  
    <TouchableOpacity onPress={()=>{
      setType('historical fiction');
      setModalVisible(true);
    }}>

<View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={History}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'rgba(255, 0, 0, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Historical Fiction</Text>
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{
      setType('autobiography');
      setModalVisible(true);
    }}>
<View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Auto}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'rgba(245, 245, 220, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Autobiography</Text>
        </View>
      </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{
      setType('poetry');
      setModalVisible(true);
    }} >
<View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Poetry}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: 'rgba(200, 162, 200, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Poetry</Text>
        </View>
      </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{
      setType('comedy');
      setModalVisible(true);
    }} >
<View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Comedy}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '(255, 255, 0, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Comedy</Text>
        </View>
      </View>


    </TouchableOpacity>

    <TouchableOpacity onPress={()=>{
      setType('travel');
      setModalVisible(true);
    }}>
<View style={{ overflow: 'hidden', borderRadius: 24, width: 120, height: 120, marginLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card.Cover
          source={Travel}
          resizeMode="cover"
          style={{ opacity: 0.3 }} // Adjust the opacity as needed
        />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '(0, 128, 128, 0.3)'}}>
          <Text style={{ color: 'white', fontSize: 16 ,fontWeight:'bold'}}>Travel</Text>
        </View>
      </View>

    </TouchableOpacity>
  </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        style={styles.container}
      >
      {loading ? (
      <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
       <TouchableHighlight style={styles.back} onPress={() => {
        setModalVisible(false)
        setLoading(true)
      }} underlayColor="#D3D3D3">
              <MaterialIcons name="arrow-back" size={30} color="black" />
            </TouchableHighlight>
            <Text style={{fontSize:18,fontWeight:'bold',marginLeft:10,}}>{type.toUpperCase()}</Text>
          </View>
          <Text style={{color:'orange',fontSize:15}}>Loading {type}...</Text>
        <ActivityIndicator size="large" color="orange" />
      </View>
    ) : (
    <View style={styles.container}>
      <View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
       <TouchableHighlight style={styles.back} onPress={() => {
        setModalVisible(false)
        setLoading(true)
      }} underlayColor="#D3D3D3">
              <MaterialIcons name="arrow-back" size={30} color="black" />
            </TouchableHighlight>
            <Text style={{fontSize:18,fontWeight:'bold',marginLeft:10,}}>{type.toUpperCase()}</Text>
            </View>
           
          </View>
      <ScrollView>
        {books.map((book) => (
          <TouchableOpacity style={styles.bb} onPress={()=>{
            setModalVisible(false);
            navigation.navigate('Book Info',{isbn:book?.selfLink});
          }}>
            <Image
              source={{
                uri:
                  book?.volumeInfo?.imageLinks?.thumbnail ||
                  book?.volumeInfo?.imageLinks?.smallThumbnail ||
                  'https://dummyimage.com/100x100/000/fff',
              }}
              style={{ height: 150, width: 120,borderRadius: 10 }}
            />
            <View>
              <View style={{ width: 220 }}>
                <Text style={styles.title}>{`${book.volumeInfo.title}`}</Text>
              </View>
              <View style={{ width: 220 }}>
                <Text style={styles.author}>{`${book.volumeInfo.authors}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>)}
      </Modal>
    </View>
  );

}                                   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 8,
    marginTop:10,
  },
  img:{
    height:45,
    width:45,
    margin:5,
    borderRadius:30,
  },
  txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    paddingLeft:30
  },
  v:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
  },
  bb: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  author: {
    textAlign: 'center',
    padding: 5,
    color: '#666',
    fontStyle:'italic'
  },
  back:{
    borderRadius:30,
    padding:5,
    justifyContent:'flex-start',
    alignItems:"flex-start",
    width:40,
  },
  srch:{
    borderRadius:30,
    flex:1,
    fontSize:16,
  },
});
export default Library;