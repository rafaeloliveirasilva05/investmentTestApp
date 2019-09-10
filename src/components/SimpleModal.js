import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

function SimpleModal({ description, title, closeStateModalOpen }) {

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 25, marginTop: 150 }}>
        <Text style={styles.titleTextStyle}>{title}</Text>
        <Text style={styles.descriptionTextStyle}>
          {description}
        </Text>
      </View>

      <View style={{ marginTop: 200 }}>
        <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}
          onPress={closeStateModalOpen}>
          Enviar nova mensagem
          </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  titleTextStyle: {
    fontSize: 18,
    color: '#A9A9A9',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  descriptionTextStyle: {
    fontSize: 22,
    color: '#696969',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default SimpleModal
