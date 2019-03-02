import React,{Component} from 'react'
import {View,BackHandler,ProgressBarAndroid,Dimensions,StyleSheet} from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body,Button} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
var {height, width} = Dimensions.get('window');
import { Rating } from 'react-native-elements';
import {addRate} from '../../actions/JeeMainAction.js';
import {connect} from 'react-redux';
class Rating2 extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      rating:0,
      percentage:0,
      result:0,
      maximum:0
    }
  }
  static navigationOptions={
    tittle:'Examination Paper',
    headerLeft:null,
  }
  componentWillMount()
  {
    BackHandler.addEventListener('hardwareBackPress', function() {
        return true;
      })
      var choosed=this.props.navigation.getParam('choosed','');
      var correct=this.props.navigation.getParam('correct','');
      var max=this.props.navigation.getParam('max','');
      for(i=0;i<max;i++)
      {
        if(choosed[i]!=null && choosed[i]!=undefined)
        {
        if(choosed[i]==correct[i])
        {
          this.state.result=this.state.result+4;
        }
        else {
          this.state.result=this.state.result-1;
        }
      }
      }
    this.setState({maximum:max*4});
    var maximum=max*4;
    var rate=(this.state.result/maximum)*5;
    var percentage=(this.state.result/maximum)*100;
    this.setState({percentage:percentage})
    this.setState({rating:rate})
    var data={
      jerating:rate,
      jepercentage:percentage
    }
    this.props.setName(data);
    var firebase=this.props.navigation.getParam('firebase','');
    var db=firebase.database();
    var ref = db.ref(`users/${this.props.username.username}`);
    ref.update({
      jerating:rate,
      jepercentage:percentage
    }).then((snap)=>{
    }).catch((err)=>{console.log(err)});
  }
  render()
  {
    var result=this.props.navigation.getParam('result','');
    var max=this.props.navigation.getParam('max','');
    var firebase=this.props.navigation.getParam('firebase','');
      return(
        <View>
        <View>
        <Card>
          <CardItem header bordered>
            <Text style={{color:'#3E2723'}}>Marks</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
             <Text style={{color:'#6A1B9A',fontSize:20}}>The marks of your exam is</Text>
             <Text style={{color:'#6A1B9A',fontSize:20}}>{this.state.result} OutOf {this.state.maximum}</Text>
            </Body>
          </CardItem>
        </Card>
        </View>
        <View>
        <Card>
          <CardItem header bordered>
            <Text style={{color:'#3E2723'}}>Rating of your given exam</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={this.state.rating}
              readonly
              imageSize={40}
              style={{ paddingVertical: 10 }}
            />
            </Body>
          </CardItem>
        </Card>
        </View>
        <View>
        <Card>
          <CardItem header bordered>
            <Text style={{color:'#3E2723'}}>Progress of your exam</Text>
          </CardItem>
          <CardItem bordered>
            <Body style={{width:width-10}}>
              <Text style={{color:'#6A1B9A',fontSize:20}}>Percentage is: {this.state.percentage}</Text>
            </Body>
          </CardItem>
        </Card>
        </View>
        <View>
        <Button rounded style={{paddingLeft:width/8,paddingRight:width/8,backgroundColor:'#7B1FA2',alignSelf: 'flex-end'}}
         onPress={()=>{this.props.navigation.navigate("Options",{firebase:firebase})}}>
        <Text style={{color:"white"}}>Back To Rule Page</Text>
      </Button>
      </View>
        </View>
      );
    }
}
const mapStateToProps=(state)=>{
  return {
    username:state.userReducer
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    setName:(name)=>{
      dispatch(addRate(name));
    }
  }
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(Rating2);
