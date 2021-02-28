import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let customNa = '';

  useEffect(() => {
    database()
      .ref(`allUsers/${currentUser.uid}`)
      .once('value')
      .then((results) => {
        // console.log('result', results);
        customNa = JSON.stringify(results);
      });
  }, []);
  const currentUser = auth().currentUser;
  // console.log(currentUser.uid);
  const get_data = () => {
    const usersData = [];
    database()
      .ref(`users/Student`)
      .orderByChild('profileCompleted')
      .equalTo(true)
      .once('value')
      .then((results) => {
        console.log('res', results);
        results.forEach((snapshot) => {
          usersData.push(snapshot.val());
          console.log('snapshot', snapshot);
        });
        setData('usersData', data);
        console.log(data);
        setIsLoading(false);
      });
  };

  // auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     // User is signed in.
  //     // console.log(user);
  //   } else {
  //     // No user is signed in.
  //     console.log('no user');
  //   }
  // });
  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntxt}>Get Companies Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => get_data()}>
            <Text style={styles.btntxt}>Get Student Info</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView>
          {data?.map((v, i) => {
            return (
              <View key={v.uid} style={styles.card}>
                {v.photo && (
                  <Image
                    source={{uri: v.photo}}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                    }}
                  />
                )}
                <View style={{flex: 3, padding: 10}}>
                  <Text style={{fontSize: 25, color: '#f23c5a'}}>{v.name}</Text>
                  <Text style={{fontSize: 17, color: '#f23c5a'}}>
                    {v.location}
                  </Text>
                </View>
                <View style={styles.blood}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                    }}>
                    {v.bloodType}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          activeOpacity={0.9}>
          <Icon name="home-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(customNa, 'on');
            props.navigation.navigate(
              customNa === '"Student"' ? 'Student' : 'Company',
            );
          }}
          activeOpacity={0.9}>
          <Icon name="settings-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // padding: 20,
    alignItems: 'center',
  },
  cont: {
    // backgroundColor: 'red',
    width: windowWidth,
    flex: 12,
    paddingVertical: 20,
  },
  tabs: {
    backgroundColor: '#52cdfa',
    width: windowWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#4bbae3',
    width: (windowWidth / 10) * 5,
    height: (windowHeight / 100) * 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btntxt: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
});
