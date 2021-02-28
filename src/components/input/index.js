import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './style';
const Input = ({
  placeholder,
  keyboardType,
  icon,
  secureTextEntry,
  onChangeText,
  editable,
}) => {
  const [isRequired, setIsRequired] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Icon name={icon} size={30} color="#807D89" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          selectionColor="#807D89"
          placeholderTextColor="#807D89"
          paddingHorizontal={5}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          editable={editable}
        />
      </View>
    </View>
  );
};

export default Input;
