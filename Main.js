import React,{useState,Component} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import MainContainer from './navigation/MainContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import book from './assets/pngegg.png';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import DrawerContent from './navigation/sc/DrawerContent';

const Drawer = createDrawerNavigator();
const Bar=({navigation})=>{
  
  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  const navigateToNotification = () => {
    navigation.navigate('Notification'); // Replace with your actual notification screen name
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 ,backgroundColor:'#FFF'}}>
      <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>NovelQuest</Text>
      <TouchableOpacity onPress={navigateToNotification}>
        <Ionicons name="notifications" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};
function MyDrawer() {
  return (
    <Drawer.Navigator 
      drawerContent={props => <DrawerContent {...props}/>}
      screenOptions={({ navigation, route }) => {
      
        return {
          header: (props) => {

            return <Bar {...props} navigation={navigation} />;
          },
          headerLeft: null,
          title: null,
          headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
            elevation: 0,
          },
        };
      }}
    >
      <Drawer.Screen name="OrangeBook" component={MainContainer}/>
      
    </Drawer.Navigator>
  );
}

function Main(){
    return (
      <View style={styles.container}>
        <MyDrawer/>
      </View>
    );
  };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'white',
    },
    bar:{
      marginTop:5,
      marginRight:5,
      marginLeft:5,
      flexDirection:'row',
      backgroundColor:'white',
      justifyContent:'space-between',
      borderRadius:20,
      borderWidth:1,
      borderColor:'#666',
    },
    app:{
      fontSize:18,
      fontWeight:"500",
      alignSelf:'center',
    },
});
export default Main;