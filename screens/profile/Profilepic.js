import React, { Component } from 'react';
import { StyleSheet, View,Text,Image,ScrollView,Dimensions,StatusBar} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { Font } from 'expo';
import Modal from "react-native-modal"
import  Profile from '../options/Profile'
import { Button } from 'react-native-elements';
import Loading from '../loading/loading';
var {height, width} = Dimensions.get('window');
import { FloatingAction } from 'react-native-floating-action';
import Action from './Action';
const imageback=require('./imageback.jpg');
const dance=require('../../assets/fonts/DancingScript-Regular.ttf');
const cinzel=require('../../assets/fonts/Cinzel-Regular.ttf');
const gradient="linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%), repeating-linear-gradient(-115deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px), repeating-linear-gradient(115deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)"
import Gradient from 'react-native-css-gradient';
export default class Profilepic extends Component{
  constructor(props){
    super(props)
    this.state={
      isloaded:false,
      isloading:true,
      isVisible:false
    }
    this.myfunc=this.myfunc.bind(this);
  }
  componentWillMount(){
    setTimeout(this.myfunc,5000);
  }
  myfunc(){
    this.setState({isloading:false})
  }
  async componentDidMount(){
    StatusBar.setHidden(true);
    await Font.loadAsync({
      'dancing-regular':dance,
      'cinzel-regular':cinzel
    }).then(()=>{
      this.setState({isloaded:true})
    })
  }
  render()
  {
    const {isloading} =this.state;
    if(isloading){
      return <Loading title="Welcome To Profile Page" 
      description="You Can See your Profile and also update profile by tapping the yellow noch"/>
    }
    else{
      return(
        <ScrollView style={styles.container}>
        <Gradient 
        gradient={gradient}
        style={{
          width:width,
          height:height/2-20,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: 20,
          marginBottom: 4
        }}
      >
      <Image source={imageback} style={styles.logo} />
      <FloatingAction
      color="#ffd600"
      floatingIcon={<MaterialIcons name="create" size={27}  color="#424242"/>}
      onPressMain={
        (name) => {
          this.setState({isVisible:true})
        }
      }
    /> 
    <Modal isVisible={this.state.isVisible} backdropColor="white" 
    backdropOpacity={0.8} animationInTiming={500} animationOutTiming={500}>
    <View style={styles.modalcard}>
    <MaterialIcons name='clear' size={30} onPress={()=>{this.setState({isVisible:false})}}/>
    <Profile firebase={this.props.firebase} username={this.props.username} useremail={this.props.email}/>
    </View>
    </Modal>
      </Gradient>
    {this.state.isloaded &&<View >

      <View style={styles.box1}>
      <View style={{flexDirection:'row'}}>
      <MaterialIcons name="person" size={25}/>
      <Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Name</Text>
      </View>
      <Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.username}</Text>
    </View>

    <View style={styles.box2}>
    <View style={{flexDirection:'row'}}>
    <MaterialIcons name="email" size={25}/>
    <Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>EMAIL</Text>
    </View>
    <Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.email}</Text>
  </View>

  <View style={styles.box1}>
  <View style={{flexDirection:'row'}}>
  <MaterialIcons name="call" size={25}/>
  <Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Phonenumber</Text>
  </View>
  <Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.phonenumber}</Text>
</View>

<View style={styles.box2}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="cast" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Class</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.class}</Text>
</View>

<View style={styles.box1}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="adjust" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>BatchTiming</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.batchtiming}</Text>
</View>

<View style={styles.box2}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="grain" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Rating of Wbjee</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.wbrating}</Text>
</View>

<View style={styles.box1}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="grain" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Percentage of Wbjee</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.wbpercentage}%</Text>
</View>
<View style={styles.box2}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="grain" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Rating of JEEMAIN</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.jerating}</Text>
</View>
<View style={styles.box1}>
<View style={{flexDirection:'row'}}>
<MaterialIcons name="grain" size={25}/>
<Text style={{fontFamily:'cinzel-regular', fontSize:30,marginLeft:10}}>Percentage of jeemain</Text>
</View>
<Text style={{fontFamily:'dancing-regular',fontSize:20,marginLeft:20}}>{this.props.jepercentage}%</Text>
</View>
  </View>
    }
  </ScrollView>
      );
    }
  }  
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    //justifyContent:'center',
    alignSelf:'center',
    backgroundColor:'#F3E5F5',
  },
  buttoncontainer:{
    alignSelf:'center'
  },
  logo:{
    height:150,
    width:150,
    borderRadius:90,
    justifyContent:'center',
    alignSelf:'center',
    borderColor:'red',
    borderWidth:2, 
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  box1:{
    backgroundColor:"#fff9c4",
    width:width-15,
    marginTop:10,
    marginLeft:10,
    elevation:5,
    padding:20
  },
  box2:{
    backgroundColor:"#ffe0b2",
    width:width-15,
    marginTop:10,
    marginLeft:10,
    elevation:5,
    padding:20
  },
  modalcard:{
    backgroundColor:'white',
    height:height-80,
    width:width-60,
    marginLeft:10,
    marginTop:height/12,
    borderRadius:20,
    elevation:8,
    borderColor:'#ffd600',
    borderWidth:2
  },
})
