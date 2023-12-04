import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, Image, View, Modal, TouchableHighlight, ImageBackground} from 'react-native';
import Constants from 'expo-constants';
import bookInfo from './file/movieHomeInfo'
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
        <TouchableHighlight
        onPress={() => handleIt(book, setName, setXname, setImage, setAuthor, setDetails, setModalVisible)}
underlayColor="transparent"
      >
          <Image
            source={{ uri: book.image }}
            style={{
              height: 200,
              width: 120,
            }}
            accessibilityLabel={book.name}
          />
        </TouchableHighlight>
       
      </View>
    ));

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
       <View style={{ flex: 1 ,height:400}}>
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
           
<View style={{
  padding: 10,
  backgroundColor: 'black',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
}}>
              <View style={{padding:10,marginTop:10}}>
            {/* <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:130,alignSelf:'center'}}/> */}
            <Text style={styles.titleMod}>{xname}</Text>
            <View>
              <Text style={styles.author}> By {author}</Text>
            </View>
            </View>
            <Text style={styles.desc}>About the book</Text> 
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
  author:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    paddingTop:10,
    paddingLeft:10,

  },
  details:{
    textAlign:'center',
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
  }
})
export default HomeBook;