import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { render } from 'react-dom';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function Contact() {
 
  return(
    <View>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card
          title='Contact Information'>
          
          <Text >121, Clear Water Bay Road{'\n'}{'\n'}
                Clear Water Bay, Kowloon{'\n'}{'\n'}
                HONG KONG{'\n'}{'\n'}
                Tel: +852 1234 5678{'\n'}{'\n'}
                Fax: +852 8765 4321{'\n'}{'\n'}
                Email:confusion@food.net{'\n'}{'\n'}
          </Text>  
        </Card>
      </Animatable.View>
    </View>
  );


}

export default Contact;