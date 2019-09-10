import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import axios from 'axios'

import FloatingLabelInput from '../components/FloatingLabelInput'
import SimpleModal from '../components/SimpleModal'

class UserRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cells: null,
      stateModalOpen: false
    }
  }

  async componentDidMount() {
    try {
      const url = 'https://floating-mountain-50292.herokuapp.com/cells.json'
      const fieldInformation = await axios.get(url)

      const cells = fieldInformation.data.cells.map(data => {
        return {
          ...data,
          dataInput: '',
          error: null
        }
      })

      this.setState({ cells })

    } catch (error) {
      console.tron.log('error', error)
    }
  }

  handleSubmit = () => {
    if (this.validateFilds()) {

      let cells = this.state.cells.map(element => {
        return {
          ...element,
          dataInput: '',
          error: null
        }
      })

      this.setState({ stateModalOpen: true, cells })
    }
  }

  validateFilds = () => {
    let cellWithValidatedInput = this.state.cells
    let isValidFields = true

    this.state.cells.forEach((element, position) => {
      if (element.type === 1) {

        if (element.typefield === 1 && element.dataInput === '') {
          cellWithValidatedInput[position].error = true
          isValidFields = false
        }

        else if (element.typefield === 2 || element.typefield === 'telnumber' && !this.phoneValidation(element.dataInput)) {
          cellWithValidatedInput[position].error = true
          isValidFields = false
        }

        else if (element.typefield === 3 && !this.emailValidation(element.dataInput)) {
          cellWithValidatedInput[position].error = true
          isValidFields = false
        }

        else if (element.dataInput !== '' && element.error) {
          cellWithValidatedInput[position].error = false
        }
      }
    })

    if (!isValidFields) {
      Alert.alert('Aviso', 'Preencha os intens destacados pra prosseguir')
    }

    this.setState({ cells: cellWithValidatedInput })
    return isValidFields
  }

  emailValidation = (email) => {
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    return emailPattern.test(email)
  }

  phoneValidation = (phone) => {
    const phonelPattern = /\(\d{2}\)\s\d{4,5}\-\d{4}/g
    return phonelPattern.test(phone)
  }

  insertMaskIntoPhone = (phone) => {
    if (phone.length >= 16)
      return phone.substring(0, 15)

    phone = phone.replace(/[\(\)\' '\-]/g, '')
    phone = phone.split('')

    if (phone.length > 6 && phone.length <= 10) {
      phone.splice(6, 0, '-')
    }
    else if (phone.length >= 11) {
      phone.splice(7, 0, '-')
    }

    phone.splice(0, 0, '(')
    phone.splice(3, 0, ') ')

    return phone.join('')
  }

  insertData = (inputData, position) => {
    let cellWithInputData = this.state.cells

    inputData = cellWithInputData[position].typefield === 'telnumber' ? this.insertMaskIntoPhone(inputData) : inputData

    cellWithInputData[position].dataInput = inputData
    cellWithInputData[position].error = false

    this.setState({ cells: cellWithInputData })
  }

  clearInput = (position) => {
    let cells = this.state.cells

    cells[position].dataInput = ''

    this.setState({ cells })
  }

  marckCheckBox = (position) => {
    let cells = this.state.cells

    if (cells[position].dataInput === '' || cells[position].dataInput === false) {
      cells[position].dataInput = true
    } else {
      cells[position].dataInput = false
    }

    this.setState({ cells })
  }

  setColorBorder = (formElementData) => {
    let borderColor = formElementData.error ? 'red' : '#555'

    if (formElementData.typefield === 3) {
      borderColor = formElementData.dataInput === '' ? '#555' : (this.emailValidation(formElementData.dataInput) ? 'green' : 'red')
      borderColor = formElementData.error ? 'red' : borderColor
    }

    return borderColor
  }

  chooseKeyboardType = (typefield) => {
    let keyboardType = 'default'

    if (typefield === 'telnumber' || typefield === 2) {
      keyboardType = 'phone-pad'
    }

    if (typefield === 3) {
      keyboardType = 'email-address'
    }

    return keyboardType
  }

  defineFormElements = (formElementData, position) => {
    if (formElementData.type === 1) {
      return (
        <FloatingLabelInput
          label={formElementData.message}
          value={formElementData.dataInput}
          onChangeText={(inputData) => this.insertData(inputData, position)}
          clearInput={() => this.clearInput(position)}
          borderColor={this.setColorBorder(formElementData)}
          keyboardType={this.chooseKeyboardType(formElementData.typefield)} />
      )
    }

    if (formElementData.type === 2) {
      return (<Text>{formElementData.message}</Text>)
    }

    if (formElementData.type === 4) {
      let isCheckboxChecked = (formElementData.dataInput === '' || formElementData.dataInput === false)

      return (
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity
            style={[styles.registerEmailButtonStyle, { backgroundColor: isCheckboxChecked ? '#fff' : 'red' }]}
            onPress={() => this.marckCheckBox(position)}>
          </TouchableOpacity>
          <Text>{formElementData.message}</Text>
        </View>
      )
    }

    if (formElementData.type === 5) {
      return (
        <TouchableOpacity
          style={styles.submitButtonStyle}
          onPress={this.handleSubmit}>
          <Text style={{ color: '#fff', fontSize: 16, }}>{formElementData.message}</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    if (!this.state.cells) return null

    return (
      <>
        {this.state.stateModalOpen &&
          <SimpleModal
            title={'Obrigado'}
            description={'Mensagem enviada com sucesso :)'}
            closeStateModalOpen={() => this.setState({ stateModalOpen: false })} />
        }

        <ScrollView
          style={{ marginTop: 30, marginHorizontal: 25 }}
          keyboardShouldPersistTaps='always'>

          {this.state.cells.map((element, position) => this.defineFormElements(element, position))}
        </ScrollView>
      </>
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
