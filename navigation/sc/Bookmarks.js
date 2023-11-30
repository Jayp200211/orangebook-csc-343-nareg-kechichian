import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

export default function Bookmarks({navigation}){
    const [isbn,setIsbn] = useState([])
    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        const namesRef = firebase.database().ref(`users/${uid}/Book`);
        namesRef.on('value', (snapshot) => {
          const data = snapshot.val();
          const arr = data ? Object.values(data) : [];
          setIsbn(arr);
        });
        return () => {
          namesRef.off();
        };
      }, []);
      function BookDetails({ url }) {
        const [book, setBookData] = useState([]);
        useEffect(() => {
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                setBookData(data);
              });
          }, []); 
          if(!book){
            return <View>
                <Text>Loading ...</Text>
                <ActivityIndicator color="orange"/>
            </View>
          }
        return (
          <View>
            <TouchableOpacity style={styles.bb} onPress={() => navigation.navigate('Bbook',{isbn:book?.selfLink})}>
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
                <Text style={styles.title}>{`${book?.volumeInfo?.title}`}</Text>
              </View>
              <View style={{ width: 220 }}>
                <Text style={styles.author}>{`${book?.volumeInfo?.authors}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </View>
        );
      }
    return(
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>Bookmarks</Text>
            </View>
            <ScrollView>
            {isbn.map((link) => (
                <BookDetails url={link} />
            ))}
            </ScrollView>           
        </View>
    )
    
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
})