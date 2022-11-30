import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import "@ethersproject/shims";
import {ethers} from 'ethers';

export default function Charity({route}){
    const {name, weight, goal, date, direction, delta, walletgen, deltaPath} = route.params;
   
    console.log('walleet in chairy', walletgen);
    console.log(route.params)

    const navigation = useNavigation();
    const toHome = () =>{
        navigation.navigate('Home', {
            name: name, 
            weight: weight,
            goal: goal,
            date: date,
            direction: direction,
            delta: delta,
            walletgen: walletgen,
            deltaPath: deltaPath,
            // chairty: ''
            

        });
    }
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Select your favorite charity</Text>
            </View>
            <View style={styles.charityContainer}>
                <View style={styles.charityBlock}>
                    <Text style={styles.charityText}>The Water Project</Text>
                </View>
                <View style={styles.charityBlock}>
                    <Text style={styles.charityText}>Breast Cancer Support</Text>
                </View>
                <View style={styles.charityBlock}>
                    <Text style={styles.charityText}>GRACEaid</Text>
                </View>
                <View style={styles.charityBlock}>
                    <Text style={styles.charityText}>Give Directly</Text>
                </View>
                <View style={styles.spacer}/>
                <View style={styles.charityBlock}>
                    <TextInput placeholder='Enter ETH address for other charity' style={styles.otherInput}>
                    </TextInput>
                </View>
            </View>

            <View onTouchEnd={toHome} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Start your journey</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingBottom: 25,
        paddingTop: 50,
        height: '100%',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
    },
    charityContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto'
    },
    charityBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
      
        borderWidth: 1,
        borderColor: '#000',
    },
    charityText: {
        fontSize: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#000',
        borderRadius: 10,
        height: 50,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
    otherInput: {
        fontSize: 20,
        textAlign: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    spacer: {
        height: 30,
    }






});
