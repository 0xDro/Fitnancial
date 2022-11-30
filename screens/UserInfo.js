import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';



export default function UserInfo() {
    const [textName, setTextName] = useState('');
    const [weightText, setWeightText] = useState('');
    const onNextBtn = () => {
        navigation.navigate('Goal', {
            name: textName,
            weight: weightText,
        });
    };

    const navigation = useNavigation();


    return (
      
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Welcome!</Text>
                <Text style={styles.titleText}>Let's get to know you</Text>
            </View>
            <View style={styles.dataContainer}> 
                <View style={styles.dataBlock}>
                    <Text style={styles.dataText}>Name</Text>
                    <TextInput style={styles.dataInput} placeholder="Enter your name" value={textName} onChangeText={setTextName}/>
                </View>
                <View style={styles.dataBlock}>
                    <Text style={styles.dataText}>Weight</Text>
                    <TextInput style={styles.dataInput} placeholder="Enter your weight" value={weightText} onChangeText={setWeightText} />
                </View>
            </View>
            <View style={styles.nextBtn}>
                <Button title="Next" color="#FFA500"  onPress={onNextBtn}  />
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
        paddingBottom: 50,
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
        height: 400,
        width: 300,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
  
     
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

    
});

