import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity,ScrollView,Modal, TouchableHighlight, ActivityIndicator, TextInput} from 'react-native';
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
    <View style={{paddingTop:18}}>
    <TouchableOpacity onPress={()=>{
      setType('romance');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Romance} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Romance}
        style={styles.img}
        />
        <Text style={styles.txt}>Romance</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('science fiction');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Fiction} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Fiction}
        style={styles.img}
        />
        <Text style={styles.txt}>Science Fiction</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('mystery');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Mystery} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Mystery}
        style={styles.img}
        />
        <Text style={styles.txt}>Mystery/Thriller</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('horror');
      setModalVisible(true);
       }} style={{width:'100%'}}>
    <ImageBackground source={Horror} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Horror}
        style={styles.img}
        />
        <Text style={styles.txt}>Horror</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('fantasy');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Fantasy} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Fantasy}
        style={styles.img}
        />
        <Text style={styles.txt}>Fantasy</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('historical fiction');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={History} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={History}
        style={styles.img}
        />
        <Text style={styles.txt}>Historical Fiction</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('autobiography');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Auto} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Auto}
        style={styles.img}
        />
        <Text style={styles.txt}>Autobiography</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('poetry');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Poetry} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Poetry}
        style={styles.img}
        />
        <Text style={styles.txt}>Poetry</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('comedy');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Comedy} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Comedy}
        style={styles.img}
        />
        <Text style={styles.txt}>Comedy</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
      setType('travel');
      setModalVisible(true);
    }} style={{width:'100%'}}>
    <ImageBackground source={Travel} style={{opacity:1,marginTop:5}}>
      <View style={styles.v}>
        <Image
        source={Travel}
        style={styles.img}
        />
        <Text style={styles.txt}>Travel</Text>
      </View>
      </ImageBackground>
      </TouchableOpacity>
    </View>
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
            <TouchableOpacity 
            style={{borderRadius:30,flexDirection:'row',borderWidth:0.5,borderColor:'#666',padding:5}}  
            onPress={()=>{
            setModalVisible(false);
            navigation.navigate('Search',{book:books})
            }}
            >
              <MaterialIcons name='search' size={30} color='#666'/>
              <TextInput
                placeholder='Name of Book'
                placeholderTextColor='#666'
                style={styles.srch}
              />
            </TouchableOpacity>
          </View>
      <ScrollView>
        {books.map((book) => (
          <TouchableOpacity style={styles.bb} onPress={()=>{
            setModalVisible(false);
            navigation.navigate('Abook',{isbn:book?.selfLink});
          }}>
            <Image
              source={{
                uri:
                  book?.volumeInfo?.imageLinks?.thumbnail ||
                  book?.volumeInfo?.imageLinks?.smallThumbnail ||
                  'https://dummyimage.com/100x100/000/fff',
              }}
              style={{ height: 200, width: 120 }}
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
    backgroundColor: 'white',
    padding: 8,
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
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