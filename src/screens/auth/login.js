import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
} from 'react-native';
import Input from '../../components/input';
import Btn from '../../components/button';
import auth from '@react-native-firebase/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  // if (email == 'admin@admin.com') {
  //   alert('admin@admin.com');
  // }
  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        alert(`signed in with ${email}`);
        props.navigation.navigate(
          email === 'admin@admin.com' ? 'Admin' : 'Home',
        );
        console.log('signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        alert(error);
      });
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
        <Pressable
          onPress={() => console.log('sd')}
          style={(styles.pressable, {alignSelf: 'flex-end'})}>
          <Text style={styles.text}>Forgot Password?</Text>
        </Pressable>

        <Btn text="LOGIN" action={() => login()} />
      </View>
      <View style={styles.signUpView}>
        <Text style={styles.text}>Don't have an account? </Text>
        <Pressable
          onPress={() => props.navigation.navigate('Signup')}
          style={styles.pressable}>
          <Text style={(styles.text, {color: '#4bbae3', fontSize: 20})}>
            SignUp
          </Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default Login;
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
    flex: 3,
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
});
