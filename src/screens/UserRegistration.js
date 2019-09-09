import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import FloatingLabelInput from '../components/FloatingLabelInput'

class UserRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      isRegisterEmail: true
    }
  }

  handleSubmit = () => { console.tron.log('seletor', this.state) }

  validationEmail = () => {
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    return emailPattern.test(this.state.email)
  }

  render() {
    return (
      <ScrollView
        style={{ marginTop: 30, marginHorizontal: 25 }}
        keyboardShouldPersistTaps='always'>

        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Contato</Text>

        <FloatingLabelInput
          label='Nome'
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          clearInput={() => this.setState({ name: '' })} />

        {this.state.isRegisterEmail &&
          <FloatingLabelInput
            label='Email'
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            clearInput={() => this.setState({ email: '' })}
            borderColor={this.state.email === '' ? '#555' : (this.validationEmail() ? 'green' : 'red')}
          />
        }

        <FloatingLabelInput
          label='Telefone'
          value={this.state.phone}
          onChangeText={(text) => this.setState({ phone: text })}
          clearInput={() => this.setState({ phone: '' })} />

        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity
            style={[styles.registerEmailButtonStyle, { backgroundColor: this.state.isRegisterEmail ? 'red' : '#fff' }]}
            onPress={() => this.setState({ isRegisterEmail: !this.state.isRegisterEmail })}>
          </TouchableOpacity>
          <Text>Gostaria de cadastrar meu email</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButtonStyle}
          onPress={this.handleSubmit}>
          <Text style={{ color: '#fff', fontSize: 16, }}>Eviar</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  registerEmailButtonStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 2,
    marginRight: 15
  },
  submitButtonStyle: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 60,
    borderRadius: 100,
    marginBottom: 30
  }
})

export default UserRegistration