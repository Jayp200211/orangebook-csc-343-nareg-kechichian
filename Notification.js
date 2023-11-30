import React, { useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import book from './assets/pngegg.png';

const Notification = () => {
  const [not, setNot] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    const uid = firebase.auth().currentUser.uid;
    const notRef = firebase.database().ref(`users/${uid}/Notification`);
    notRef.once('value', (snapshot) => {
      const data = snapshot.val();
      const nots = data ? Object.values(data) : [];
      const mappedNots = nots.map((notification) => ({
        id: notification.id,
        title: notification.title,
        body: notification.body,
      }));
      setNot(mappedNots);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    const notRef = firebase.database().ref(`users/${uid}/Notifications`);
    notRef.on('child_added', (snapshot) => {
      const data = snapshot.val();
      const not = {
        id: snapshot.key,
        title: data.title,
        body: data.body,
      };
      setNot((prevNot) => [...prevNot, not]);
    });
    return () => {
      notRef.off('child_added');
    };
  }, []);

  const NoNotif = () => {
    return (
      <ScrollView>
        <Text style={styles.txt}>No notifications yet</Text>
      </ScrollView>
    );
  };

  const Notts = () => {
    return (
        <View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {not.map((notification) => (
          <View key={notification.id} style={{flex:1,alignItems:'center',borderWidth:2,borderColor:'#666',padding:5}}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={book} style={{ height: 30, width: 30, borderRadius: 50 }} />
              <Text style={{ fontWeight: 'bold',fontSize:19}}>{notification.title}</Text>
            </View>
            <View>
              <Text style={{fontSize:17}}>{notification.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      </View>
    );
  };

  return <View style={styles.container}>{not.length > 0 ? <Notts /> : <NoNotif />}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:2,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nono:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  }
});

export default Notification;