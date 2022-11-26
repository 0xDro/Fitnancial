import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import LOGO from './assets/LOGO.png';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';



export default function App() {

  const [textEmail, setTextEmail] = useState('');
  const [textPassword, setTextPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.container}>
      
        <View style={styles.opening}>
          <Text style={styles.openingText}>The right path to your weight goals</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={LOGO} style={styles.logoimg} />
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
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            value={textPassword}
            onChangeText={setTextPassword}
            secureTextEntry={true}
          />
          <View style={styles.button} >
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
  
      </View>
      <StatusBar style="auto" />
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,


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
    width: '15%',
    height: '15%',
  },
  signUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 30,
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
  }
});
