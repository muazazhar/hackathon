import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    width: (windowWidth / 10) * 8,
    height: (windowHeight / 10) * 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    borderRadius: 50,
    borderColor: '#52cdfa',
    borderWidth: 2,
    alignContent: 'center',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 19,
    marginLeft: 10,
    width: '80%',
    color: '#807D89',
    // fontWeight: 'bold',s
  },
  text: {
    color: '#807D89',
    fontSize: 18,
    marginLeft: '15%',
  },
});
