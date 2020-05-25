import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
export default function CustomBtn(props) {
  const [bg, setBg] = useState("#f5f5f5");
  const [txtBg, setTxtBg] = useState("#222");
  return (
    <TouchableOpacity
    activeOpacity={0.7}
      
      onPress={() => {
        props.handleClick()
      }}
      style={[styles.btnAction, { backgroundColor: 'rgba(255,255,255,0.8)' }]}
    >
      <MaterialCommunityIcons
        name={`${props.icon}`}
        color={`${txtBg}`}
        size={20}
      />
      <Text style={[styles.textAction, { color: txtBg }]}>
        {"  "} {props.text}
      </Text>
    </TouchableOpacity>
  );
}
