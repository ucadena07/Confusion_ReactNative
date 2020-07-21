import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

class About extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS
    }
  }
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
          leftAvatar={{ source: require('./images/alberto.png')}}
        />      
      );
    }


    return(
      <ScrollView >
        <History />
        <Card
          title="Corporate Leadership" style={{ flex: 2}}>
          <FlatList 
            data={this.state.leaders}
            renderItem={renderLeaderItem}
            key={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
      
    );
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

export default About;