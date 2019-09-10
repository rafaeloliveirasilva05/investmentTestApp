import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'




class TrustFund extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investmentData: null
    }
  }

  async componentDidMount() {
    try {
      const url = 'https://floating-mountain-50292.herokuapp.com/fund.json'
      const investmentData = await axios.get(url)

      console.tron.log('seletor', investmentData.data.screen)

      this.setState({ investmentData: investmentData.data.screen })

    } catch (error) {
      console.tron.log('error', error)
    }
  }

  investmentRiskChart = (risk) => {
    const informationEachRisk = [
      {
        risk: 1,
        color: '#7CFC00',
      },
      {
        risk: 2,
        color: '#228B22'
      },
      {
        risk: 3,
        color: '#FFFF00'
      },
      {
        risk: 4,
        color: '#FFA500'
      },
      {
        risk: 5,
        color: '#FFA500'
      }
    ]

    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {informationEachRisk.map(element => {

          let isRisk = element.risk === risk || false
          return (
            <View style={styles.containerBoxRisk}>
              <View style={[styles.containerArrow, { display: isRisk ? 'flex' : 'none' }]}>
                <Icon name='angle-down' size={28} color="#999" />
              </View>
              <View style={{
                borderTopStartRadius: element.risk === 1 ? 15 : 0,
                borderBottomStartRadius: element.risk === 1 ? 15 : 0,
                borderTopEndRadius: element.risk === 5 ? 15 : 0,
                borderBottomEndRadius: element.risk === 5 ? 15 : 0,
                backgroundColor: element.color,
                height: isRisk ? 15 : 8,
                width: '100%'
              }} />
            </View>)
        })}
      </View>
    )
  }

  render() {
    if (!this.state.investmentData) return null

    const { investmentData } = this.state

    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Investimento</Text>
          <View style={{ width: 30, height: 30, position: 'absolute', right: 0 }}>
            <IconEntypo name="share-alternative" size={28} color="#999" />
          </View>
        </View>
        <Text style={{ textAlign: 'center' }}>{investmentData.title}</Text>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>{investmentData.fundName}</Text>
        <Text style={{ textAlign: 'center', fontSize: 14 }}>{investmentData.whatIs}</Text>
        <Text style={{ textAlign: 'center', fontSize: 14 }}>{investmentData.definition}</Text>

        <Text style={{ textAlign: 'center', fontSize: 14 }}>{investmentData.riskTitle}</Text>

        {this.investmentRiskChart(investmentData.risk)}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  containerArrow: {
    paddingVertical: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  containerBoxRisk: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#fff'
  }
})

export default TrustFund