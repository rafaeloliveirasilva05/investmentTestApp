import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import UserRegistration from './screens/UserRegistration'
import TrustFund from './screens/TrustFund'

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <UserRegistration />  */}
      <TrustFund /> 
      {/* <View style={{ height: 40, backgroundColor: 'green', flexDirection: 'row' }}>

        <TouchableOpacity style={{ backgroundColor: 'blue', flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Investimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'red', flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Contato</Text>
        </TouchableOpacity>

      </View> */}
    </View>
  )
}

export default App
