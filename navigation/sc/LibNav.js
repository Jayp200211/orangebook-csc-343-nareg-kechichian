import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import EachBookInfo from './EachBookInfo';
import Library from './Library';
import Search from './Search';

const Stack = createStackNavigator()
const LibStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Library" component={Library} options={{ headerShown: false }}/>
            <Stack.Screen name="Abook" component={EachBookInfo}/>
            <Stack.Screen name='Search' component={Search}/>
        </Stack.Navigator>
    )
}
export default LibStack;