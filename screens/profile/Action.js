import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import Modal from "react-native-modal"
import  Profile from '../options/Profile'
import { Text } from 'native-base';
import { Button } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';

export default class Action extends Component {
constructor(props){
  super(props);
  this.state={
    isVisible:false
  }
  this._toggle=this._toggle.bind(this);
}
_toggle(){
  this.setState({isVisible:false})
  console.log("Hiii");
}
  render() {
    return (
      <View style={{flex:1}}>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});