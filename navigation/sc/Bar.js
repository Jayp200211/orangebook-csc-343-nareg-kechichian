// import React,{useState,Component} from 'react';
// import { Text, View, StyleSheet, TouchableHighlight, Alert, Image, TouchableOpacity} from 'react-native';
// import book from './pictures/pngegg.png';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Bar=({navigation})=>{
//     const pressNotification = () => {
//       navigation.navigate("Notification");
//     };
//     return(
//       <View style={styles.bar}>
//             <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//               <Image
//                 source={book}
//                 style={{
//                   height: 50,
//                   width: 50,
//                   borderRadius: 40,
//                   alignSelf: "flex-start",
//                 }}
//               />
//             </TouchableOpacity>
        
//       </View>
  
//     )
//   }
//   const styles = StyleSheet.create({
//     bar:{
//       marginTop:5,
//       marginRight:5,
//       marginLeft:5,
//       flexDirection:'row',
//       backgroundColor:'white',
//       justifyContent:'space-between',
//       borderRadius:50,
//       borderWidth:2,
//       borderColor:'#666',
//     },
//     app:{
//       fontSize:18,
//       fontWeight:"500",
//       alignSelf:'center',
//     },
// });
// export default Bar;