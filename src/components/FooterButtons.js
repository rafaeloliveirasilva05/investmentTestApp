import React from 'react'
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'

const FooterButtons = ({ onPressTrustFund, onPressUserRegistration, screen }) => {

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <TouchableOpacity
        onPress={onPressTrustFund}
        style={{ height: screen === 'TrustFund' ? 45 : 40, backgroundColor: 'blue', flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Investimento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressUserRegistration}
        style={{ height: screen === 'UserRegistration' ? 45 : 40, backgroundColor: 'red', flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Contato</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FooterButtons