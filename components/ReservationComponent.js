import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Alert, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import {  Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    }
  }

  static navigationOptions = {
    title:"Reserve Table"
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  handleReservation() {
    this.presentLocalNotification(this.state.date)
    this.reserveButton();
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
        title: 'Your Reservation',
        body: 'Reservation for '+ date + ' requested',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            color: '#512DA8'
        }
    });
}

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    });
  }

  reserveButton(){
    
    const reservation = 'Number of Guests ' + this.state.guests + 
                        '\n Smoking: ' + this.state.smoking +
                        '\n Date and Time: ' + this.state.date;
    Alert.alert(
      'Your Reservation OK?',
      reservation,
      [
        { text: 'Cancel', 
        onPress: () => console.log('Not Deleted'),
        style: ' cancel'
        },
        {
          text: 'Ok',
          onPress: () => this.resetForm()
        }
      ],
      { cancelable: false }
    )
  } 

  render() {



    return(
      <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
      <Card>
      <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
            >
              <Picker.item label="1" value="1" />
              <Picker.item label="2" value="2" />
              <Picker.item label="3" value="3" />
              <Picker.item label="4" value="4" />
              <Picker.item label="5" value="5" />
              <Picker.item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
        <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
        <Switch
          style={styles.formItem}
          value={this.state.smoking}
          trackColor='#512DA8'
          onValueChange={(value) => this.setState({ smoking: value })}
          >
        </Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <DatePicker
            styles={{flex: 1, marginRight: 20}}
            date={this.state.date}
            format=''
            mode='datetime'
            placeholder='select date and time'
            minDate='2020-07-23' 
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({ date: date })}}
            ></DatePicker>
        </View>
        <View style={styles.formRow}>
          <Button 
           onPress={() => this.handleReservation()}
           title='Reserve'
           color='#512DA8'
           accessibilityLabel="Learn more about this purple button" />
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {this.toggleModal(); this.resetForm()}}
          onRequestClose={() => {this.toggleModal(); this.resetForm()}}
          >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Reservation</Text>
            <Text style={styles.modalText}>Number of Guest: {this.state.guests}</Text>
            <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
            <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
            <Button onPress={() => {this.toggleModal(); this.resetForm()}}
              color='#512DA8'
              title="Close"></Button>
          </View>

        </Modal>
      </ScrollView>
      </Card>
      </Animatable.View>
    );
  }

}

export const styles = StyleSheet.create({
  formRow:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20 
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default Reservation;