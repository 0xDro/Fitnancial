import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import Opening from './screens/Opening';
import UserInfo from './screens/UserInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Goal from './screens/Goal';
import Time from './screens/Time';
import Home from './screens/Home';
import Journey from './screens/Journey';
import Wallet from './screens/Wallet';
import Payment from './screens/Payment';
const Stack = createNativeStackNavigator();
import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Opening" component={Opening} />
                <Stack.Screen options={{ headerShown: false }}name="UserInfo" component={UserInfo} />
                <Stack.Screen options={{ headerShown: false }}name="Goal" component={Goal} />
                <Stack.Screen options={{ headerShown: false }}name="Time" component={Time} />
                <Stack.Screen options={{ headerShown: false }}name="Payment" component={Payment} />
                <Stack.Screen options={{ headerShown: false }}name="Journey" component={Journey} />
                <Stack.Screen options={{ headerShown: false }}name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }}name="Wallet" component={Wallet} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );

};

