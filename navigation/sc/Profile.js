import React,{useState, useEffect} from 'react';
import {  View, StyleSheet, TouchableHighlight, Alert, Modal,Button ,Share ,TouchableOpacity, Image, ActivityIndicator, SafeAreaView,ScrollView} from 'react-native';
import {Avatar,BottomSheet}  from 'react-native-elements';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { createStackNavigator} from '@react-navigation/stack';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
export default function Profile({navigation}){
  const [permissionMedia, requestMedia] = MediaLibrary.usePermissions();
  const [selectedImage,setSelectedImage] = useState(null)
  const [type, setType] = useState(CameraType.back); 
  const [capturedImage,setCapturedImage] = useState(null);
  const [capModal,setCapModal] = useState(false);
  const [cam,setCam] = useState(false)
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible,seIsVisible] = useState(false)
  const [names, setNames] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [op,setOp] = useState(0)
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Assuming you have Firebase initialized in your app
    const user = firebase.auth().currentUser;
    if (user) {
      setUserEmail(user.email || '');
    }
  }, []);
  useEffect(() => {
    const func = async () => {
     

      const userId = firebase.auth().currentUser.uid;
      const storage = getStorage();
      const reference = ref(storage, `users/${userId}/image.jpg`);
      await getDownloadURL(reference).then((x) => {
        setSelectedImage(x);
      })
    }
    if (selectedImage == undefined) {func()};
  }, []);

const saveToFirebase = async () => {
  const userId = firebase.auth().currentUser.uid;
  const storage = getStorage();
  const lref = ref(storage, `users/${userId}/image.jpg`);
  const img = await fetch(capturedImage);
  const bytes = await img.blob();
  await uploadBytes(lref, bytes); 
}
const takePicture = async () => {
  if (cameraRef) {
    let photo = await cameraRef.takePictureAsync();
    setCapturedImage(photo.uri);
    setCapModal(true);
    setCam(false);
  }
};
  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    const namesRef = firebase.database().ref(`users/${uid}/Names`);
    namesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const names = data ? Object.values(data) : [];
      setNames(names);
      console.log(JSON.stringify(names));
    });
    return () => {
      namesRef.off();
    };
  }, []);
  if (!permission) {
    return <View/>;
  }
  if (!permission.granted) {
    return (
      
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );  
  }

    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    const pickImage = async () => {
      if (permissionMedia.status !== 'granted') {
        const { status } = await requestMedia();
        if (status !== 'granted') {
          return <View/>;
        }
      }
    
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });  
      console.log(result);
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        const userId = firebase.auth().currentUser.uid;
        const storage = getStorage();
        const lref = ref(storage, `users/${userId}/image.jpg`);
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        await uploadBytes(lref, bytes); 
      }
    };
  const pressMore=()=>{
    Alert.alert('Invalid at the moment try later')
  }
  const EditProfile=()=>{
    navigation.navigate('EditProfile')
  }
  const aboutUs=()=>{
    navigation.navigate('About')
  }
  const support=()=>{
    navigation.navigate('Support')
  }
  const renderContent=()=>{
    return(
      <View style={styles.sheetContainer}>
      <Text style={{fontSize:18, alignSelf:'center'}}>Upload Photo</Text>
      <Text style={{color:'#666', alignSelf:'center'}}>Choose Your Profile Picture</Text>
      <TouchableOpacity style={styles.gbut} onPress={()=>{
        seIsVisible(false);
        setCam(true);
      }}>
        <Text style={styles.gbutext}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gbut} onPress={()=>{
        seIsVisible(false)
        pickImage();
      }}>
        <Text style={styles.gbutext}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gbut} onPress={() => {
        seIsVisible(false)
      }}>
        <Text style={styles.gbutext}>Cancel</Text>
      </TouchableOpacity>
    </View>
    )
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'NovelQuest is an application that stores all the books you search for.',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
};
    return(
      <ScrollView style={styles.container}>
             
  <View style={styles.userInfoSection}>
     <View style={styles.avatarContainer}>
          <Avatar 
          size={80}
          rounded
          source={{ uri: selectedImage || 'https://www.w3schools.com/howto/img_avatar.png'}}
          onPress={() =>{
            seIsVisible(true)
          }}
          />
        <View>
  <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
    {names && names.length > 0 && (
      `${names[0] || ''} ${names[1] || ''}`
    )}
  </Title>
</View>

        </View>
</View>
      <View style={styles.userInfoSection}>
       
       <View style={styles.row}>
         <Icon name="email" color="#777777" size={20}/>
         <Text style={{color:"#777777", marginLeft: 5}}>{userEmail}</Text>
       </View>
     </View> 
     
       <View style={styles.menuWrapper}>
       <TouchableRipple onPress={EditProfile}>
          <View style={styles.menuItem}>
            <Icon name="pencil-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={aboutUs}>
          <View style={styles.menuItem}>
            <Icon name="information-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>About Us</Text>
          </View>
        </TouchableRipple>
       
        <TouchableRipple onPress={onShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={support}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={Settings}>
          <View style={styles.menuItem}>
            <Icon name="pencil-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple> */}
   <TouchableRipple onPress={()=>{setModalVisible(!modalVisible)}}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>      
      </View>

      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'rgb(240,240,240)', height: 180, width: 220, alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',borderRadius:20, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
        <Text style={{padding:10}}>Are you sure you wish to sign out?</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{ padding: 5}}><Button title='Sign out' onPress={()=>{
          setModalVisible(!modalVisible)
          navigation.navigate('Logs', { screen: 'LoginScreen' });
          firebase.auth().signOut()
          }} /></View>
<View style={{ padding: 5, marginLeft: 10 }}><Button title='Back' onPress={()=>setModalVisible(!modalVisible)} color='orange'/></View>
        </View>
        </View>
        </Modal>
        </View>
        <BottomSheet
        isVisible={isVisible}
        borderRadius={10}
        modalProps={{
          animationType: 'slide',
          transparent: true,
          hardwareAccelerated: true,
          statusBarTranslucent: true,
        }} 
        sheetStyle={{ backgroundColor: 'white', height: 330, bottom:0}}>
          {renderContent()}
          </BottomSheet>
          <Modal
        animationType="slide"
        transparent={true}
        visible={cam}
        onRequestClose={() => {
          setCam(!cam);
        }}
      >
        <View style={styles.ccontainer}>
        <Camera type={type} style={{flex:1}} ratio={'16:9'}  ref={ref => setCameraRef(ref)}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableHighlight style={{...styles.ic,alignSelf:'flex-start'}} onPress={() => setCam(false)} underlayColor="#D3D3D3">
              <Icons name="arrow-back-ios" size={30} color="black" style={{alignSelf:'center'}}/>
        </TouchableHighlight>
        <ActivityIndicator color='orange' size="large" style={{alignSelf:'center',opacity:op}}/>
        <TouchableHighlight onPress={toggleCameraType} underlayColor="#D3D3D3" style={styles.ic}>
          <View style={styles.ic}>
                <Icons name='flip-camera-android' size={30} color='#666' style={{alignSelf:'center'}}/>
            <Text style={{color:'#666',fontSize:10,alignSelf:'center'}}>Flip</Text>
          </View>
          </TouchableHighlight>
          </View>
          <View style={styles.draw}>
            <TouchableHighlight style={styles.cam} underlayColor="#D3D3D3" onPress={()=>{
              setOp(1);
              takePicture();
            }}>
                <Icons name='camera-alt' size={40} color='#666' style={{alignSelf:'center'}}/>
            </TouchableHighlight>
          </View>
        </Camera>
      </View>
      </Modal>
      <Modal
      animationType="slide"
      transparent={true}
      visible={capModal}
      onRequestClose={() => {
        setCapModal(!capModal);
      }}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
          <Image source={{uri : capturedImage}} style={{height:200,width:200}}/>
          <Text style={{fontSize:18,textAlign:'center'}}>Would you like to use this picture as your profile picture?</Text>
          <View style={{flexDirection:'row',margin:20}}>
            <View style={{marginLeft:10}}>
              <Button title='Set Picture' onPress={async ()=>{
                setSelectedImage(capturedImage)
                setCam(false)
                setCapModal(!capModal)
                setOp(0)
                await saveToFirebase();
              }}/>
            </View>
            <View style={{marginLeft:10}}>
              <Button title='Back' onPress={()=>{
                setCapModal(false)
                setOp(0);
              }}/>
            </View>
          </View>
        </View>
      </Modal>
   
      </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
     alignItems: 'center', // Center items horizontally
    marginBottom: 25,
  },
   avatarContainer: {
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:10,
  },
  name:{
    alignSelf:'center',
    fontSize:18,
    fontWeight:'bold',
    marginLeft:10,
  },
  button:{
    marginTop:20,
  },
  but:{
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  text:{
    fontSize:18,
    marginLeft:20,
  },
  gbut:{
    backgroundColor:'orange',
    textAlign:'center',
    justifyContent:'center',
    borderRadius: 10,  
    marginTop:10
  },
  gbutext:{
    fontSize: 16,
    padding:10,
    color:'white',
    fontWeight:'600',
    alignSelf:'center',
  },
  sheetContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    height: 330,
  },
  ccontainer:{
    flex:1,
    justifyContent: 'center',
},
ic:{
    width:50,
    height:50,
    alignItems:'flex-end',
    justifyContent:'center',
    borderRadius:50,
},
draw: {
    height: 80,
    bottom: 0,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
cam:{
    borderRadius:100,
    alignItems:'center',
    backgroundColor:'rgb(240,240,240)',
    height:70,
    width:70,
    justifyContent: 'center',
},
});