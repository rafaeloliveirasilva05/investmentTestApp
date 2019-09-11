import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'

import Colors from '../styles/color'

const Button = ({ onPress, label }) => {
  return (
    <TouchableOpacity
      style={styles.submitButtonStyle}
      onPress={onPress}>
      <Text style={{ color: '#fff', fontSize: 16, }}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  submitButtonStyle: {
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 60,
    borderRadius: 100,
    marginBottom: 30
  }
})

export default Button