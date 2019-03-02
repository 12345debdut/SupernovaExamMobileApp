import React, { Component } from 'react';
import { StyleSheet, View,Text,Image,ImageBackground,Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Icon } from 'react-native-elements';
const imageback=require('./back1.png');
const imageback2=require('./back2.png');
export default class Information extends Component{
  render()
  {
    var user=this.props.user;
    var id=this.props.id;
    if(this.props.photoid==="yes")
    {
      var image=<Image source={imageback} style={{height:150,width:(width-15),borderRadius:20,marginTop:30,marginLeft:10}}/>
    }
    else {
      var image=<Image source={imageback2} style={{height:150,width:(width-15),borderRadius:20,marginTop:30,marginLeft:10}}/>
    }
    return(
      <View style={styles.container}>
        {image}
        <Text style={styles.text}>{this.props.id}</Text>
        <Text style={styles.text1}>{this.props.user}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  constainer:{
    position: 'relative',
    textAlign: 'center',
    color: 'white'
  },
  text:{
    position: 'absolute',
    top: 50,
    left: 20,
    color:'#8e24aa',
    fontWeight:'bold',
    fontSize:20
  },
  text1:{
    position: 'absolute',
    top: 100,
    left:20,
    color:'#d81b60',
    fontSize:20
  },
  icon:{
    position: 'absolute'
  }
});
