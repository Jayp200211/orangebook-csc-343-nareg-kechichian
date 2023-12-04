import React, { useState } from "react";
import { View, StyleSheet ,Text, ScrollView, Image, Linking} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import facebook from '../pictures/facebook.jpg';
import twitter from '../pictures/twitter.png';
import instagram from '../pictures/instagram-logo.png';
import pinterest from '../pictures/pinterest.png';
import tiktok from '../pictures/tiktok.png';
import { TouchableHighlight } from "react-native-gesture-handler";

const Bubble = ({ children, isQuestion }) => {
    const bubbleStyle = isQuestion ? styles.questionBubble : styles.answerBubble;
    return (
      <View style={[styles.bubble, bubbleStyle]}>
        <Text>{children}</Text>
        <View style={[styles.arrowContainer, isQuestion ? styles.questionArrowContainer : styles.answerArrowContainer]}>
          <View style={[styles.arrow, isQuestion ? styles.questionArrow : styles.answerArrow]} />
        </View>
      </View>
    );
  };

const About=()=>{
    return(
    <View style={styles.container}>
        <ScrollView>
            <View>
                <Text style={styles.title}>NovelQuest</Text>
            </View>
            <View style={{margin:10}}>
                <Text style={styles.subtitle}>A world of literary adventures.</Text>
            </View>
            <View style={{borderBottomColor:'#1DB954',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
            <View style={{alignContent:'center',margin:10}}>
                <Icon name='book' size={30} color='#1DB954' style={styles.ic}/>
                <Text style={{textAlign:'center'}}>Dive into our extensive library featuring a wide range of genres, including fiction, non-fiction, romance, mystery, fantasy, sci-fi, and more.</Text>
                <Icon name="bell-alert" size={30} color="#1DB954" style={styles.ic}/>
                <Text style={{textAlign:'center'}}>By enabling notifications, you can get daily updates on new releases and related news. You can also customize your notification settings to control the updates you receive.</Text>
            </View>
            <View style={{alignContent:'flex-start',marginTop:10}}>
                <View style={{borderBottomColor:'#1DB954',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
                <Text style={{fontSize: 18, fontWeight: 600, alignSelf: 'center'}}>Frequently Asked Questions:</Text>
                <View style={{marginTop:10}}>
                    <Bubble isQuestion>  
                    <Text style={styles.titles}>Is NovelQuest free?</Text>
                    </Bubble>
                    <Bubble>
                    <Text>Yes, NovelQuest is completely free. There are no subscription fees or hidden charges. Enjoy unlimited access to our library at no cost.</Text>
                </Bubble>
                </View>
                <View style={{marginTop:10}}>
                <Bubble isQuestion>
                    <Text style={styles.titles}>How do I find books that match my interests?</Text>
                    </Bubble>
                    <Bubble>
                    <Text>You can explore different categories of books using the "Genres" section. You can also use the app's search bar to get quick and relevant results.</Text>
                </Bubble>
                </View>
                <View style={{marginTop:10}}>
                <Bubble isQuestion>
                    <Text style={styles.titles}>Can I sync my reading progress across devices?</Text>
                    </Bubble>
                    <Bubble>
                    <Text>Yes, NovelQuest allows you to sync your bookmarks and reading progress across multiple devices, ensuring a seamless reading experience whether you're using your phone, tablet, or computer.</Text>
                </Bubble>
                </View>
                <View style={{marginTop:20}}>
                    <View style={{borderBottomColor:'#1DB954',borderBottomWidth:4,width:80,alignSelf:'center'}}/>
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
    bubble: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        position: 'relative',
        maxWidth: '70%',
      },
      questionBubble: {
        backgroundColor: 'lightgray',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 30,
        alignSelf: 'flex-start',
      },
      answerBubble: {
        backgroundColor: '#1DB954',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 10,
        alignSelf: 'flex-end',
      },
      arrowContainer: {
        position: 'absolute',
        width: 20,
        height: 20,
        overflow: 'hidden',
      },
      questionArrowContainer: {
        top: -9,
        left: -9,
      },
      answerArrowContainer: {
        top: -9,
        right: -9,
      },
      arrow: {
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        borderStyle: 'solid',
        borderWidth: 10,
        borderColor: 'transparent',
      },
      questionArrow: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 20,
        borderRightColor: 'transparent',
        borderRightWidth: 20,
        transform: [{ rotate: '-45deg' }],
      },
      answerArrow: {
        borderBottomColor: 'lightblue',
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderLeftWidth: 20,
        transform: [{ rotate: '45deg' }],
      },
      questionText: {
        fontWeight: 'bold',
      },
      answerText: {
        color: 'black',
      },
    title:{
        fontSize:25,
        color:'#1DB954',
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
        color:'black',
    }
})
export default About;