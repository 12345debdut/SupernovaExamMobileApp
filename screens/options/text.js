import React, { Component } from 'react';
import { StyleSheet,Image,ScrollView,Dimensions,View} from 'react-native';
var {height, width} = Dimensions.get('window');
import { Container, Header, Content, Card, CardItem, Text, Body,Icon, Accordion} from "native-base";
const dataArrayJe = [
  { title: "Rules", content: "Exam contains 30 questions of 4 marks.Each wrong answer deducts 1 mark.Total time is 1 hr." },

];
const dataArraywb = [
  { title: "Rules", content: "Exam contains 80 questions of 1 mark and 10 questions of 2 marks.Each wrong answer deducts 0.25 mark for 80 and 0.50 for last 10 questions.Total time is 2 hrs." }
];
export default class Cardtext extends Component {
  render() {
    var back=require('./back.jpg');
    var back1=require('./back1.jpg')
    return (
   <ScrollView>
          <Card>
            <CardItem header bordered>
            <Icon name='rose' style={{fontSize: 20, color: '#9E9D24'}} />
              <Text style={{color:'#3E2723'}}>JEEMAIN Rules</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Image source={back} style={{resizeMode:'cover',width:width-30,height:200}}/>
              </Body>
            </CardItem>
            <CardItem footer bordered>
            <View>
              <Accordion dataArray={dataArrayJe} icon="add" expandedIcon="remove" iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }} headerStyle={{ backgroundColor: "#E1BEE7",width:width-20,borderColor:'#FFE082'}}
            contentStyle={{ backgroundColor: "#FFF8E1" }}/>
            </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
            <Icon name='rose' style={{fontSize: 20, color: '#9E9D24'}}/>
              <Text style={{color:'#3E2723'}}>WBJEE Rules</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Image source={back1} style={{resizeMode:'cover',width:width-30,height:200}}/>
              </Body>
            </CardItem>
            <CardItem footer bordered>
            <View>
            <Accordion dataArray={dataArraywb} icon="add" expandedIcon="remove" iconStyle={{ color: "green" }}
          expandedIconStyle={{ color: "red" }} headerStyle={{ backgroundColor: "#E1BEE7",width:width-20,borderColor:'#FFE082'}}
          contentStyle={{ backgroundColor: "#FFF8E1" }}/>
            </View>
            </CardItem>
          </Card>
      </ScrollView>
    );
  }
}
