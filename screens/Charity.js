import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import "@ethersproject/shims";
import {ethers} from 'ethers';
import { THE_WATER_PROJECT, GRACE_AID, GIVE_DIRECTLY, BREAST_CANCER } from '../abi/USDCABI';
export default function Charity({route}){

    //Prop destructing and state setting
    const {name, weight, goal, date, direction, delta, walletgen, deltaPath} = route.params;
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [otherText, setOtherText] = useState();
  

    const navigation = useNavigation();

    //Checks if charity is selected and navigates to Home screen
    const toHome = () =>{
        if (selectedCharity == null){
            
            navigation.navigate('Home', {
                name: name, 
                weight: weight,
                goal: goal,
                date: date,
                direction: direction,
                delta: delta,
                walletgen: walletgen,
                deltaPath: deltaPath,
                charity: otherText,

            });
        } else {
            navigation.navigate('Home', {
                name: name, 
                weight: weight,
                goal: goal,
                date: date,
                direction: direction,
                delta: delta,
                walletgen: walletgen,
                deltaPath: deltaPath,
                charity: selectedCharity,

            });
            
        }
    }


    return(
       
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Select your favorite charity</Text>
            </View>
            <View style={styles.charityContainer}>
                <View  style={styles.charityBlock}>
                    <Text style={styles.charityText}>The Water Project</Text>
                    <Button title="Select" onPress={() => {
                        navigation.navigate('Home', {
                            name: name, 
                            weight: weight,
                            goal: goal,
                            date: date,
                            direction: direction,
                            delta: delta,
                            walletgen: walletgen,
                            deltaPath: deltaPath,
                            charity: THE_WATER_PROJECT,
                        });
                        
                        }}></Button>
                </View>
                <View style={styles.charityBlock}>
                    <Text  style={styles.charityText}>Breast Cancer Support</Text>
                    <Button title="Select" onPress={() => {
                        navigation.navigate('Home', {
                            name: name, 
                            weight: weight,
                            goal: goal,
                            date: date,
                            direction: direction,
                            delta: delta,
                            walletgen: walletgen,
                            deltaPath: deltaPath,
                            charity: BREAST_CANCER,
                        });
                        
                        }}></Button>
                </View>
                <View style={styles.charityBlock}>
                    <Text style={styles.charityText}>GRACEaid</Text>
                    <Button title="Select" onPress={() => {
                        navigation.navigate('Home', {
                            name: name, 
                            weight: weight,
                            goal: goal,
                            date: date,
                            direction: direction,
                            delta: delta,
                            walletgen: walletgen,
                            deltaPath: deltaPath,
                            charity: GRACE_AID,
                        });
                        
                        }}></Button>
                </View>
                <View  style={styles.charityBlock}>
                    <Text style={styles.charityText}>Give Directly</Text>
                    <Button title="Select" onPress={() => {
                        navigation.navigate('Home', {
                            name: name, 
                            weight: weight,
                            goal: goal,
                            date: date,
                            direction: direction,
                            delta: delta,
                            walletgen: walletgen,
                            deltaPath: deltaPath,
                            charity: GIVE_DIRECTLY,
                        });
                        
                        }}></Button>
                </View>
                <View style={styles.spacer}/>
                <View style={styles.spacer}/>
                <View style={styles.charityBlock}>
                    <TextInput placeholder='Enter ETH address for other charity' style={styles.otherInput} value={otherText} onChangeText={setOtherText}>
                    </TextInput>
                </View>
                <View style={styles.smallspacer}/>
            
                <View onTouchEnd={toHome} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Other</Text>
            </View>
            </View>

            
        </View>
        
    );
}

    //CSS styles
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
        height: '100%'
    },
    charityBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        
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
    
        borderBottomColor: '#000',
        borderBottomWidth: 1,

      
    },
    spacer: {
        height: 50,
    },
    smallspacer: {
        height: 20,
    },







});
