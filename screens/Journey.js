import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';


export default function Journey({route}){

    const {name, weight, goal, date, direction, delta, walletgen} = route.params;

    const [deltaPath, setDeltaPath] = useState(0);

    const navigation = useNavigation();
    const getStarted = () => {
        navigation.navigate('Payment', {
            name: name,
            weight: weight,
            goal: goal,
            date: date,
            direction: direction,
            delta: delta,
            walletgen: walletgen,
            deltaTrack: deltaPath
        });
    }

    useEffect(() => {
        const curentDate = new Date();
        const goalDate = new Date(date);
        const timeDiff = Math.abs(goalDate.getTime() - curentDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const dailyDelta = Math.round((delta / diffDays) * 100);
        setDeltaPath(dailyDelta * 7/100);

        



    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Thank You!</Text>
            </View>
            <View style={styles.getStartedContainer} >
                <View style={styles.getStartedBlock}>
                    <Text style={styles.getStartedText}>Your journey to {direction} {delta} pounds by {date} has begun!</Text>
                    <View style={styles.spacer}>

                    </View>
                    <Text style={styles.getStartedText}>You will need to {direction} {deltaPath} pounds per week to reach your goal!</Text>
                </View>
            </View>
            <View style={styles.getStartedBtn} onTouchEnd={getStarted}>
                    <Text style={styles.getStartedTxt}> 
                        Get Started
                    </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 25,
        paddingTop: 25,
        height: '100%',
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
   
    },
    titleText: {
        fontSize: 30,
    },
    getStartedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 100,
        

    },
    getStartedText: {
        fontSize: 20,
        textAlign: 'center',
    },
    getStartedBtn: {
        backgroundColor: '#000',
        display: 'flex',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 10,
        
    },
    spacer: {
        height: 40,
    },
    getStartedTxt: {
        color: '#fff',
        fontSize: 20,
    },
    getStartedBlock: {
        width: 300,
        height: 200,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }

});
