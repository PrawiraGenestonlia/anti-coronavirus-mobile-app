/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

Icon.loadFont();

export default function TabBarIcon(props) {
  return (
    <Icon
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#2f95dc' : '#ccc'}
    />
  );
}
