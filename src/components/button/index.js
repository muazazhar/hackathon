import React from 'react';
import {Text, TouchableHighlight, StyleSheet, Dimensions} from 'react-native';
import {styles} from './style';
const Btn = ({text, action}) => {
  return (
    <TouchableHighlight
      style={styles.btn}
      onPress={action}
      underlayColor="#42a5c9">
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

export default Btn;
