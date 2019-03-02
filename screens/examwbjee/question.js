import {View} from 'react-native'
import React from 'react'
import { StyleSheet,Image,ScrollView,Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Container, Header, Content, Card, CardItem, Text, Body,Icon} from "native-base";
export default class Question extends React.Component{
  constructor(props){
    super(props);
    this.state={
      width:0,
      height:0
    }
  }
  recieve(){
    //console.log("hii")
    if(this.props.image)
    {
      Image.getSize(this.props.image,(width,height)=>{
        this.state.height=height
        this.state.width=width
      })
    }
  }
   render(){
     this.recieve()
     return(
       <View>
       <Card>
         <CardItem header bordered>
           <Text style={{color:'#3E2723'}}>WBJEE question</Text>
         </CardItem>
         <CardItem bordered>
           <Body>
           <ScrollView horizontal={true}>
           <View style={{flexDirection:'column'}}>
           <Text style={{color:'#6A1B9A',fontSize:20}}>{this.props.text}</Text>
            {this.props.image && <Image source={{uri:this.props.image}} style={{height:this.state.height,width:this.state.width}}/>}
           </View>
            </ScrollView>
           </Body>
         </CardItem>
       </Card>
       </View>
     );
   }
}
