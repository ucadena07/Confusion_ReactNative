import React, { Component } from 'react';
import { Button, View, Platform, Image, StyleSheet, ScrollView, Text, SafeAreaView} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';


import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

const MenuNavigator = createStackNavigator();

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff",               
    },
    
};

function MenuNavigatorScreen() {

    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
         
        >
            <MenuNavigator.Screen
                name= "Menu"
                component={Menu}
                options={({ navigation }) => ({
                    headerLeft: () => (
                      <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    ),
                })}
               
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();


function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
            
        >
            <HomeNavigator.Screen
                name='Home'
                component={Home}
                options={({ navigation }) => ({
                    
                    headerLeft: () => (
                      <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                    ),
                })}
            />
        </HomeNavigator.Navigator>
        
    );
}

function AboutNavigatorScreen() {
  return(
      <HomeNavigator.Navigator
          initialRouteName='Menu'
          screenOptions={HeaderOptions}
      >
          <HomeNavigator.Screen
              name="About"
              component={About}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()} />
                ),
            })}
          />
      </HomeNavigator.Navigator>
      
  );
}

function ContactNavigatorScreen() {
  return(
      <HomeNavigator.Navigator
          initialRouteName='Menu'
          screenOptions={HeaderOptions}
      >
          <HomeNavigator.Screen
              name="Contact"
              component={Contact}
              options={({ navigation }) => ({
                  
                headerLeft: () => (
                  <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()}  />  
                ),
            })}
          />
      </HomeNavigator.Navigator>
      
  );
}

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
            <View style={{flex:1}}>
                <Image source={require('./images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
      </DrawerContentScrollView>
    );
  }

const MainNavigator = createDrawerNavigator();


function MainNavigatorDrawer() {
    return(
        
        <MainNavigator.Navigator 
            drawerType='slide'
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerStyle={{
                backgroundColor:'#D1C4E9',
                
            }}  
        >
            <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} options={{ drawerIcon: ({ tintColor }) => 
            <Icon name='home' type='font-awesome' size={24} color={tintColor}/>  }}/>

            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} options={{ drawerIcon: ({ tintColor }) => 
            <Icon name='list' type='font-awesome' size={24} color={tintColor}/>  }}/>

            <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen} options={{ drawerIcon: ({ tintColor}) => 
            <Icon name='info-circle' type="font-awesome" size={24} color={tintColor} /> }} />

            <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} options={{ drawerIcon: ({ tintColor}) =>
            <Icon name='address-card' type="font-awesome" size={22} color={tintColor} />}}/>
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

  render() {
 
    return(
        <NavigationContainer>
            <MainNavigatorDrawer/>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#FDF8F7',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
  
export default Main;