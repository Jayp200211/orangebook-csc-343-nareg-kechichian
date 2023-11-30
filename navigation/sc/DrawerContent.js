import React, {useState} from 'react';
import { View, StyleSheet, Modal, Button} from 'react-native';
import { DrawerContentScrollView, DrawerItem , DrawerItemList} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Text,
    Drawer,
} from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

function DrawerContent(props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="library" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Library"
                            onPress={() => {props.navigation.navigate('Library')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('Bookmarks')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                    </Drawer.Section>
                    <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bell-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Notification"
                            onPress={() => {props.navigation.navigate('Notification')}}
                        />
            </DrawerContentScrollView>
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
          props.navigation.navigate('Logs', { screen: 'LoginScreen' });
          firebase.auth().signOut()
          }} /></View>
<View style={{ padding: 5, marginLeft: 10 }}><Button title='Back' onPress={()=>setModalVisible(!modalVisible)} color='orange'/></View>
        </View>
        </View>
        </Modal>
        </View>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={()=>setModalVisible(true)}
                />
            </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    drawerSection: {
        marginTop: 15,
      },
});
export default DrawerContent;
