import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Goal() {
    const [goalText, setGoalText] = useState('');
    const navigation = useNavigation();

    const onNextBtn = () => {
        navigation.navigate('Time');
    };
    const onBackBtn = () => {
        navigation.navigate('UserInfo');
    };
    return(
        <View style={styles.container}>
             <View style={styles.title}>
                <Text style={styles.titleText}>Let's hear about your goals</Text>
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.dataBlock}>
                    <Text style={styles.dataText}>What is your final weight goal?</Text>
                    <TextInput style={styles.dataInput} placeholder="Enter your goal" keyboardType='numeric' value={goalText} onChangeText={setGoalText} />
                </View>
            </View>
            <View style={styles.nextBtn}>
                <Button title="Back" color="#FFA500" onPress={onBackBtn}/>
                <Button title="Next" color="#FFA500" onPress={onNextBtn}/>
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
        paddingTop: 50,
     

    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    dataContainer: {
        display: 'flex',
        height: 'auto',
        width: 300,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
  
     
    },
    nextBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
 
    },
    dataBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataText: {
        fontSize: 20,
        textAlign: 'center',
    },
    dataInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        textAlign: 'center',
        width: 300,
    },
    nextBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 300,
    },
});
