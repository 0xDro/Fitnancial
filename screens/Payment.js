import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import "@ethersproject/shims";
import {ethers} from 'ethers';
import  * as Clipboard from 'expo-clipboard';
import { USDCABI, USDCADR, PROVIDER } from '../abi/USDCABI';


export default function Payment({route}){

    const {name, weight, goal, date, direction, delta, walletgen, deltaTrack} = route.params;
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
    const connectedWallet = walletgen.connect(provider);
    const [wallet, setWallet] = useState(connectedWallet);
    const contract = new ethers.Contract(USDCADR, USDCABI, provider);
    const [balance, setBalance] = useState("0.00");

    const navigation = useNavigation();
    
    


    
    const copyToClipboard = async() => {
        console.log(walletgen)
        await Clipboard.setStringAsync(wallet.address);
    };

    useEffect(() => {
        const getBalance = async() => {
            const balance = ethers.BigNumber.from(await contract.balanceOf(wallet.address));
            if (ethers.utils.formatUnits(balance, 18).length == 3){
                setBalance(ethers.utils.formatUnits(balance, 18) + "0");
            } else if (ethers.utils.formatUnits(balance, 18).length == 4){
                setBalance(ethers.utils.formatUnits(balance, 18));
            } else {
                setBalance(ethers.utils.formatUnits(balance, 18).slice(0,4));
            }
            
        }
        getBalance();
        contract.on("Transfer", (from, to, amount) => {
            if (to == wallet.address) {
                getBalance();
            }
        })

    }, []);
 

    return(
        <View style={styles.container}>
            <Text style={styles.balanceDisplay}>${balance}</Text>
            <View style={styles.title}>
                <Text onPress={copyToClipboard} style={styles.titleText}>{wallet.address.slice(0,6)}...{wallet.address.slice(38)}</Text>
                <Text style={styles.explain} >
                    Copy your wallet address above and send USDC to it to begin your journey!
                </Text>
                <Text style={styles.explain}>
                    You won't be able to continue until your balance reflects a value greater than $0.00
                </Text>
            </View>
            {balance == "0.00" ? <Text style={styles.explain}>Waiting for funds...</Text> : <Button title="Continue" color="#FFA500" onPress={() => navigation.navigate('Home', {name: name, weight: weight, goal: goal, date: date, direction: direction, delta: delta, privateKey: wallet.privateKey, address: wallet.address, deltaPath: deltaTrack})}/>}
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 50,

    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    explain: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    balanceDisplay: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
       
    },
});

