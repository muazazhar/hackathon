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
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';

const Admin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usersData = [];
    database()
      .ref('users')
      //   .orderByChild('isDonor')
      //   .equalTo(true)
      .once('value')
      .then((results) => {
        results.forEach((snapshot) => {
          usersData.push(snapshot.val());
        });
        setData(usersData);
        console.log('setData', setData);
        setIsLoading(false);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollView}></ScrollView>
    </View>
  );
};

export default Admin;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    color: '#52cdfa',
  },
  scrollView: {
    backgroundColor: 'red',
    flex: 2,
  },
});
