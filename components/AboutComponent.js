import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponents';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

class About extends Component {
  
  
  static navigationOptions = {
    title: 'About'
  };

  render() {

    const renderLeaderItem = ({item, index}) => {
      return(
        <ListItem 
          key={index}
          title={item.name}
          titleStyle={{ fontWeight: 'bold' }}
          subtitle={item.description}
          hideChevron={true} 
          leftAvatar={{ source:{ uri: baseUrl + item.image}}}
        />      
      );
    }

    if (this.props.leaders.isLoading){
      return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card title="Corporate Leadership">
            <Loading />
          </Card>
        </Animatable.View>
      );
    }
    else if (this.props.leaders.errMess) {
      return(
        <ScrollView>
          <History />
          <Card title="Corporate Leadership">
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
        </ScrollView>
      );
    }
    else {
      return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card
            title="Corporate Leadership">
            <FlatList 
              data={this.props.leaders.leaders}
              renderItem={renderLeaderItem}
              key={item => item.id.toString()}
            />
          </Card>
        </Animatable.View>
        
      );

    }

  }
}

function History() {
  return(
    <Card
            title="Our History" style={{ flex: 1}}>
              <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                With its unique brand of world fusion cuisine that can be found nowhere else, 
                Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                it enjoys patronage from the A-list clientele in Hong Kong.  
              </Text>
              <Text></Text>
              <Text>
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
              </Text>
            </Card>
      );
}

export default connect(mapStateToProps)(About);
