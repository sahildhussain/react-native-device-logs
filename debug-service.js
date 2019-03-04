import deviceLog  from 'react-native-device-log'

class deviceLogs extends deviceLog {
	constructor() {
		super()
		AppState.removeEventListener('change')
		NetInfo.removeEventListener('connectionChange')
	}
}

export default deviceLogs
