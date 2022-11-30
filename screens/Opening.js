import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import LOGO from '../assets/LOGO.png';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FITNANCIAL from '../assets/fitnancial.png';



export default function Opening() {

  const [textEmail, setTextEmail] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errMsgEmail, setErrMsgEmail] = useState('');
  const [errMsgPassword, setErrMsgPassword] = useState('');

  const navigation = useNavigation();

  const onSignUp = () => {
    if (/\S+@\S+\.\S+/.test(textEmail)) {
      setErrMsgEmail('');
      if(textPassword.length != 0) {
        setErrMsgPassword('');
        navigation.navigate('UserInfo');


      } else {
        setErrMsgPassword('Please enter a password');
      }
    } else {
      setErrMsgEmail('Email Address is not valid');
      if(textPassword.length != 0) {
        setErrMsgPassword('');
        navigation.navigate('UserInfo');
   

      } else {
        setErrMsgPassword('Please enter a password');
      }
    }
    

  };
  if (loggedIn == false) {

    return (
      <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        
          <View style={styles.opening}>
            <Text style={styles.openingText}>The right path to your weight goals</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image source={FITNANCIAL} style={styles.logoimg} />
            <Text style={styles.logo}>Fitnancial</Text>
          </View>
          <View style={styles.signUp}>
            <TextInput 
              style={styles.input} 
              placeholder="Email" 
              value={textEmail} 
              onChangeText={setTextEmail}
              keyboardType="email-address"
            />
            <Text style={styles.errMsgText}>{errMsgEmail}</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              value={textPassword}
              onChangeText={setTextPassword}
              secureTextEntry={true}
            />
            <Text style={styles.errMsgText}>{errMsgPassword}</Text>
            <View style={styles.button} onTouchEnd={onSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
            <Text style={styles.loginText}>Already have an account? Log in</Text>
    
        </View>
        <StatusBar style="auto" />
      </View>
      </KeyboardAvoidingView>
      </>
  );} else {
    return(
      <></>
    );
  }}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 25,
    


  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 'auto',
    width: 'auto',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  logoimg: {

  },
  signUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  opening: {
  },
  openingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    textAlign: 'center',
    width: 300,
  },
  button: {
    width: 300,
    backgroundColor: '#000',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginText: {
    color: '#0000FF',
    padding: 10,
    fontSize: 15,
  },
  errMsgText: {
    color: 'red',
    fontSize: 13,
    paddingBottom: 10,
  },
});
