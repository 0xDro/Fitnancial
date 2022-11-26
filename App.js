import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import Opening from './screens/Opening';
import UserInfo from './screens/UserInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Goal from './screens/Goal';
import Time from './screens/Time';

const Stack = createNativeStackNavigator();
export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Opening" component={Opening} />
                <Stack.Screen options={{ headerShown: false }}name="UserInfo" component={UserInfo} />
                <Stack.Screen options={{ headerShown: false }}name="Goal" component={Goal} />
                <Stack.Screen options={{ headerShown: false }}name="Time" component={Time} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );

};

