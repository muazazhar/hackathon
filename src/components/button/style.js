import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#4bbae3',
    width: (windowWidth / 10) * 8,
    height: (windowHeight / 100) * 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
    color: '#fff',
  },
});
