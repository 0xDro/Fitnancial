import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import "@ethersproject/shims";
import {ethers} from 'ethers';
import { USDCABI, USDCADR, PROVIDER } from '../abi/USDCABI';
import UserInfo from './UserInfo';
import FITNANCIAL from '../assets/fitnancialsmall.png';




export default function Home({route}) {

    const {name, weight, goal, date, direction, delta, walletgen, deltaPath} = route.params;
    const [currentWeight, setCurrentWeight] = useState(weight);
    console.log("wallet in home ",walletgen)
    const [userInfo, setUserInfo] = useState({
        name: name,
        weight: weight,
        goal: goal,
        date: date,
        deltaPath: deltaPath,
        delta: delta,
        // chairty: chairty,
    });
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let today = month + "/" + day + "/" + year;
    
    const [onTrack, setOnTrack] = useState("not");
    const [wallet, setWallet] = useState();
    const [contractKeep, setContractKeep] = useState();
    const [balance, setBalance] = useState("0.00");
    const [adr, setAdr] = useState();
    const [pk, setPk] = useState();
    const [nextGoalDate, setNextGoalDate] = useState('');
    const [nextGoalWeight, setNextGoalWeight] = useState('');
    const [directionTerm, setDirectionTerm] = useState('');

  

    const [data, setData] = useState([{
        id: 1,
        date: today,
        weight: userInfo.weight,
        result: "- $0.00"
    }]);
    
    const navigation = useNavigation();
    const onWalletClick = () => {
        navigation.navigate('Wallet', {
           privateKey: pk,
           address: adr
        });
    };
    useEffect(() => {
        const contract = new ethers.Contract(USDCADR, USDCABI, walletgen);

        const currentMonth = parseInt(today.slice(0,2));
        const currentDay = parseInt(today.slice(3,5));
        const currentYear = parseInt(today.slice(6,10));
        if (currentDay + 7 > 31) {
            if (currentMonth + 1 > 12) {
                setNextGoalDate("01/" + (currentDay + 7 - 31) + "/" + (currentYear + 1));
            } else {
                setNextGoalDate((currentMonth + 1) + "/" + (currentDay + 7 - 31) + "/" + currentYear);
            }
        } else {
            setNextGoalDate(currentMonth + "/" + (currentDay + 7) + "/" + currentYear);
        }

        if (direction == "gain") {
            setNextGoalWeight((parseFloat(userInfo.weight) + parseFloat(userInfo.deltaPath)).toString());
            setDirectionTerm("at least");
        } else if (direction == "lose") {
            setNextGoalWeight((parseFloat(userInfo.weight) - parseFloat(userInfo.deltaPath)).toString());
            setDirectionTerm("at most");
        }

        setWallet(walletgen);
        setContractKeep(contract);
        setAdr(walletgen.address);
        setPk(walletgen.privateKey);
        const getBalance = async() => {
            const balance = ethers.BigNumber.from(await contract.balanceOf(walletgen.address));
            if (ethers.utils.formatUnits(balance, 18).length == 3  ){
                setBalance(ethers.utils.formatUnits(balance, 18) + "0");
            } else if (ethers.utils.formatUnits(balance, 18).length == 4){
                setBalance(ethers.utils.formatUnits(balance, 18));
            } else {
                setBalance(ethers.utils.formatUnits(balance, 18).slice(0,ethers.utils.formatUnits(balance, 18).length - 1 ) );
            }
            
        }
        getBalance();
        contract.on("Transfer", (from, to, amount) => {
            if (to == walletgen.address) {
                getBalance();
            }
        })

    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Image source={FITNANCIAL} />
                <Button title="Wallet" color="#FFA500" onPress={onWalletClick}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Hello {userInfo.name}!</Text>
                <Text style={styles.bodyText}>Your current weight is {userInfo.weight} lbs. </Text>
                <View style={styles.bigspacer}/>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}> ${balance}</Text>
                </View>
                <View style={styles.bigspacer}/>
                <View style={styles.dataGrid}>
                    <View style={styles.labels}>
                        <Text style={styles.labelText}>Date</Text>
                        <Text style={styles.labelText}>Weight</Text>
                        <Text style={styles.labelText}>Result</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.dataBlock}>
                            {data.map(date => {
                               return( 
                                <>
                                    <Text key={date.id} style={styles.dataText}>{date.date}</Text>
                                    <View key={date.date} style={styles.spacer}>
                                    </View>
                                </>
                               )
                            })}
                            
                        </View>
                        <View style={styles.dataBlock}>
                        {data.map(date => {
                               return (
                                <>
                                <Text key={date.id} style={styles.dataText}>{date.weight}</Text>
                                <View key={date.date} style={styles.spacer}>
                                </View>
                                </>
                               );
                            })}
                        </View>
                        <View style={styles.dataBlock}>
                        {data.map(date => {
                               return (
                               <>
                               <Text key={date.id} style={styles.dataText}>{date.result}</Text>
                                 <View key={date.date} style={styles.spacer}>
                                </View>
                               </>
                               );
                            })}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>You have to be {directionTerm} {nextGoalWeight} pounds by your next weigh in on {nextGoalDate} </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 25,
        paddingTop: 50,
        height: '100%',
        width: '100%'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 50,
    },
    bodyText: {
        fontSize: 20,
    },
    balanceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
    },
    balanceText: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    dataGrid: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: 'auto',

    },
    labels: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,

    },
    labelText: {
        fontSize: 20,
       
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },

    dataText: {
        fontSize: 15,
    },
    spacer: {
        height: 10,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 100,
    },
    bigspacer: {
        height: 20,
    },
    footerText: {
        fontSize: 20,
        textAlign: 'center',
    },


});
