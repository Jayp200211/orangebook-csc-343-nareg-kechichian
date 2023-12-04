import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet,View,TouchableOpacity,Image,Modal,TouchableHighlight,ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Avatar, Button, Card, Text } from 'react-native-paper';
import BookList from './all'
import Library from './Library';
import topbook from './file/TopBookOfTheDay'

const Home = ({ navigation }) => {
  const Sup=()=>{
    navigation.navigate('Profile', { screen: 'Support' });
  }
  const [modalVisible, setModalVisible] = useState(false);

  const info=[
    {
    image:'https://static01.nyt.com/images/2022/03/30/books/29BOOKEGAN1/29BOOKEGAN1-superJumbo.png?quality=75&auto=webp',
    name:'The Candy House',
    xname:'The Candy House',
    author:'Jennifer Egan',
    details:'You don’t need to have read Egan’s Pulitzer-winning “A Visit From the Goon Squad” to jump feet first into this much-anticipated sequel. But for lovers of the 2010 book’s prematurely nostalgic New Yorkers, cerebral beauty and laser-sharp take on modernity, “The Candy House” is like coming home — albeit to dystopia. This time around, Egan’s characters are variously the creators and prisoners of a universe in which, through the wonders of technology, people can access their entire memory banks and use the contents as social media currency. The result is a glorious, hideous fun house that feels more familiar than sci-fi, all rendered with Egan’s signature inventive confidence and — perhaps most impressive of all — heart. “The Candy House” is of its moment, with all that implies.',
  },
]
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#FFF'}}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
          <View style={{ overflow: 'hidden', borderRadius: 24, width: '95%', alignSelf: 'center', justifyContent: 'center', height: 200, marginTop: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  <Card.Cover
    source={{
      uri: 'https://img.freepik.com/free-vector/bookshop-concept-illustration_114360-2694.jpg?w=1060&t=st=1701255196~exp=1701255796~hmac=1cb5235cc075797d7b4535913a67d5500910b655352316fe31e22f891eba581d',
    }}
    resizeMode="cover"
  />
 
</View>
     
        <Text style={styles.title}>Trending Now</Text>
        <BookList />
        <View style={{ overflow: 'hidden', borderRadius: 24, width: '95%', alignSelf: 'center', justifyContent: 'center', height: 200, marginTop: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  <Card.Cover
    source={{
      uri: 'https://th.bing.com/th/id/OIG.AYJsi96nH2fkO0YzxYWn?w=1024&h=1024&rs=1&pid=ImgDetMain'
    }}
    resizeMode="cover"
    style={{ opacity: 0.3 }} // Adjust the opacity as needed
  />
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
      Explore Worlds Between the Pages: {"\n"}Your Next Chapter Awaits!
    </Text>
  </View>
</View>
       <Text style={styles.title}>Our Categories</Text>
       <Library navigation={navigation} />
      
       <Text style={styles.title}>Top Pick of the day</Text>
       <View style={{ overflow: 'hidden', borderRadius: 24, width: '95%', alignSelf: 'center', height: 240, marginBottom: 10, flexDirection: 'column', marginTop: 30, backgroundColor: 'black' }}>
  {/* Book Name */}
  <Text style={{ color: '#1DB954', fontSize: 26, padding: 7,paddingLeft:15 }}>{info[0].name}</Text>

  {/* Description and Image */}
  <View style={{ flex: 1, flexDirection: 'row' }}>
    {/* Left side (Description) */}
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <Text style={{ color: 'white', fontSize: 16, textAlign: 'justify' }}>
        {info[0].details.substring(0, 100)}...
      </Text>
    </View>

    {/* Right side (Book Image) */}
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <Image
        source={{ uri: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781476716763/the-candy-house-9781476716763_hr.jpg' }}
        style={{ width: '80%', height: '90%', resizeMode: 'cover' }}
      />
    </View>
  </View>

  {/* Arrow Icon (Top Right) */}
  <TouchableOpacity
    style={{ position: 'absolute', top: 10, right: 10 }}
    onPress={() => setModalVisible(true)} // Update modalVisible state
    >
    
    <MaterialCommunityIcons name="arrow-right" size={30} color="white" />
  </TouchableOpacity>
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
    source={{ uri: info[0].image }}
    style={{
      flex: 1,
      resizeMode: 'repeat',
    }}
    imageStyle={{ opacity: 0.5 }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: info[0].image }}
        style={{ height: 200, width: 120 }}
        accessibilityLabel={info[0].name}
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
            <Text style={styles.titleMod}>{info[0].name}</Text>
            <View>
              <Text style={styles.author}> By {info[0].author}</Text>
            </View>
            </View>
            <Text style={styles.desc}>About the book</Text> 
            <Text style={styles.details}>{info[0].details}</Text>
            </View>
         
       </ScrollView>
        </View>
    </Modal>
    
</View>
<View style={{margin:10,marginTop:30}}>
      <Text style={styles.contact}>Got Any Questions?</Text>
      </View>
      <TouchableOpacity style={styles.but} onPress={Sup}>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.foot}>Contact us</Text>
      <MaterialCommunityIcons name="email-outline" size={30} color="white" />
      </View>
      </TouchableOpacity>
            </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
   title: {
    fontSize: 25,
    letterSpacing:1,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft:20,
  },
  container:{
    paddingTop: 8,
  },
  modalContainer: {
    padding: 10,
    backgroundColor: 'white',
    flex:1,
  },
 
  titleMod:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center',
  },
   noElevation: {
    elevation: 0,
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
  },
  contact:{
    fontSize:26,
    fontWeight:'bold',
    textAlign:'center',
  },
  foot:{
    color:'white',
    fontWeight:'600',
    alignSelf:'center',
    fontSize:20,
    marginRight: 5,
  },
  but:{
    borderRadius: 40,
    backgroundColor: 'black',
    alignSelf:'center',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
    padding:10,
  },
  modalContainer: {
    paddingTop: 10,
    paddingBottom:40,
    backgroundColor: 'white',
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
});

export default Home;