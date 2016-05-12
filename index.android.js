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






class tarShareBeacon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
       dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false

    }
  }


  
  componentWillMount(){
  Beacons.detectIBeacons();
  
    Beacons.startRangingBeaconsInRegion('REGION1').then(() => console.log(`Beacons monitoring started succesfully!`)).catch(
      error => console.log(`Beacons monitoring not started, error: ${error}`))

     var didFindbeacon = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data.beacons);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.beacons)
      });
    });
  }

   componentWillUnmount() {
    Beacons.stopScanning();
     didFindbeacon.remove();
  }

  render() {
    return (
      <ListView
        style={{marginTop:100}}
        dataSource={this.state.dataSource}
        renderRow={this.renderBeacons}

        />
    );
  }

  renderBeacons(beacons){
    return(
      <View>
        <Text>distance:{beacons.distance}</Text>
        <Text>major:{beacons.major}</Text>
        <Text>minor:{beacons.c}</Text>
        <Text>proximity:{beacons.proximity}</Text>
        <Text>rssi:{beacons.rssi}</Text>
        <Text>uuid:{beacons.uuid}</Text>


      </View>
      );
  }
}

const styles = React.StyleSheet.create({
  
});

AppRegistry.registerComponent('tarShareBeacon', () => tarShareBeacon);
