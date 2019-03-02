import React from 'react'
import {View,Text,ScrollView,Alert,Dimensions,BackHandler} from 'react-native'
import {ScreenOrientation} from 'expo';
import JumbledButton from './JumbledButton.js'
import { Button,ListItem,Body } from 'native-base';
import {CheckBox} from 'react-native-elements';
var {height, width} = Dimensions.get('window');
import Loading from '../loading/loading.js';
import Timer from './timer.js'
import Question from './question.js'
import {increamentValue} from '../../actions/indexvalueAction.js';
import zero from '../../actions/indexValueZeroAction.js';
import {connect} from 'react-redux';
class Examjeemain extends React.Component{
  constructor(props){
    super(props)
    this.state={
      max:0,
      question:[],
      questionimage:[],
      answer1:[],
      answer1image:[],
      answer2:[],
      answer2image:[],
      answer3:[],
      answer3image:[],
      answer4:[],
      answer4image:[],
      correct:[],
      index:0,
      max:0,
      check1:false,
      check2:false,
      check3:false,
      check4:false,
      result:0,
      loading:true,
      choosed:[],
      buttons:[],
      portrait:true,
      landscape:false
    }
    this.increament=this.increament.bind(this);
    this.check=this.check.bind(this);
    this.submittest=this.submittest.bind(this);
    this.myfunc=this.myfunc.bind(this);
    this.decreament=this.decreament.bind(this);
  }
  static navigationOptions = {
  title: 'JEEMAIN',
  headerLeft:null,
  headerTintColor: '#ffd600',
  headerStyle: {
  backgroundColor: '#d81b60',
},
headerRight: <Timer/>
};
submittest(){
  const firebase=this.props.navigation.getParam('firebase','');
 this.props.zero()
  //console.log("Hiii");
  this.props.navigation.navigate("Rating2",{choosed:this.state.choosed,correct:this.state.correct,max:this.state.max,firebase:firebase});
}
decreament(){
  if(this.props.index.value<=0)
  {
    Alert.alert("you have reached the begining question");
  }
  else {
    this.setState({check1:false})
    this.setState({check2:false})
    this.setState({check3:false})
    this.setState({check4:false})
    this.props.increament(-1)
  }
}
  increament(){
    if(this.props.index.value==this.state.max-1)
    {
      if(!this.state.check1 && !this.state.check2 && !this.state.check3 && !this.state.check4)
      {
        this.state.choosed[this.props.index.value]=null;
      }
            Alert.alert(
        'SubmitTest',
        'You have reached the last question want to submit test or not?',
        [
          {text: 'Cancel', onPress: () =>{
            console.log("want to recheck");
          }, style: 'cancel'},
          {text: 'Submit', onPress: () =>{
            this.submittest();
          }},
        ],
        { cancelable: false }
      )
    }
    else {
      if(!this.state.check1 && !this.state.check2 && !this.state.check3 && !this.state.check4)
      {
        this.state.choosed[this.props.index.value]=null;
      }
      this.setState({check1:false})
      this.setState({check2:false})
      this.setState({check3:false})
      this.setState({check4:false})
      this.props.increament(1);
    }
  }
  componentDidMount()
  {
    setTimeout(this.submittest,3608000);
  }
  check(number)
  {
    if(number==1)
    {
      this.setState({check1:true})
      this.setState({check2:false})
      this.setState({check3:false})
      this.setState({check4:false})
    }
    else if(number==2)
    {
      this.setState({check1:false})
      this.setState({check2:true})
      this.setState({check3:false})
      this.setState({check4:false})
    }
    else if(number==3)
    {
      this.setState({check1:false})
      this.setState({check2:false})
      this.setState({check3:true})
      this.setState({check4:false})
    }
    else if(number==4)
    {
      this.setState({check1:false})
      this.setState({check2:false})
      this.setState({check3:false})
      this.setState({check4:true})
    }
  }
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
        return true;
      })
    try{
    const firebase=this.props.navigation.getParam('firebase','');
    var db=firebase.database();
    var ref = db.ref(`questionsjeemain/`);
    ref.once("value").then((snap)=>{
      var result=snap.val();
      this.setState({max:result.length})
      for(i=0;i<result.length;i++)
      {
        //console.log(result[i]);
        //for question's array
        let newquestion=[...this.state.question];
        newquestion[i]=result[i].questionText;
        this.setState({question:newquestion})
        //for questions image array
        let newquestionimage=[...this.state.questionimage];
        newquestionimage[i]=result[i].questionimage;
        this.setState({questionimage:newquestionimage})
        let newcorrect=[...this.state.correct];
        newcorrect[i]=result[i].correct;
        this.setState({correct:newcorrect})
    }
    }).catch((err)=>{
      console.log(err);
    })
  }catch(err){
    console.log(err)
  }
  setTimeout(this.myfunc,7000);
  }
  // componentDidMount(){
  //   setTimeout(this.submittest,12000);
  // }
  myfunc()
  {
    this.setState({loading:false});
  }
   render(){
     if(this.state.loading)
     {
        return <Loading title="JEEMAIN Examination" 
        description="Best Of luck for your examination!!! Good Luck!!!!"/>
     }
     else {
       const {choosed} = this.state;
     return(
       <ScrollView>
       <ScrollView horizontal={true} style={{marginTop:10}}>
        <JumbledButton title="1 no. question" value={choosed[0]} indexed={0}/>
        <JumbledButton title="2 no. question" value={choosed[1]} indexed={1}/>
        <JumbledButton title="3 no. question" value={choosed[2]} indexed={2}/>
        <JumbledButton title="4 no. question" value={choosed[3]} indexed={3}/>
        <JumbledButton title="5 no. question" value={choosed[4]} indexed={4}/>
        <JumbledButton title="6 no. question" value={choosed[5]} indexed={5}/>
        <JumbledButton title="7 no. question" value={choosed[6]} indexed={6}/>
        <JumbledButton title="8 no. question" value={choosed[7]} indexed={7}/>
        <JumbledButton title="9 no. question" value={choosed[8]} indexed={8}/>
        <JumbledButton title="10 no. question" value={choosed[9]} indexed={9}/>
        <JumbledButton title="11 no. question" value={choosed[10]} indexed={10}/>
        <JumbledButton title="12 no. question" value={choosed[11]} indexed={11}/>
        <JumbledButton title="13 no. question" value={choosed[12]} indexed={12}/>
        <JumbledButton title="14 no. question" value={choosed[13]} indexed={13}/>
        <JumbledButton title="15 no. question" value={choosed[14]} indexed={14}/>
        <JumbledButton title="16 no. question" value={choosed[15]} indexed={15}/>
        <JumbledButton title="17 no. question" value={choosed[16]} indexed={16}/>
        <JumbledButton title="18 no. question" value={choosed[17]} indexed={17}/>
        <JumbledButton title="19 no. question" value={choosed[18]} indexed={18}/>
        <JumbledButton title="20 no. question" value={choosed[19]} indexed={19}/>
        <JumbledButton title="21 no. question" value={choosed[20]} indexed={20}/>
        <JumbledButton title="22 no. question" value={choosed[21]} indexed={21}/>
        <JumbledButton title="23 no. question" value={choosed[22]} indexed={22}/>
        <JumbledButton title="24 no. question" value={choosed[23]} indexed={23}/>
        <JumbledButton title="25 no. question" value={choosed[24]} indexed={24}/>
        <JumbledButton title="26 no. question" value={choosed[25]} indexed={25}/>
        <JumbledButton title="27 no. question" value={choosed[26]} indexed={26}/>
        <JumbledButton title="28 no. question" value={choosed[27]} indexed={27}/>
        <JumbledButton title="29 no. question" value={choosed[28]} indexed={28}/>
        <JumbledButton title="30 no. question" value={choosed[29]} indexed={29}/>
       </ScrollView>
          <View style={{marginTop:20}}>
          <Question maxcap={this.state.max} text={this.state.question[this.props.index.value]}
          image={this.state.questionimage[this.props.index.value]}/>
          </View>
          <View style={{marginTop:20}}>
          <ListItem>
            <CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#FF8A65"
            checked={this.state.check1}
            onPress={() =>
              {
                choosed[this.props.index.value]='a'
                 this.check(1)
              }
             } color="#FF8A65"/>
            <Body>
              <Text style={{color:'#7B1FA2',fontSize:25,marginLeft:10}}>Option a</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#FF8A65"
            checked={this.state.check2}
            onPress={()=>
              {
                choosed[this.props.index.value]='b'
                 this.check(2)
              }
            } color="#FF8A65"/>
            <Body>
              <Text style={{color:'#7B1FA2',fontSize:25,marginLeft:10}}>Option b</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#FF8A65"
            checked={this.state.check3}
            onPress={()=>
              {
                choosed[this.props.index.value]='c'
                 this.check(3)
              }
            } color="#FF8A65"/>
            <Body>
              <Text style={{color:'#7B1FA2',fontSize:25,marginLeft:10}}>Option c</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#FF8A65"
            checked={this.state.check4}
            onPress={()=>
              {
                choosed[this.props.index.value]='d'
                 this.check(4)
              }
            } color="#FF8A65"/>
            <Body>
              <Text style={{color:'#7B1FA2',fontSize:25,marginLeft:10}}>Option d</Text>
            </Body>
          </ListItem>
          </View>
          <View>
          <Text style={{color:'#7B1FA2',fontSize:15,marginLeft:10}}>The answer previously you have entered</Text>
          <Text style={{color:'#FF8A65',fontSize:25,marginLeft:10}}>{choosed[this.props.index.value]}</Text>
          </View>
          <View style={{flexDirection:'row',justifyContent: 'space-between',marginTop:30}}>
          <Button rounded style={{paddingLeft:width/8,paddingRight:width/8,backgroundColor:"#FF8A65",alignSelf: 'flex-start'}} onPress={this.decreament}>
          <Text style={{color:"white"}}>Prev</Text>
        </Button>
          <Button rounded style={{paddingLeft:width/8,paddingRight:width/8,backgroundColor:'#7B1FA2',alignSelf: 'flex-end'}} onPress={this.increament}>
          <Text style={{color:"white"}}>Next</Text>
        </Button>
        </View>
        <View style={{marginTop:30}}>
        </View>
       </ScrollView>
     );
   }
   }
}
const mapStateToProps=(state)=>{
  return {
    username:state.userReducer,
    math:state.mathReducer,
    index:state.index,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    increament:(num)=>{
      dispatch(increamentValue(num));
    },
    zero:()=>{
      dispatch(zero());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Examjeemain);
