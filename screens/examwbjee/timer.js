import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {ScreenOrientation} from 'expo'
import {Button} from 'native-base'
class Timer extends Component
{
componentDidMount()
{
  this.timer=setInterval(this.myfunc,1000);
}
constructor(props)
{
  super(props);
  this.state={
    clock:0,
    minute:0,
    hour:0,
    portrait:true,
    landscape:false
  };
  this.myfunc=this.myfunc.bind(this);
}
myfunc()
{
  if(this.state.clock<59)
  {
  this.setState({clock:this.state.clock+1});
}
  else{
    //console.log("hi");
    if(this.state.minute<59)
    this.setState({minute:this.state.minute+1,clock:0})
    else {
      this.setState({hour:this.state.hour+1,minute:0,clock:0})
    }
  }
  // else {
  //   this.setState({hour:this.state.hour+1,minute:0,clock:0})
  // }
}
changeOrientation(){
  if(this.state.portrait){
    console.log("Hii");
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    this.setState({portrait:false})   
    this.setState({landscape:true}) 
  }
  if(this.state.landscape){
    console.log("Hii");
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    this.setState({landscape:false})
    this.setState({portrait:true})
  }
}
  render(){
    return(
      <View style={{flexDirection:'row'}}>
      {this.state.portrait &&<Button style={{backgroundColor:'#F4D03F',padding:20}} rounded onPress={()=>{this.changeOrientation()}}>
      <Text style={{fontSize:30,color:'black'}}>LS</Text>      
      </Button>}
      {this.state.landscape &&<Button style={{backgroundColor:'#F4D03F',padding:20}} rounded onPress={()=>{this.changeOrientation()}}>
      <Text style={{fontSize:30,color:'black'}}>PT</Text>      
      </Button>}
      <Button rounded style={{backgroundColor:'#F4D03F',padding:20}}>
      <Text style={{fontSize:30,color:'black'}}>{this.state.hour}:{this.state.minute}:{this.state.clock}</Text>
    </Button>
    </View>
    );
  }
}
export default Timer;
