import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default function App(WrappedComponent, teste) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <WrappedComponent {...this.props} />

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TrustFund')}
                style={{ height: 40, backgroundColor: 'blue', flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Investimento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserRegistration')}
                style={{ height: 40, backgroundColor: 'red', flex: 1, justifyContent: "center", alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Contato</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )
    }
  }
}