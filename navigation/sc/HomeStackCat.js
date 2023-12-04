// Import necessary dependencies
import { createStackNavigator } from '@react-navigation/stack';
import Library from './Library';
import EachBookInfo from './EachBookInfo';
import HomeScreen from './Home';

// Create a stack navigator
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      {/* Library screen with categories */}
      <Stack.Screen name="Home" component={HomeScreen}  
  options={{ headerShown: false }}
      
      />

      <Stack.Screen name="Library" component={Library} />

      <Stack.Screen name="Book Info" component={EachBookInfo}   options={{ headerShown: false }}
/>
    </Stack.Navigator>
  );
};

export default AppStack;
