import React,{Component} from 'react';
import { AsyncStorage } from "react-native";
import { Icon,Avatar,Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Profilepic from './Profilepic';
import Loading from '../loading/loading';
import {LinearGradient} from 'expo';
import {setName} from '../../actions/userActions.js';
import {connect} from 'react-redux';
var config = {
  apiKey: "AIzaSyAdBhY7ZzcZDlbY1Im8FV8NPR9vdjH8-DI",
  authDomain: "examapp-8ed22.firebaseapp.com",
  databaseURL: "https://examapp-8ed22.firebaseio.com",
  projectId: "examapp-8ed22",
  storageBucket: "",
  messagingSenderId: "270831242891"
};
var Firebase=firebase.initializeApp(config,"Secondary");
import {Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert
} from 'react-native';
var {height, width} = Dimensions.get('window');
class Profileac extends Component{
  constructor(props){
    super(props);
    this.state={
      Firebase:'',
      loading:false
    }
    this.myfunc=this.myfunc.bind(this);
  }
  componentWillMount()
  {
    var db=firebase.database();
    var ref = db.ref(`users/${this.props.user}`);
    ref.once("value").then((snap)=>{
      var user=snap.val();
      data={
        batchtiming:user.batchtiming,
        class:user.class,
        email:user.email,
        imageurl:user.imageurl,
        name:user.name,
        phonenumber:user.phonenumber,
        username:user.username,
        wbrating:user.wbrating,
        wbpercentage:user.wbpercentage,
        jerating:user.jerating,
        jepercentage:user.jepercentage
      }
      //console.log(data);
      this.props.setName(data);
    }).catch((err)=>{
      console.log(err);
    })
    setTimeout(this.myfunc,5000);
  }
  myfunc(){
    this.setState({loading:false})
  }
  render()
  {
    if(this.state.loading)
    {
      return <Loading/>
    }
    else{
    return(
      <View style={styles.container}>
        <Profilepic firebase={Firebase} imageurl={this.props.username.imageurl} batchtiming={this.props.username.batchtiming}
         class={this.props.username.class} name={this.props.username.name} username={this.props.username.username}
         phonenumber={this.props.username.phonenumber} email={this.props.username.email}
         wbrating={this.props.username.wbrating} jerating={this.props.username.jerating}
         wbpercentage={this.props.username.wbpercentage} jepercentage={this.props.username.jepercentage}/>
      </View>
    );
  }
}
}
  const mapStateToProps=(state)=>{
    return {
      username:state.userReducer,
      math:state.mathReducer
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    return {
      setName:(name)=>{
        dispatch(setName(name));
      }
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Profileac);
const styles=StyleSheet.create({
  container:{
    flex:1
  }
})
