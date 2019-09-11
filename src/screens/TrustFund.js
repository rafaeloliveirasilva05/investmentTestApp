import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'

import Button from '../components/Button'
import SimpleModal from '../components/SimpleModal'
import FooterButtons from '../components/FooterButtons'
import Colors from '../styles/color'

class TrustFund extends Component {
  constructor(props) {
    super(props)
    this.state = {
      investmentData: null,
      stateModalOpen: false
    }
  }

  async componentDidMount() {
    try {
      const url = 'https://floating-mountain-50292.herokuapp.com/fund.json'
      const investmentData = await axios.get(url)

      this.setState({ investmentData: investmentData.data.screen })

    } catch (error) {
      console.tron.log('error', error)
    }
  }

  investmentRiskChart = (risk) => {
    const informationEachRisk = [
      {
        risk: 1,
        color: Colors.LightGreen,
      },
      {
        risk: 2,
        color: Colors.DarkGreen,
      },
      {
        risk: 3,
        color: Colors.Yellow,
      },
      {
        risk: 4,
        color: Colors.Orange,
      },
      {
        risk: 5,
        color: Colors.Primary,
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
                <Icon name='angle-down' size={28} color={Colors.DarkGray} />
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
          <View
            style={styles.containerInformation}
            key={element.name}>
            <Text style={styles.labelStyle}>{element.name}</Text>
            <Text style={styles.investmentTextStyle}>{element.data}</Text>
          </View>
        )
      })
    )
  }

  dataForDownload = (downInfo) => {
    return (
      downInfo.map(element => {
        return (
          <View
            key={element.name}
            style={styles.containerInformation}>
            <Text style={styles.labelStyle}>{element.name}</Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Desculpe', 'Documento não encontrado')}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Icon name='download' size={22} color={Colors.Primary} />
              </View>
              <Text style={{ color: Colors.Primary, fontSize: 14, fontWeight: 'bold' }}>Baixar</Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  }

  onPressTrustFund = () => {
    this.setState({ stateModalOpen: false })
    this.props.navigation.navigate('TrustFund')
  }

  onPressUserRegistration = () => {
    this.props.navigation.navigate('UserRegistration')
  }

  render() {
    if (!this.state.investmentData) return null
    const { investmentData } = this.state

    return (
      <>
        <ScrollView style={styles.container}>
          {!this.state.stateModalOpen &&
            <>
              <View style={styles.containerTitleScreen}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.DimGray }}>Investimento</Text>
                <View style={{ width: 30, height: 30, position: 'absolute', right: 0 }}>
                  <IconEntypo name="share-alternative" size={28} color={Colors.Primary} />
                </View>
              </View>

              <Text style={styles.investmentTitletStyle}>{investmentData.title}</Text>
              <Text style={styles.fundNameTextStyle}>{investmentData.fundName}</Text>
              <Text style={styles.whatIsTextStyle}>{investmentData.whatIs}</Text>
              <Text style={styles.definitionTextStyle}>{investmentData.definition}</Text>
              <Text style={styles.riskTitleTextStyle}>{investmentData.riskTitle}</Text>

              {this.investmentRiskChart(investmentData.risk)}

              <Text style={styles.infoTitleTextStyle}>{investmentData.infoTitle}</Text>
              {this.investmentTable(investmentData.moreInfo)}

              {this.moreInformationInvestment(investmentData.info)}
              {this.dataForDownload(investmentData.downInfo)}

              <Button
                label={'Investir'}
                onPress={() => this.setState({ stateModalOpen: true })} />
            </>
          }

          {this.state.stateModalOpen &&
            <SimpleModal
              title={'Obrigado'}
              description={'Investimento realizado com sucesso :)'}
              labelButton={'Novo investimento'}
              closeStateModalOpen={() => this.setState({ stateModalOpen: false })} />
          }

          <View style={{ marginBottom: 50 }} />
        </ScrollView>

        <FooterButtons
          onPressTrustFund={this.onPressTrustFund}
          onPressUserRegistration={this.onPressUserRegistration}
          screen={'TrustFund'}
        />
      </>
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
    borderColor: Colors.White
  },
  labelStyle: {
    fontSize: 14,
    color: Colors.DarkGray,
    fontWeight: 'bold'
  },
  investmentTextStyle: {
    fontSize: 14,
    color: Colors.DimGray,
    fontWeight: 'bold'
  },
  containerInformation: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  investmentTitletStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.DarkGray,
    marginBottom: 10
  },
  fundNameTextStyle: {
    textAlign: 'center',
    fontSize: 28,
    color: Colors.DimGray,
    marginBottom: 40
  },
  whatIsTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.DimGray,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  definitionTextStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.DimGray,
    marginBottom: 40
  },
  riskTitleTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.DimGray,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  infoTitleTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.DimGray,
    marginTop: 45,
    fontWeight: 'bold'
  },
  containerTitleScreen: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TrustFund
