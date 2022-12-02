import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import  * as Clipboard from 'expo-clipboard';
import { ethers } from 'ethers';
import { USDCABI, USDCADR, PROVIDER } from '../abi/USDCABI';



export default function Wallet({route}){

    //STATE SETTING FOR REPAYMENT
    const {privateKey, address} = route.params;
    const [balance, setBalance] = useState("0.00");
    const [wallet, setWallet] = useState();
    const [contractKeep, setContractKeep] = useState();

    
    const copyToClipboard = async() => {
      
        await Clipboard.setStringAsync(wallet.address);
    };
    //Navigation back to home passing no state
    const navigation = useNavigation();
    const goHome = () => {
        navigation.navigate('Home', {
          
        });
    }

    //Creates Ethers objects on render
    useEffect(() => {

        const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(USDCADR, USDCABI, provider);
        setWallet(wallet);
        setContractKeep(contract);
        const getBalance = async() => {
            const balance = ethers.BigNumber.from(await contract.balanceOf(wallet.address));
            if (ethers.utils.formatUnits(balance, 18).length == 3){
                setBalance(ethers.utils.formatUnits(balance, 18) + "0");
            } else if (ethers.utils.formatUnits(balance, 18).length == 4){
                setBalance(ethers.utils.formatUnits(balance, 18));
            } else {
                setBalance(ethers.utils.formatUnits(balance, 18).slice(0,ethers.utils.formatUnits(balance, 18).length  ) );
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
            <View style={styles.header}>
                <Text onPress={copyToClipboard} style={styles.addressDisplay}>{address.slice(0,6)}...{address.slice(38)}</Text>
                <Text style={styles.balanceDisplay}>${balance}</Text>
            </View>
            <View style={styles.title}>
             <Text style={styles.explain}>copy the address above and send USDC to it to deposit more money</Text>
            </View>
            <View onTouchEnd={goHome} style={styles.footer}>
                <Text style={styles.buttonText}> Home </Text>
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
        height: '100%',
        paddingTop: 50,
        paddingBottom: 50,

    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    addressDisplay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
    },
    balanceDisplay: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        textAlign: 'center',
    },
    explain: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    footer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#000',
        padding: 10,

    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },


});
