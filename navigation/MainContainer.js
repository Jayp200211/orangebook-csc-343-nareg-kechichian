import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './sc/Home';
import Bookmarks from './sc/BookNav';
import Library from './sc/LibNav';
import Profile from './sc/profStack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const homeName = 'Home';
const bookmarks = 'Bookmarks';
const library = 'Library';
const profile ='Profile'; 
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MainContainer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
      schedulePushNotification();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      const uid = firebase.auth().currentUser.uid;
      const notRef = firebase.database().ref(`users/${uid}/Notifications`);
      notRef.push({
        title: notification.request.content.title,
        body: notification.request.content.body,
      });
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Welcome to OrangeBook',
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

    return (
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === homeName) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === bookmarks) {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === library) {
                iconName = focused ? 'library' : 'library-outline';
              }
              else if(route.name===profile){
                iconName =focused? 'person':'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor:'black',
            inactiveTintColor: 'grey',
            labelStyle: {paddingBottom:10,fontSize:10},
            style: {padding:10, height:70},
          }}
        >
          <Tab.Screen name={homeName} component={HomeScreen}   options={{ headerShown: false }}
  />
          <Tab.Screen name={library} component={Library}   options={{ headerShown: false }}
 />
          <Tab.Screen name={bookmarks} component={Bookmarks}   options={{ headerShown: false }}
 />
          <Tab.Screen name={profile} component={Profile}   options={{ headerShown: false }}
 />
        </Tab.Navigator>
    );
  }
  export default MainContainer;
