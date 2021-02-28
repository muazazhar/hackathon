import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const company = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const usersData = [];
    database()
      .ref(`users/Student`)
      .orderByChild('profileCompleted')
      .equalTo(true)
      .once('value')
      .then((results) => {
        console.log('res', results);
        results.forEach((snapshot) => {
          donorsData.push(snapshot.val());
          console.log('snapshot', snapshot);
        });
        setData(usersData);
        console.log(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#e32b49" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>asd</Text>
    </ScrollView>
  );
};
export const student = () => {
  return <View></View>;
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // padding: 20,
    alignItems: 'center',
  },
  card: {
    width: (windowWidth / 10) * 8,
    width: (windowHeight / 10) * 2,
  },
});
