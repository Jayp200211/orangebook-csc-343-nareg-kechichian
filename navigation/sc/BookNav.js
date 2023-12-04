import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import Bbooks from './Bbook';
import Bookmarks from './Bookmarks'

const Stack = createStackNavigator()
const BookNav=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }}/>
            <Stack.Screen name="Bbook" component={Bbooks}
              options={{ headerTitle: 'Book Info' }}

            />
        </Stack.Navigator>
    )
}
export default BookNav;