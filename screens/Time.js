import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import "@ethersproject/shims";
import {ethers} from 'ethers';



export default function Time({route}) {

    const {name, weight, goal} = route.params;
    const [dateText, setDateText] = useState('');
    const [walletgen, setWalletGen] = useState();

    var weightGoal;
    var direction;
    const navigation = useNavigation();

    if (goal > weight) {
        weightGoal = goal - weight;
        direction = "gain";
    }
    else {
        weightGoal = weight - goal;
        direction = "lose";
    }

    useEffect(() => {
        const wallet = ethers.Wallet.createRandom();
        console.log(wallet);
        console.log(wallet.privateKey)
        console.log(wallet.address);
        setWalletGen(wallet);
    }, []);
    
    const onNextBtn = () => {
        console.log("walletgen: ", walletgen)
        console.log(walletgen.privateKey)
        console.log(walletgen.address);
        navigation.navigate('Journey', {
            name: name,
            weight: weight,
            goal: goal,
            date: dateText,
            direction: direction,
            delta: weightGoal,
            wallet: walletgen
        });
    };
    const onBackBtn = () => {
        navigation.navigate('Goal', {});
    };
    


    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        
       <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Hello {name}!</Text>

            </View>
            <View style={styles.dataContainer}>
                <View style={styles.dataBlock}>
                    <Text style={styles.dataText}>Enter the Date you would like to {direction} {weightGoal} pounds by</Text>
                    <View style={styles.spacer}/>
                    <TextInput style={styles.dataInput} placeholder="mm/dd/yyyy" value={dateText} onChangeText={setDateText} />
                </View>
            </View>
            <View style={styles.nextBtn}>
                <Button title="Back" color="#FFA500" onPress={onBackBtn}/>
                <Button title="Next" color="#FFA500" onPress={onNextBtn}/>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
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


    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: 25,
        paddingTop: 30,
   

    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    dataContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
   
    },
    dataBlock: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 25,
        flexDirection: 'column',
   
        width: 280,
        height: 200,
        
    },
    dataText: {
        fontSize: 20,
        
        color: '#000',
        textAlign: 'center',
    },
    dataInput: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },
    nextBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    spacer: {
        height: 25,
    }


});