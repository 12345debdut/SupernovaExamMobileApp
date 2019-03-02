import React from 'react';
import {View,Text,Linking,StyleSheet,Dimensions,StatusBar,ScrollView} from 'react-native';
import {Button} from 'native-base'
import {Font} from 'expo';
const Lob=require("../../assets/fonts/Lobster-Regular.ttf")
const dance=require("../../assets/fonts/DancingScript-Regular.ttf")
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
var {height, width} = Dimensions.get('window');
export default class Displaythings extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      isloaded:false
    }
  }
  open(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }
  async componentDidMount(){
    console.log("Hii");
    StatusBar.setHidden(true);
    await Font.loadAsync({
      'Lobstar-regular':Lob,
      "dancing-regular":dance
    }).then(()=>{
      this.setState({isloaded:true})
    })
  }
  render()
  {
    const {isloaded}=this.state;
    if(!isloaded){
      return (<Text style={{flex:1,justifyContent:'center',alignSelf:'center'}}>Loading...</Text>)
    }
    else{
      return(
        <View>
        <View style={styles.Header}>
        <View style={{flexDirection:'row'}}>
        <MaterialIcons name="note" size={40} color="white"/>
        <View style={{marginLeft:10}}>
        <Text style={{fontFamily:'Lobstar-regular',fontSize:30,color:"#ffd600"}}>Notice Board</Text>
        </View>
        </View>
      </View>
      <View style={styles.Middle}>
      <View style={{flexDirection:'column'}}>
      <View style={{marginLeft:10,borderBottomColor:"black",borderBottomWidth:2,marginTop:10,marginBottom:15}}>
      <Text style={{fontFamily:'dancing-regular',fontSize:25,color:"#212121"}}>{this.props.text}</Text>
      </View>
      <View style={{marginLeft:10,borderBottomColor:"black",marginTop:10,borderBottomWidth:2}}>
      {this.props.image && <Button warning onPress={()=>{this.open(this.props.image)}} style={{borderRadius:20,paddingLeft:20,paddingRight:20,marginBottom:15}}>
      <MaterialIcons name='filter' size={20} color="#ffff"/>  
      <Text style={{color:'white',fontFamily:'dancing-regular',fontSize:25,marginLeft:5}}>Open Docs</Text>
      </Button>}
      </View>
      <View style={{marginLeft:10,borderBottomColor:"black",borderBottomWidth:2,marginTop:15}}>
      <Text style={{fontFamily:'dancing-regular',fontSize:25,color:"#212121"}}>Date of Notice</Text>
      <Text style={{fontFamily:'dancing-regular',fontSize:25,color:"#212121"}}>{this.props.date}</Text>
      </View>
      </View>
    </View>
        </View>
      );
    }
  }
}
const styles=StyleSheet.create({
  Header:{
    backgroundColor:"#e91e63",
    width:width-15,
    marginTop:10,
    marginLeft:10,
    elevation:5,
    padding:20
  },
  Middle:{
    backgroundColor:"#eceff1",
    width:width-15,
    marginTop:10,
    marginLeft:10,
    elevation:5,
    padding:20
  }
})
