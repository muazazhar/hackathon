import React from 'react';
import CheckBox from '@react-native-community/checkbox';
const Checkbox = () => {
  return (
    <CheckBox
      disabled={true}
      value={true}
      tintColors={true ? '#6FF7E4' : '#807D89'}
      boxType="square"
      onCheckColor="#6FF7E4"
      onTintColor="#6FF7E4"
    />
  );
};
export default Checkbox;
