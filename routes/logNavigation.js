import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../log/login';
import SignUp from '../log/signUp';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{...TransitionPresets.FadeFromBottomAndroid }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}                                                                   