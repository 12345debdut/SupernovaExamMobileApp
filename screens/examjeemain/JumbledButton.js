import React from 'react';
import {Button,Text} from 'native-base';
import {View,Dimensions} from 'react-native';
import increamentValue from '../../actions/JymbledValueAction.js';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
class JumbledButton extends React.Component{
  jumble(num)
  {
    this.props.increament(num);
  }
  render()
  {
    return(
      <View>
      {(this.props.value)?<Button rounded onPress={()=>{this.jumble(this.props.indexed)}}
       style={{paddingRight:width/12,paddingRight:width/12,backgroundColor:'#0be881'}}><Text style={{color:'white'}}>{this.props.title}</Text></Button>
       : <Button rounded onPress={()=>{this.jumble(this.props.indexed)}}
        style={{paddingRight:width/12,paddingRight:width/12,backgroundColor:'#ff3f34'}}><Text style={{color:'white'}}>{this.props.title}</Text></Button>
      }
      </View>
    );
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
      console.log(num);
      dispatch(increamentValue(num));
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(JumbledButton);
