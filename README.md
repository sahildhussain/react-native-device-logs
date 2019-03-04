
# react-native-device-logs

## Getting started

`$ npm install react-native-device-logs --save`

### Mostly automatic installation

`$ react-native link react-native-device-logs`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-device-logs` and add `RNReactNativeDeviceLogs.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeDeviceLogs.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeDeviceLogsPackage;` to the imports at the top of the file
  - Add `new RNReactNativeDeviceLogsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-device-logs'
  	project(':react-native-device-logs').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-device-logs/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-device-logs')
  	```
  
Note: This library is an extension of 'react-native-device-log'.
