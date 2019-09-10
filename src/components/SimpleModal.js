import React from 'react'
import {
  View,
  Modal,
  StyleSheet,
  Text
} from 'react-native'

function SimpleModal({ description, title }) {

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType='fade'>

      <View style={styles.container}>
        <Text style={styles.titleTextStyle}>{title}</Text>
        <Text style={styles.descriptionTextStyle}>
          {description}
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionTextStyle: {
    fontSize: 18,
    color: '#000'
  }
})

export default SimpleModal
