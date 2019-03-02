import React, { Component } from 'react';
import { StyleSheet, View,Text,ScrollView,AsyncStorage,Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header,Tab,Tabs} from "native-base";
import Cardtext from './text';
import Profileac from '../profile/index';
import {setName} from '../../actions/userActions.js';
import {connect} from 'react-redux';
class Options extends Component {
  static navigationOptions = {
    header:null
  };
  componentWillMount(){
    const { navigation} = this.props;
    const user=navigation.getParam('user','');
    const firebase=navigation.getParam('firebase','');
    var db=firebase.database();
    var ref = db.ref(`users/${user}`);
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
      this.props.setName(data);
    }).catch((err)=>{
      console.log(err);
    })
  }
storeData(){
  try {
    AsyncStorage.setItem('LoggedIn', '1');
  } catch (error) {
    console.log("There is erorr for storing the data");
  }
}
wbjeeexam(){
  const firebase=this.props.navigation.getParam('firebase','');
  const db=firebase.database();
  const ref=db.ref('/permissionwbjee');
  ref.once("value").then((snap)=>{
    var toggle=snap.val()
    if(toggle.permission===1)
    {
      this.props.navigation.navigate('Examwbjee',{firebase:firebase});
    }
    else {
      Alert.alert("You have no permission to enter the exam")
    }
  }).catch((err)=>{console.log(err)})
}
jeemainexam(){
  const firebase=this.props.navigation.getParam('firebase','');
  const db=firebase.database();
  const ref=db.ref('/permissionjeemain');
  ref.once("value").then((snap)=>{
    var toggle=snap.val()
    if(toggle.permission===1)
    {
      this.props.navigation.navigate('Examjeemain',{firebase:firebase});
    }
    else {
      Alert.alert("You have no permission to enter the exam")
    }
  }).catch((err)=>{console.log(err)})
}
  render() {
    const text="Here is the rules and regulations are there in the following JEEMAIN examination";
    const text1="Here is the rules and regulations are there in the following WBJEE examination"
    const { navigation} = this.props;
    const useremail = navigation.getParam('useremail','');
    const user=navigation.getParam('user','');
    const firebase=navigation.getParam('firebase','');
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
      <Header hasTabs style={{backgroundColor:'#d81b60'}}/>
      <Tabs tabBarUnderlineStyle={{backgroundColor:'#ffd600'}}>
          <Tab heading="Rules" tabStyle={styles.tabStyle} textStyle={styles.textStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle}>
          <Cardtext text={text}/>
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="JEE MAIN EXAMINATION" onPress={() =>{this.jeemainexam()}}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="WBJEE EXAMINATION" onPress={() =>{this.wbjeeexam()}}>
                <Icon name="md-done-all" style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#C0CA33' title="NOTICE BOARD" onPress={() =>{this.props.navigation.navigate('Pdffile',{firebase:firebase})}}>
                <Icon name="md-done-all" style={styles.actionButtonIcon}/>
              </ActionButton.Item>
            </ActionButton>
          </Tab>
          <Tab heading="Profile" tabStyle={styles.tabStyle} textStyle={styles.textStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle}>
            <Profileac user={user}/>
          </Tab>
          </Tabs>
      </View>
    );
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
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  tabStyle:
  {
    backgroundColor: '#d81b60'
},
textStyle:{
  color: '#ffd600',
  fontSize:20
},

activeTabStyle:{
  backgroundColor: '#ec407a'
},
activeTextStyle:{
  color: '#ffd600', 
  fontWeight: 'bold',
  fontSize:20
}
})
export default connect(mapStateToProps,mapDispatchToProps)(Options);
