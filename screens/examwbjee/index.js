import React from 'react'
import {View,Text,ScrollView,Alert,Dimensions,BackHandler,Image} from 'react-native'
import JumbledButton from './JumbledButton.js'
import { Button,ListItem,Body } from 'native-base';
import {ScreenOrientation} from 'expo'
import {CheckBox} from 'react-native-elements'
var {height, width} = Dimensions.get('window');
import Loading from '../loading/loading.js';
import Timer from './timer.js'
import Question from './question.js'
import increamentValue from '../../actions/wbindexValueAction.js';
import zero from '../../actions/wbindexValueZeroAction.js';
import {connect} from 'react-redux';
class Examwbjee extends React.Component{
  constructor(props){
    super(props)
    this.state={
      max:0,
      question:[],
      questionimage:[],
      questionheight:[],
      questionwidth:[],
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
      buttons:[]
    }
    this.increament=this.increament.bind(this);
    this.check=this.check.bind(this);
    this.submittest=this.submittest.bind(this);
    this.myfunc=this.myfunc.bind(this);
    this.decreament=this.decreament.bind(this);
  }
  static navigationOptions = {
  title: 'WBJEE',
  headerLeft:null,
  headerTintColor: '#ffd600',
  headerStyle: {
  backgroundColor: '#d81b60',
},
headerRight: <Timer/>
};
submittest(){
  const firebase=this.props.navigation.getParam('firebase','');
  this.props.zero();
  this.props.navigation.navigate("Rating",{choosed:this.state.choosed,correct:this.state.correct,max:this.state.max,firebase:firebase});
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
    //console.log(this.state.max + this.state.index)
    if(this.props.index.value==this.state.max-1)
    {
      //console.log("hiii");
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
    //console.log(this.state.choosed);
  }
  componentDidMount()
  {
    setTimeout(this.submittest,7208000);
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
    var ref = db.ref(`questionswbjee/`);
    ref.once("value").then((snap)=>{
      var result=snap.val();
      console.log(result);
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
        //for image height width array

        //correct answer array
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
  setTimeout(this.myfunc,10000);
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
        return <Loading title="WBJEE Examination" 
        description="Best Of luck for your examination!!! Good Luck!!!!"/>
     }
     else {
       const {choosed,index} = this.state;
     return(
       <ScrollView>
       <ScrollView horizontal={true} style={{marginTop:10}}>
        <JumbledButton title="01 no. question" value={choosed[0]} indexed={0}/>
        <JumbledButton title="02 no. question" value={choosed[1]} indexed={1}/>
        <JumbledButton title="03 no. question" value={choosed[2]} indexed={2}/>
        <JumbledButton title="04 no. question" value={choosed[3]} indexed={3}/>
        <JumbledButton title="05 no. question" value={choosed[4]} indexed={4}/>
        <JumbledButton title="06 no. question" value={choosed[5]} indexed={5}/>
        <JumbledButton title="07 no. question" value={choosed[6]} indexed={6}/>
        <JumbledButton title="08 no. question" value={choosed[7]} indexed={7}/>
        <JumbledButton title="09 no. question" value={choosed[8]} indexed={8}/>
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
        <JumbledButton title="31 no. question" value={choosed[30]} indexed={30}/>
        <JumbledButton title="32 no. question" value={choosed[31]} indexed={31}/>
        <JumbledButton title="33 no. question" value={choosed[32]} indexed={32}/>
        <JumbledButton title="34 no. question" value={choosed[33]} indexed={33}/>
        <JumbledButton title="35 no. question" value={choosed[34]} indexed={34}/>
        <JumbledButton title="36 no. question" value={choosed[35]} indexed={35}/>
        <JumbledButton title="37 no. question" value={choosed[36]} indexed={36}/>
        <JumbledButton title="38 no. question" value={choosed[37]} indexed={37}/>
        <JumbledButton title="39 no. question" value={choosed[38]} indexed={38}/>
        <JumbledButton title="40 no. question" value={choosed[39]} indexed={39}/>
        <JumbledButton title="41 no. question" value={choosed[40]} indexed={40}/>
        <JumbledButton title="42 no. question" value={choosed[41]} indexed={41}/>
        <JumbledButton title="43 no. question" value={choosed[42]} indexed={42}/>
        <JumbledButton title="44 no. question" value={choosed[43]} indexed={43}/>
        <JumbledButton title="45 no. question" value={choosed[44]} indexed={44}/>
        <JumbledButton title="46 no. question" value={choosed[45]} indexed={45}/>
        <JumbledButton title="47 no. question" value={choosed[46]} indexed={46}/>
        <JumbledButton title="48 no. question" value={choosed[47]} indexed={47}/>
        <JumbledButton title="49 no. question" value={choosed[48]} indexed={48}/>
        <JumbledButton title="50 no. question" value={choosed[49]} indexed={49}/>
        <JumbledButton title="51 no. question" value={choosed[50]} indexed={50}/>
        <JumbledButton title="52 no. question" value={choosed[51]} indexed={51}/>
        <JumbledButton title="53 no. question" value={choosed[52]} indexed={52}/>
        <JumbledButton title="54 no. question" value={choosed[53]} indexed={53}/>
        <JumbledButton title="55 no. question" value={choosed[54]} indexed={54}/>
        <JumbledButton title="56 no. question" value={choosed[55]} indexed={55}/>
        <JumbledButton title="57 no. question" value={choosed[56]} indexed={56}/>
        <JumbledButton title="58 no. question" value={choosed[57]} indexed={57}/>
        <JumbledButton title="59 no. question" value={choosed[58]} indexed={58}/>
        <JumbledButton title="60 no. question" value={choosed[59]} indexed={59}/>
        <JumbledButton title="61 no. question" value={choosed[60]} indexed={60}/>
        <JumbledButton title="62 no. question" value={choosed[61]} indexed={61}/>
        <JumbledButton title="63 no. question" value={choosed[62]} indexed={62}/>
        <JumbledButton title="64 no. question" value={choosed[63]} indexed={63}/>
        <JumbledButton title="65 no. question" value={choosed[64]} indexed={64}/>
        <JumbledButton title="66 no. question" value={choosed[65]} indexed={65}/>
        <JumbledButton title="67 no. question" value={choosed[66]} indexed={66}/>
        <JumbledButton title="68 no. question" value={choosed[67]} indexed={67}/>
        <JumbledButton title="69 no. question" value={choosed[68]} indexed={68}/>
        <JumbledButton title="70 no. question" value={choosed[69]} indexed={69}/>
        <JumbledButton title="71 no. question" value={choosed[70]} indexed={70}/>
        <JumbledButton title="72 no. question" value={choosed[71]} indexed={71}/>
        <JumbledButton title="73 no. question" value={choosed[72]} indexed={72}/>
        <JumbledButton title="74 no. question" value={choosed[73]} indexed={73}/>
        <JumbledButton title="75 no. question" value={choosed[74]} indexed={74}/>
        <JumbledButton title="76 no. question" value={choosed[75]} indexed={75}/>
        <JumbledButton title="77 no. question" value={choosed[76]} indexed={76}/>
        <JumbledButton title="78 no. question" value={choosed[77]} indexed={77}/>
        <JumbledButton title="79 no. question" value={choosed[78]} indexed={78}/>
        <JumbledButton title="80 no. question" value={choosed[79]} indexed={79}/>
        <JumbledButton title="81 no. question" value={choosed[80]} indexed={80}/>
        <JumbledButton title="82 no. question" value={choosed[81]} indexed={81}/>
        <JumbledButton title="83 no. question" value={choosed[82]} indexed={82}/>
        <JumbledButton title="84 no. question" value={choosed[83]} indexed={83}/>
        <JumbledButton title="85 no. question" value={choosed[84]} indexed={84}/>
        <JumbledButton title="86 no. question" value={choosed[85]} indexed={85}/>
        <JumbledButton title="87 no. question" value={choosed[86]} indexed={86}/>
        <JumbledButton title="88 no. question" value={choosed[87]} indexed={87}/>
        <JumbledButton title="89 no. question" value={choosed[88]} indexed={88}/>
        <JumbledButton title="90 no. question" value={choosed[89]} indexed={89}/>
       </ScrollView>
          <View style={{marginTop:20}}>
          <Question maxcap={this.state.max} text={this.state.question[this.props.index.value]}
          image={this.state.questionimage[this.props.index.value]} width={this.state.questionheight[this.props.index.value]}
          height={this.state.questionheight[this.props.index.value]}/>
          </View>
          <View>
          </View>
          <View style={{marginTop:20}}>
          <ListItem>
            <CheckBox center
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#FF8A65"
            checked={this.state.check1} onPress={() =>
              {
                choosed[this.props.index.value]='a'
                 this.check(1)
              }
             }/>
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
            }/>
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
            }/>
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
            }/>
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
    index:state.wbindex,
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
export default connect(mapStateToProps,mapDispatchToProps)(Examwbjee);
