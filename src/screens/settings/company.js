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
  Image,
} from 'react-native';
import Input from '../../components/input';
import Btn from '../../components/button';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';
const signOut = (props) => {
  auth()
    .signOut()
    .then(() => {
      //   props.navigation.navigate('Login');
      ToastAndroid.show('User signed out !', ToastAndroid.LONG);
    })
    .catch((err) => alert(err));
};

const Settings = (props) => {
  const currentUser = auth().currentUser;
  const [selectDegree, setSelectDegree] = useState();
  const [name, setName] = useState('');
  const [number, setNumber] = useState();
  const save_data = () => {
    let userData = {
      number,
      jobSearch: selectDegree,
      name,
    };
    database().ref(`/users/Company/${currentUser.uid}`).set(userData);
  };
  let customNa = '';

  useEffect(() => {
    database()
      .ref(`allUsers/${currentUser.uid}`)
      .once('value')
      .then((results) => {
        console.log('result', results);
        customNa = JSON.stringify(results);
      });
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileView}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.profileChild}>
          <Image
            style={styles.profileImg}
            source={{
              uri: 'https://img.icons8.com/bubbles/2x/user-male.png',
            }}
          />
          <Text style={{fontSize: 23, color: '#807D89'}}>Welcome Company</Text>
          <TouchableOpacity
            onPress={() => {
              signOut();
              props.navigation.navigate('Login');
            }}>
            <Icon name={'exit'} size={30} color="#807D89" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.ScrollView}>
          <Input
            placeholder="Company Name"
            keyboardType="default"
            icon="person-outline"
            secureTextEntry={false}
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <Input
            placeholder="Phone Number"
            keyboardType="default"
            icon="smartphone"
            secureTextEntry={false}
            value={number}
            onChangeText={(e) => setNumber(e)}
          />

          <Picker
            style={styles.picker}
            selectedValue={selectDegree}
            onValueChange={(itemValue, itemIndex) =>
              setSelectDegree(itemValue)
            }>
            <Picker.Item label="Web Developer" value="web" />
            <Picker.Item label="Android Developer" value="and" />
            <Picker.Item label="IOS Developer" value="ios" />
          </Picker>
          <Btn text="SAVE" action={() => save_data()} />
        </ScrollView>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          activeOpacity={0.9}>
          <Icon name="home-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(
              customNa === '"Student"' ? 'Student' : 'Company',
            )
          }
          activeOpacity={0.9}>
          <Icon name="settings-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Settings;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    color: '#52cdfa',
  },
  profileView: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: (windowWidth / 10) * 8,
  },
  scrollContainer: {
    // backgroundColor: 'red',
    flex: 4,
  },
  ScrollView: {
    // backgroundColor: 'yellow',
    flex: 1,
    minHeight: 550,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  picker: {
    borderRadius: 50,
    backgroundColor: '#52cdfa',
    borderWidth: 2,
    alignContent: 'center',
    color: '#fff',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    fontSize: 18,
    textAlign: 'center',
  },
  tabs: {
    backgroundColor: '#52cdfa',
    width: windowWidth,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
