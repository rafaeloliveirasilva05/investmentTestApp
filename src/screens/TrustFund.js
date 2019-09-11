import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
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
            <View
              style={styles.containerBoxRisk}
              key={element.risk}>
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

  investmentTable = (investmentInformation) => {
    return (
      <View style={{ height: 100, flexDirection: 'row', marginTop: 30, marginBottom: 40 }}>
        <View style={{ flex: 2, justifyContent: 'space-between' }}>
          <Text />
          <Text style={styles.labelStyle}>No mês</Text>
          <Text style={styles.labelStyle}>No ano</Text>
          <Text style={styles.labelStyle}>12 meses</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.labelStyle}>Fundo</Text>
          <Text style={styles.investmentTextStyle}>{`${investmentInformation.month.fund}%`}</Text>
          <Text style={styles.investmentTextStyle}>{`${investmentInformation.year.fund}%`}</Text>
          <Text style={styles.investmentTextStyle}>100</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.labelStyle}>CDI</Text>
          <Text style={styles.investmentTextStyle}>{`${investmentInformation.month.CDI}%`}</Text>
          <Text style={styles.investmentTextStyle}>{`${investmentInformation.year.CDI}%`}</Text>
          <Text style={styles.investmentTextStyle}>100</Text>
        </View>
      </View>
    )
  }
  
  moreInformationInvestment = (investmentInformation) => {
    return (
      investmentInformation.map(element => {
        return (
          <View style={styles.containerMoreInformationInvestment}>
            <Text style={styles.labelStyle}>{element.name}</Text>
            <Text style={styles.investmentTextStyle}>{element.data}</Text>
          </View>
        )
      })
    )
  }

  render() {
    if (!this.state.investmentData) return null
    const { investmentData } = this.state

    return (
      <ScrollView style={styles.container}>

        <View style={{ flexDirection: 'row', marginVertical: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#696969' }}>Investimento</Text>
          <View style={{ width: 30, height: 30, position: 'absolute', right: 0 }}>
            <IconEntypo name="share-alternative" size={28} color='red' />
          </View>
        </View>

        <Text style={{ textAlign: 'center', fontSize: 16, color: '#A9A9A9', marginBottom: 10 }}>{investmentData.title}</Text>
        <Text style={{ textAlign: 'center', fontSize: 28, color: '#696969', marginBottom: 40 }}>{investmentData.fundName}</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, color: '#696969', marginBottom: 5, fontWeight: 'bold', }}>{investmentData.whatIs}</Text>
        <Text style={{ textAlign: 'center', fontSize: 14, color: '#696969', marginBottom: 40, }}>{investmentData.definition}</Text>

        <Text style={{ textAlign: 'center', fontSize: 16, color: '#696969', marginBottom: 5, fontWeight: 'bold', }}>{investmentData.riskTitle}</Text>
        {this.investmentRiskChart(investmentData.risk)}

        <Text style={{ textAlign: 'center', fontSize: 16, color: '#696969', marginTop: 45, fontWeight: 'bold', }}>{investmentData.infoTitle}</Text>
        {this.investmentTable(investmentData.moreInfo)}

        {this.moreInformationInvestment(investmentData.info)}

        <View style={{ marginBottom: 50 }} />
      </ScrollView>
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
  },
  labelStyle: {
    fontSize: 14,
    color: '#A9A9A9',
    fontWeight: 'bold'
  },
  investmentTextStyle: {
    fontSize: 14,
    color: '#696969',
    fontWeight: 'bold'
  },
  containerMoreInformationInvestment: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default TrustFund