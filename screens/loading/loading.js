import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar
} from 'react-native'
import {Font} from 'expo'
const {height,width}=Dimensions.get('window')
const back=require("./picture.jpg");
const lob=require("../../assets/fonts/Lobster-Regular.ttf")
const dance=require("../../assets/fonts/DancingScript-Regular.ttf");

export default class Loading extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      isloaded:false
    }
  }
  async componentDidMount(){
    StatusBar.setHidden(true);
    await Font.loadAsync({
      'Lobster-regular':lob,
      'dancing-regular':dance
    }).then(()=>{
      this.setState({isloaded:true})
    }).catch((err)=>{console.log("Hii")})
  }
  render() {
    if(!this.state.isloaded){
      return(<Text>Is Loading..</Text>)
    }
    else{
      return (
        <View>
        <Image source={back} style={{height:height/2,width:width}}/>
        <View style={{flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>
        <Text style={{fontFamily:'Lobster-regular',fontSize:40,color:'#c2185b'}}>Loading....</Text>
        <ActivityIndicator size="large" color="#c2185b"/>
        </View>
        <View style={{marginLeft:20}}>
        <Text style={{fontFamily:'dancing-regular',fontSize:30,color:'#6a1b9a'}}>{this.props.title}</Text>
        <Text style={{fontFamily:'dancing-regular',fontSize:30,color:'#6a1b9a'}}>{this.props.description}</Text>
        </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
