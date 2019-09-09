import Reactotron from 'reactotron-react-native'
import {NativeModules} from 'react-native'

const scriptURL = NativeModules.SourceCode.scriptURL
let scriptHostname = scriptURL.split('://')[1].split(':')[0]

const tron = Reactotron
    .configure({ host: scriptHostname })
    .useReactNative()
    .connect()

tron.clear()
console.tron = tron
