import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import EditProfile from './profile screens/EditProfile';
import Profile from './Profile';
import Support from './profile screens/Support';
import About from './profile screens/About';
const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{...TransitionPresets.FadeFromBottomAndroid}} >
      <Stack.Screen name="Profile" component={Profile} 
  options={{ headerShown: false }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile}/>
      <Stack.Screen name="Support" component={Support}/>
      <Stack.Screen name="About" component={About}/>

    </Stack.Navigator>
  );
};

export default SettingsStack;
