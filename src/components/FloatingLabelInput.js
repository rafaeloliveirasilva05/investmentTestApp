import React, { Component } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../styles/color'
class FloatingLabelInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false
    }
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: isFocused || this.props.value !== '' ? 0 : 18,
      color: isFocused || this.props.value !== '' ? '#000' : '#aaa',
      fontSize: isFocused || this.props.value !== '' ? 14 : 20,
    }

    return (
      <View style={{ paddingTop: 18, backgroundColor: 'white', marginTop: 10 }}>
        <Text style={labelStyle}>{label}</Text>
        <View style={{ flexDirection: 'row', }}>
          <TextInput
            {...props}
            style={[styles.inputStyle, { borderBottomColor: this.props.borderColor }]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur} />

          {this.props.value !== '' &&
            <TouchableOpacity
              style={styles.clearInputStyle}
              onPress={this.props.clearInput}>
              <Icon name='close' size={18} color={Colors.DarkGray} />
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 20,
    padding: 0,
    color: '#000',
    borderBottomWidth: 1
  },
  clearInputStyle: {
    justifyContent: 'center',
    alignItems: "center",
    height: 20,
    width: 20,
    position: 'absolute',
    right: 0
  }
})

export default FloatingLabelInput
