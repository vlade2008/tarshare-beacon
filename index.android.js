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
      loaded: false,
      beacons:"",

    }
  }


  
  componentWillMount(){
  Beacons.detectIBeacons();
  
    Beacons.startRangingBeaconsInRegion('REGION1').then(() => console.log(`Beacons monitoring started succesfully!`)).catch(
      error => console.log(`Beacons monitoring not started, error: ${error}`))

     var didFindbeacon = DeviceEventEmitter.addListener('beaconsDidRange', (beacons) => {
      console.log('Found beacons!', beacons);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(beacons)
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
        <Text>txPower: {beacons}</Text>


      </View>
      )
  }
}

const styles = React.StyleSheet.create({
  
});

AppRegistry.registerComponent('tarShareBeacon', () => tarShareBeacon);
