import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/input';
import Btn from '../../components/button';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Signup = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [signedAs, setSignedAs] = useState('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    isEnabled ? setSignedAs('Company') : setSignedAs('Student');
  };
  //   console.log(signedAs);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#52cdfa" />
      </View>
    );
  }
  const signup = () => {
    setIsLoading(true);
    let user = {
      name,
      profileCompleted: false,
    };
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userData) => {
        console.log('usered', userData);
        ToastAndroid.show(`signed in with ${email}`, ToastAndroid.SHORT);
        database()
          .ref('/')
          .child(`users/${signedAs}/${userData.user.uid}`)
          .set(user);
        database()
          .ref('/')
          .child(`allUsers/${userData.user.uid}`)
          .set(signedAs);
        console.log(signedAs);
        props.navigation.navigate(
          signedAs == 'Student' ? 'Student' : 'Company',
        );
        alert('Please complete your PROFILE');
        console.log('User account created & signed in!');
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        console.error(error);
      });
    console.log(email, 'email');
    console.log(pass, 'pass');
    console.log(user);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.textView}>
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.text}>Please Login or Signup to continue</Text>
      </View>
      <View style={styles.loginForm}>
        <ScrollView contentContainerStyle={styles.ScrollView}>
          <Input
            placeholder="Full Name"
            keyboardType="default"
            icon="person-outline"
            secureTextEntry={false}
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <Input
            placeholder="Enter Email"
            keyboardType="email-address"
            icon="mail-outline"
            secureTextEntry={false}
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <Input
            text="Password"
            placeholder="Enter Password"
            keyboardType="default"
            icon="lock-outline"
            secureTextEntry={true}
            value={pass}
            onChangeText={(e) => setPass(e)}
          />
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Switch
              trackColor={{false: '#4bbae3', true: '#bdbdbd'}}
              thumbColor={isEnabled ? '#4bbae3' : '#bdbdbd'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.text}>Register as {signedAs}</Text>
          </View>
          <Btn text="SIGN UP" action={() => signup()} />
        </ScrollView>
      </View>
      <View style={styles.signUpView}>
        <Text style={styles.text}>Already have an account? </Text>
        <Pressable
          onPress={() => props.navigation.navigate('Login')}
          style={styles.pressable}>
          <Text style={(styles.text, {color: '#4bbae3', fontSize: 20})}>
            Login
          </Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Signup;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
  },
  textView: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  header: {
    fontSize: 35,
    color: '#52cdfa',
  },
  text: {
    fontSize: 18,
    color: '#807D89',
  },
  loginForm: {
    flex: 4,
    justifyContent: 'space-evenly',
    // backgroundColor: 'yellow',
  },
  signUpView: {
    flex: 1,
    // backgroundColor: 'green',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  pressable: {
    color: '#807D89',
    fontSize: 20,
  },
  ScrollView: {
    // backgroundColor: 'red',
    minHeight: 400,
    flex: 1,
    // paddingVertical: 5,
    justifyContent: 'space-evenly',
  },
});
