import React from 'react';
import {ScrollView,Text} from 'react-native';
import Displaythings from './Displaythings.js'
export default class Pdffile extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      notice:[]
    }
  }
  componentWillMount(){
    firebase=this.props.navigation.getParam('firebase','');
    const db=firebase.database()
    const ref=db.ref("/noticeboard")
    ref.once("value").then((snap)=>{
      var result1=snap.val()
      var result=result1.reverse();
      this.setState({notice:result})
    }).catch((err)=>{
      console.warn("There are some error occur"+err);
    })
  }
  render()
  {
    const {notice}=this.state;
    return(
      <ScrollView>
      {notice.map((item,i)=>(
        <Displaythings key={i} text={item.data.noticeText} image={item.data.noticeImage} date={item.data.date}/>
      ))}
      </ScrollView>

    );
  }
}
