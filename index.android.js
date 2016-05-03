/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ListView,
  
} from 'react-native';

import Beacons from 'react-native-beacons-android'




var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

class tarShareBeacon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
       dataSource: ds.cloneWithRows([]),
    }
  }
  
  componentWillMount(){
  Beacons.detectIBeacons();
  
    Beacons.startRangingBeaconsInRegion('REGION1').then(() => console.log(`Beacons monitoring started succesfully!`)).catch(
      error => console.log(`Beacons monitoring not started, error: ${error}`))

    DeviceEventEmitter.addListener('beaconsDidRange', (beacons) => {
      console.log('Found beacons!', beacons);
      this.setState({
        dataSource: ds.cloneWithRows(beacons)
      });
    });
  }

  render() {
    return (
      <ListView
        style={{marginTop:100}}
        dataSource={this.state.dataSource}
        renderRow={(person) => {return this._renderPersonRow(person) }} />
    );
  }

  _renderPersonRow(person){
    return(
      <View>
        <Text>txPower: {person.major}</Text>
      </View>
      )
  }
}

const styles = React.StyleSheet.create({
  
});

AppRegistry.registerComponent('tarShareBeacon', () => tarShareBeacon);
