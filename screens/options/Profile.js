import React, { Component } from 'react';
import { StyleSheet, View,Text,Image,Alert,ScrollView,KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'
import {setName} from '../../actions/userActions.js';
//import RNFetchBlob from 'react-native-fetch-blob'
import CameraRollPicker from 'react-native-camera-roll-picker'
//import Firebase from './index';
//import * as RNfetchblob from 'react-native-fetch-blob';
import { Container, Header, Content, Item, Input,Button,Label,Icon,Toast} from 'native-base';
import {ImagePicker} from 'expo';
import {FormValidationMessage} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
class Profile extends Component{
  constructor(props){
      super(props);
      this.state={
        username:'',
        imageurl:'',
        user:'',
        batchtiming:'',
        email:'',
        phonenumber:'',
        class:'',
        name:'',
        wbrating:0,
        wbpercentage:0,
        jerating:0,
        jepercentage:0,
        names:false,
        classs:false,
        phones:false,
        batchs:false,
        error:false,
        show:false
      };
     this.submitinformation=this.submitinformation.bind(this);
     this.showToast=this.showToast.bind(this);
    }

showToast(){
  Toast.show({
    text: 'All Information updated',
    buttonText: 'Okay',
    position: "top",
    type:'success',
    duration:12000
  })
}

  submitinformation()
  {
    if(this.state.name==='' && this.state.class==='' && this.state.batchtiming==='' && this.state.phonenumber==='')
    {
      console.log("in that"+this.state.name+" "+this.state.class+" "+this.state.batchtiming+" "+this.state.phonenumber)
      this.setState({error:true})
    }
    else {
    const {firebase,username,useremail } = this.props;
    var usersRef=firebase.database().ref("users/");
    var hopperRef =usersRef.child(username);
    hopperRef.once("value").then((user)=>{
      this.setState({wbrating:user.wbrating});
      this.setState({wbpercentage:user.wbpercentage})
      this.setState({jerating:user.jerating});
      this.setState({jepercentage:user.jepercentage})
    }).catch((err)=>{console.log("Error occured in fetching the data from database")})
    data={
      batchtiming:this.state.batchtiming,
      class:this.state.class,
      email:useremail,
      imageurl:this.state.imageurl,
      name:this.state.name,
      phonenumber:this.state.phonenumber,
      username:username,
      wbrating:this.state.wbrating,
      wbpercentage:this.state.wbpercentage,
      jerating:this.state.jerating,
      jepercentage:this.state.jepercentage
    }
    this.props.setName(data);
    //console.log("hiii");
    //console.log(usersRef);
    hopperRef.update({
      batchtiming:this.state.batchtiming,
      class:this.state.class,
      email:useremail,
      imageurl:this.state.imageurl,
      name:this.state.name,
      phonenumber:this.state.phonenumber,
      username:username,
    }).then(()=>{this.showToast()})
    .catch((err)=>{console.log(err)});
  }
  }
  render(){
    const { username,useremail} = this.props;
    console.log(username+"this is"+useremail)
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.container}>
              <Item stackedLabel style={{marginTop:20}}>
              <Label style={styles.label}>Username</Label>
              <View style={{flexDirection:'row'}}>
                  <Input value={username} style={{color:'#424242',fontSize:20}}/>
                  <Icon style={{justifyContent:'flex-end',color:'#D9B611'}} name='information-circle' />
                  </View>
              </Item>
              <Item stackedLabel style={{marginTop:20}}>
              <Label style={styles.label}>Name</Label>
              <View style={{flexDirection:'row'}}>
                  <Input onChangeText={(text) =>{
                    if(text)
                    {
                      this.setState({names:true})
                    }
                    else {
                      this.setState({names:false})
                    }
                    this.setState({name:text})
                  }} style={{color:'#424242',fontSize:20}}/>
                  {this.state.names && <Icon style={{justifyContent:'flex-end',color:'green'}} name='checkmark-circle' />}
                  {!this.state.names && <Icon style={{justifyContent:'flex-end',color:'red'}} name='close-circle' />}
              </View>
              </Item>
              <Item stackedLabel style={{marginTop:20}}>
              <Label style={styles.label}>Class</Label>
              <View style={{flexDirection:'row'}}>
                  <Input  onChangeText={(text) =>{
                    if(text)
                    {
                      this.setState({classs:true})
                    }
                    else {
                      this.setState({classs:false})
                    }
                    this.setState({class:text})
                  }} style={{color:'#424242',fontSize:20}}/>
                  {this.state.classs && <Icon style={{justifyContent:'flex-end',color:'green'}} name='checkmark-circle' />}
                  {!this.state.classs && <Icon style={{justifyContent:'flex-end',color:'red'}} name='close-circle' />}
                  </View>
              </Item>
              <Item stackedLabel style={{marginTop:20}}>
              <Label style={styles.label}>Batch Timing</Label>
              <View style={{flexDirection:'row'}}>
                  <Input  onChangeText={(text) =>{
                    if(text)
                    {
                      this.setState({batchs:true})
                    }
                    else {
                      this.setState({batchs:false})
                    }
                    this.setState({batchtiming:text})
                  }} style={{color:'#424242',fontSize:20}}/>
                  {this.state.batchs && <Icon style={{justifyContent:'flex-end',color:'green'}} name='checkmark-circle' />}
                  {!this.state.batchs && <Icon style={{justifyContent:'flex-end',color:'red'}} name='close-circle' />}
                  </View>
              </Item>
              <Item stackedLabel style={{marginTop:20}} disabled>
              <Label style={styles.label}>User Email</Label>
              <View style={{flexDirection:'row'}}>
                  <Input value={useremail} style={{color:'#424242',fontSize:20}}/>
                  <Icon style={{justifyContent:'flex-end',color:'#D9B611'}} name='information-circle' />
                  </View>
              </Item>
              <Item stackedLabel style={{marginTop:20}}>
              <Label style={styles.label}>Phone Number</Label>
              <View style={{flexDirection:'row'}}>
                  <Input  onChangeText={(text) =>{
                    if(text)
                    {
                      this.setState({phones:true})
                    }
                    else {
                      this.setState({phones:false})
                    }
                    this.setState({phonenumber:text})
                  }} style={{color:'#424242',fontSize:20}}/>
                  {this.state.phones && <Icon style={{justifyContent:'flex-end',color:'green'}} name='checkmark-circle' />}
                  {!this.state.phones && <Icon style={{justifyContent:'flex-end',color:'red'}} name='close-circle' />}
                  </View>
              </Item>
              <View>
              {this.state.error && <FormValidationMessage>{'All field is required'}</FormValidationMessage>}
              </View>
              <View>
              </View>
              <Button rounded danger style={{padding:20,marginTop:30,marginLeft:30}}
              onPress={this.submitinformation}>
              <MaterialIcons name="save" size={25} color="#ffeb3b"/>
              <Text style={{color:'white',fontSize:20}}>Submit</Text>
              </Button>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    user:state.userReducer
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    setName:(name)=>{
      dispatch(setName(name));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container:{
    flex:1,
  },
  container1:{
    padding:60,
    justifyContent:'center',
  },
  label:{
    fontSize:25,
    color:'#c2185b'
  }
});
