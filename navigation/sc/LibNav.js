import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import EachBookInfo from './EachBookInfo';
import Search from './Search';

const Stack = createStackNavigator()
const LibStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Search' component={Search}
              options={{ headerShown: false }}

            />
            <Stack.Screen name="Book Info" component={EachBookInfo}/>

        </Stack.Navigator>
    )
}
export default LibStack;