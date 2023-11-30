import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'; 
import * as MailComposer from 'expo-mail-composer';

const Support=()=>{
    const [reviewText,setReviewText]=useState('')
    const emailDetails = {
        recipients: ['nakhouljp@gmail.com'],
        subject: 'Review App or Question',
        body: reviewText,
        isHtml: false,
        attachments: [], 
      }; 
    const handleIt=()=>{ 
        setReviewText('')
        MailComposer.composeAsync(emailDetails)
            .then(result => {
        alert('Email sent', result.status);
        })
        .catch(error => {
            alert('Error sending email', error);
        });
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={{color:'orange',fontSize:25,alignSelf:'center',fontWeight:'600',textDecorationLine:'underline'}}>Message:</Text>
                <TextInput
                    placeholder="Please tell us some details about this app, and we will keep working hard to improve your experience"
                    placeholderTextColor='#666'
                    style={styles.input}
                    value={reviewText}
                    onChangeText={setReviewText}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.but} onPress={handleIt} disabled={!reviewText}>
                    <Text style={styles.butText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:10,
        flex:1,
    },
    input: {
        height: 300,
        borderWidth: 2,
        borderColor: '#ecf0f1',
        borderRadius: 5,
        marginBottom: 20,
        padding: 20,
        textAlignVertical: 'top',
    },
    but:{
        borderRadius: 50,
        backgroundColor: 'rgba(246,152,13,255)',
        height: 50,
        width: 125,
        alignSelf:'center',
        textAlign:'center',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
      butText:{
        color:'white',
        fontWeight:'600',
        alignSelf:'center',
        fontSize:20,
        marginRight: 5,
      },
})
export default Support;