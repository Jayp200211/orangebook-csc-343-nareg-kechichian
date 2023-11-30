import React, { useState } from "react";
import { View, StyleSheet ,Text, ScrollView, Image, Linking} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import facebook from '../pictures/facebook.jpg';
import twitter from '../pictures/twitter.png';
import instagram from '../pictures/instagram-logo.png';
import pinterest from '../pictures/pinterest.png';
import tiktok from '../pictures/tiktok.png';
import { TouchableHighlight } from "react-native-gesture-handler";

const About=()=>{
    return(
    <View style={styles.container}>
        <ScrollView>
            <View>
                <Text style={styles.title}>OrangeBook</Text>
                <Icon size={30} name='book-open-page-variant' color='orange' style={styles.ic}/>
            </View>
            <View style={{margin:10}}>
                <Text style={styles.subtitle}>Your guide to reading happiness</Text>
            </View>
            <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
            <View style={{alignContent:'center',margin:10}}>
                <Icon name='devices' size={30} color='orange' style={styles.ic}/>
                <Text style={{textAlign:'center'}}>All your loans, notes, bookmarks, and reading progress sync across your devices.</Text>
                <Icon name="bell-alert" size={30} color="orange" style={styles.ic}/>
                <Text style={{textAlign:'center'}}>Get daily updates on new book releases and related news by enabling notifications in the book app. Customize your notification settings to control the updates you receive and stay up-to-date on the latest trends and releases.</Text>
            </View>
            <View style={{alignContent:'flex-start',marginTop:10}}>
                <Text style={styles.subtitle}>Have more questions?</Text>
                <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
                <View style={{marginTop:10}}>   
                    <Text style={styles.titles}>Is OrangeBook free?</Text>
                    <Text>Yes, OrangeBook is completely free. It's free to install, and there are no subscription costs, no in-app purchases, and no late fees. All you need is to login or create an account.</Text>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={styles.titles}>Can I browse and search for books by genre on OrangeBook?</Text>
                    <Text>Yes, you can browse and search for books by genre on OrangeBook. Simply use the app's search bar to enter a keyword or genre you're interested in, and the app will display a list of relevant books. Additionally, OrangeBook has a "Genres" section where you can browse through different categories of books, such as "Mystery & Thriller," "Romance," "Science Fiction," and more. This makes it easy to discover new books that match your interests.</Text>
                </View>
                <View style={{marginTop:20}}>
                    <View style={{borderBottomColor:'orange',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
                    <Text style={{alignSelf:'center',fontSize:18,fontWeight:'bold'}}>Join the conversation!</Text>
                    <Text style={{textAlign:'center'}}>Our community is at the heart of what we do. Follow us for book news and announcements, and to share your love of reading.</Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:20}}>
                        <TouchableHighlight onPress={()=>{Linking.openURL('https://www.facebook.com/')}}>
                            <Image source={facebook} style={{height:50, width:50, borderRadius:200,marginLeft:5}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{Linking.openURL('https://twitter.com/?lang=en')}}>
                            <Image source={twitter} style={{height:50, width:50, borderRadius:200,marginLeft:5}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{Linking.openURL('https://www.instagram.com/')}}>
                            <Image source={instagram} style={{height:50, width:50, borderRadius:200,marginLeft:5}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{Linking.openURL('https://www.pinterest.com/')}}>
                            <Image source={pinterest} style={{height:50, width:50, borderRadius:200,marginLeft:5}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{Linking.openURL('https://www.tiktok.com/en/')}}>
                            <Image source={tiktok} style={{height:50, width:50, borderRadius:200,marginLeft:5}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>)
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'white',
    },
    title:{
        fontSize:25,
        color:'orange',
        fontWeight:'600',
        alignSelf:'center',
        marginBottom:10,
    },
    titles:{
        fontSize:18,
        fontWeight:'bold',
    },
    ic:{
        alignSelf:'center',
    },
    subtitle:{
        alignSelf:'center',
        fontSize:18,
        color:'rgb(80,80,80)',
    }
})
export default About;