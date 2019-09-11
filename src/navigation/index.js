
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import TrustFund from '../screens/TrustFund'
import UserRegistration from '../screens/UserRegistration'

const AppNavigator = createStackNavigator(
  {
    UserRegistration: {
      screen: UserRegistration,
      navigationOptions: {
        header: null
      }
    },
    TrustFund: {
      screen: TrustFund,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'UserRegistration'
  }
)

export default createAppContainer(AppNavigator)
