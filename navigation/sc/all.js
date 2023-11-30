import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, Modal, TouchableHighlight, ImageBackground} from 'react-native';
import Constants from 'expo-constants';
import bookInfo from './file/movieHomeInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const books = bookInfo;

const handleIt = (book, setName, setXname, setImage, setAuthor, setDetails, setModalVisible) => {
  const index = books.indexOf(book);
  setName(books[index].name);
  setXname(books[index].xname);
  setImage(books[index].image);
  setAuthor(books[index].author);
  setDetails(books[index].details);
  setModalVisible(true);
};

const HomeBook = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [xname,setXname]= useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [details, setDetails] = useState('');
  const Show = () =>
    books.map((book, index) => (
      <View>
        <TouchableHighlight onPress={() => handleIt(book, setName, setXname, setImage, setAuthor, setDetails, setModalVisible)}>
          <Image
            source={{ uri: book.image }}
            style={{
              height: 200,
              width: 120,
            }}
            accessibilityLabel={book.name}
          />
        </TouchableHighlight>
        <View style={{width:120,paddingLeft:5}}>
          <Text style={styles.title}>{book.name}</Text>
        </View>
      </View>
    ));

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Show />
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
      <View style={styles.modalContainer}>
        <TouchableHighlight style={styles.back} onPress={() => setModalVisible(false)} underlayColor="#D3D3D3">
              <MaterialIcons name="arrow-back" size={30} color="black" />
            </TouchableHighlight>
       <ScrollView>
       <View style={{ flex: 1 }}>
  <ImageBackground
    source={{ uri: image }}
    style={{
      flex: 1,
      resizeMode: 'repeat',
    }}
    imageStyle={{ opacity: 0.5 }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: image }}
        style={{ height: 200, width: 120 }}
        accessibilityLabel={name}
      />
    </View>
  </ImageBackground>
</View>
            <View style={{padding:10,marginTop:10}}>
            <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:130,alignSelf:'center'}}/>
            <Text style={styles.titleMod}>{xname}</Text>
            <View style={{alignItems:'center'}}>
              <Text>By </Text>
              <Text style={styles.author}>{author}</Text>
            </View>
            </View>
            <View style={{padding:10, backgroundColor:'rgb(240,240,240)',borderRadius:20,}}>
            <Text style={styles.desc}>Description</Text> 
            <Text style={styles.details}>{details}</Text>
            </View>
         </ScrollView>
          </View>
      </Modal>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight,
  },
  modalContainer: {
    padding: 10,
    backgroundColor: 'white',
    flex:1,
  },
  title:{
    fontSize:15,
    fontWeight:'600',
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
    textAlign:'center',
    marginBottom: 10,
  }
})
export default HomeBook;