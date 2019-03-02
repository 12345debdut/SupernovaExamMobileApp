import React,{Component} from 'react';
import {StatusBar,Linking} from 'react-native';
import {Font} from 'expo';
import { SocialIcon, colors } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon,Avatar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button,Item,Input,Form,Label } from 'native-base';
const non=require("../../assets/fonts/NotoSerifSC-Regular.otf")
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAdBhY7ZzcZDlbY1Im8FV8NPR9vdjH8-DI",
  authDomain: "examapp-8ed22.firebaseapp.com",
  databaseURL: "https://examapp-8ed22.firebaseio.com",
  projectId: "examapp-8ed22",
  storageBucket: "",
  messagingSenderId: "270831242891"
};
import {Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image,
    ImageBackground,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';
var {height, width} = Dimensions.get('window');
const background=require('./background1.jpg');
const back=require('./background3.jpg');
const logo=require('./back.jpg');
const lock=require('./lock.png');
const icons=require('./icon.png');
var fire=firebase.initializeApp(config);
export default class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      Userid:"",
      password:"",
      user:"",
      isloading:false,
      color:true,
      isloaded:false,
      yes:true,
      modal:false,
      text:'',
      successmodal:false
    };
    this.change=this.change.bind(this);
    this.myfunc=this.myfunc.bind(this);
  }
  componentWillMount(){
  }
  async componentDidMount(){
    StatusBar.setHidden(true)
    await Font.loadAsync({
      "Notoserif-regular":non
    }).then(()=>{
      this.setState({isloaded:true})
    })
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
  change(){
    this.setState({color:!this.state.color})
    try{
      firebase.auth().signInWithEmailAndPassword(this.state.userid,this.state.password)
      .then((user)=>{
        var db=firebase.database();
        var ref = db.ref(`users/${this.state.user}`);
        ref.once("value").then((snap)=>{
          var users=snap.val()
          if(users)
          {
            this.props.navigation.navigate('Options',{useremail:this.state.userid,user:this.state.user,firebase:fire})
          }
          else {
            this.setState({modal:true})
            this.setState({text:"Give right userid"})
          }
        }).catch((err)=>{
          this.props.navigation.navigate('Home');
        })
      }).catch((err)=>{
        //Alert.alert("Give right credential or check you internet connection");
        this.setState({modal:true})
        this.setState({text:"Give right credential"})
      })
    }catch(error){
      //Alert.alert("Please check your connection");
      this.setState({modal:true})
      this.setState({text:"Give all credential or check your internet connection"})
    }
  }
  static navigationOptions = {
    header:null
  };
  myfunc(){
    this.setState({isloading:false});
  }
  render(){
    if(this.state.isloading)
    {
      return <ImageBackground source={back} style={{width:width,height:height,flex:1}}/>
    }
    else {
    return(
      <View style={styles.container}>
          <View style={styles.card}>
          <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
          <View>
          <Image source={logo} style={styles.logo}/>
          {this.state.isloaded && <Text style={styles.welcome}>Welcome to Supernova</Text>}
          </View>
          <View>
          <Form>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>User Id</Label>
            <Input onChangeText={(text)=>{this.setState({user:text})}}/>
          </Item>
          <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>User E-mail</Label>
          <Input onChangeText={(text)=>{this.setState({userid:text})}}/>
        </Item>
          <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Password</Label>
          <Input secureTextEntry={this.state.yes} onChangeText={(text)=>{this.setState({password:text})}}/>
          </Item>
          {this.state.yes && <MaterialIcons name="visibility" size={30} color="red" style={{alignSelf:'flex-end'}} onPress={()=>{this.setState({yes:false})}}/>}
          {!this.state.yes && <MaterialIcons name="visibility" size={30} color="green"  style={{alignSelf:'flex-end'}} onPress={()=>{this.setState({yes:true})}}/>}
        </Form>
          </View>
          </KeyboardAvoidingView>
          <View style={styles.buttoncontainer}>
          {this.state.color && <Button rounded onPress={this.change} style={{paddingLeft:80,paddingRight:80,backgroundColor:"#f7d794"}}>
          <Text style={{color:"#e15f41",fontSize:20}}>Login</Text>
        </Button>}
        {!this.state.color && <Button rounded onPress={this.change} style={{paddingLeft:80,paddingRight:80,backgroundColor:"#4e342e"}}>
        <Text style={{color:"#e15f41",fontSize:20}}>Login</Text>
        </Button> }
        </View>
          </View>
          <View style={styles.social}>
            <SocialIcon type="facebook" onPress={()=>{this.open("https://www.facebook.com/asim.roychowdhury")}}/>
            <SocialIcon type="linkedin" onPress={()=>{this.open("https://www.linkedin.com/in/asim-roychowdhury-a2495812b")}}/>
            <SocialIcon type="twitter" onPress={()=>{this.open("https://twitter.com/asim123abc?s=09")}}/>
          </View>
          {this.state.modal && <Modal isVisible={this.state.modal} backdropColor="black" 
          backdropOpacity={0.8} animationInTiming={500} animationOutTiming={500}>
            <View style={styles.modalcard}>
              <View style={styles.error}>
                <View style={styles.errorlogo}>
                  <MaterialIcons name="cancel" color="white" size={90} style={{alignSelf:'center'}}/>
                </View>
              </View>
              <Text style={styles.text}>{this.state.text}</Text>
              <Button style={styles.errorbutton} onPress={()=>{this.setState({modal:false})}}><Text 
              style={{color:'white',fontFamily:'Notoserif-regular',fontSize:20}}>Ok!!</Text></Button>
            </View>
          </Modal>}
      </View>
    );
  }
}
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    height:height,
    width:width,
    backgroundColor:'#ec407a'
  },
  card:{
    backgroundColor:'white',
    height:height/2+160,
    width:width-40,
    marginLeft:20,
    marginTop:height/8,
    borderRadius:20,
    elevation:8,
    borderColor:'#ffd600',
    borderWidth:2
  },
  modalcard:{
    backgroundColor:'white',
    height:height/2,
    width:width-80,
    marginLeft:20,
    marginTop:height/8,
    borderRadius:20,
    elevation:8,
    borderColor:'#ffd600',
    borderWidth:2
  },
  error:{
    backgroundColor:'red',
    height:height/6,
    borderRadius:20,
  },
  success:{
    backgroundColor:'green',
    height:height/6,
    borderRadius:20,
  },
  errorlogo:{
    borderRadius:50,
    height:100,
    width:100,
    borderColor:'white',
    borderWidth:5,
    alignSelf:'center',
    marginTop:5
  },
  successlogo:{
    borderRadius:50,
    height:100,
    width:100,
    borderColor:'white',
    borderWidth:5,
    alignSelf:'center',
    marginTop:5
  },
  text:{
    color:'#c2185b',
    fontFamily:'Notoserif-regular',
    fontSize:20,
    alignSelf:'center',
    marginTop:20
  },
  errorbutton:{
    alignSelf:'center',
    marginTop:30,
    paddingLeft:40,
    paddingRight:40,
    borderRadius:20,
    backgroundColor:'red'
  },
  successbutton:{
    alignSelf:'center',
    marginTop:30,
    paddingLeft:40,
    paddingRight:40,
    borderRadius:20,
    backgroundColor:'green'
  },
  item:{
    paddingBottom:10
  },
  label:{
    color:'#7b1fa2',
    fontSize:20,
  },
  welcome:{
    color:'#c2185b',
    alignSelf:'center',
    fontSize:20,
    margin:0,
    fontFamily:'Notoserif-regular'
  },
  login:{
    color:'#ab47bc',
    alignSelf:'center',
    fontSize:20,
    fontFamily:'Notoserif-regular'
  },
  buttoncontainer:{
    alignSelf:'center',
    marginTop:5
  },
  container1:{
    padding:60,
    justifyContent:'center',
  },
  social:{
    flexDirection:'row',
    alignSelf:'center',
    marginTop:10
  },
  logo:{
    height:120,
    width:120,
    borderRadius:60,
    marginTop:20,
    elevation:4,
    justifyContent:'center',
    alignSelf:'center'
  },
  background:{
    width:width,
    height:height,
    flex:1
  },
  wrapper:{
    paddingVertical:30
  },
  inputWrapper:{
    flexDirection:'row',
    height:40,
    backgroundColor:"#f7d794",
    marginBottom:20,
    color:"#212121",
    paddingHorizontal:10,
    width:width/2+50,
  },
  input:{
    paddingHorizontal: 10,
    fontSize:20,
    color:'#4e342e',
    justifyContent:'center'
  },
})
