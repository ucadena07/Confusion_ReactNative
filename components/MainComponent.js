import React, { Component } from 'react';
import { Button, View, Platform, Image, StyleSheet, ScrollView, Text, SafeAreaView} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import fetch from 'cross-fetch'

import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent'
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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
function ReservationNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={({ navigation }) => ({
                    
                  headerLeft: () => (
                    <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()}  />  
                  ),
              })}
            />
        </HomeNavigator.Navigator>
        
    );
  }
  function FavoritesNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Favorites"
                component={Favorites}
                options={({ navigation }) => ({
                    
                  headerLeft: () => (
                    <Icon name='menu' size={30} color='white' onPress={() => navigation.toggleDrawer()}  />  
                  ),
              })}
            />
        </HomeNavigator.Navigator>
        
    );
  }

  function LoginNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Login"
                component={Login}
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

            <MainNavigator.Screen name="Login" component={LoginNavigatorScreen} options={{ drawerIcon: ({ tintColor}) =>
            <Icon name='sign-in' type="font-awesome" size={24} color={tintColor} />}}/>

            <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} options={{ drawerIcon: ({ tintColor }) => 
            <Icon name='home' type='font-awesome' size={24} color={tintColor}/>  }}/>

            <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} options={{ drawerIcon: ({ tintColor }) => 
            <Icon name='list' type='font-awesome' size={24} color={tintColor}/>  }}/>

            <MainNavigator.Screen name="My Favorites" component={FavoritesNavigatorScreen} options={{ drawerIcon: ({ tintColor}) =>
            <Icon name='heart' type="font-awesome" size={24} color={tintColor} />}}/>

            <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen} options={{ drawerIcon: ({ tintColor}) => 
            <Icon name='info-circle' type="font-awesome" size={24} color={tintColor} /> }} />

            <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} options={{ drawerIcon: ({ tintColor}) =>
            <Icon name='address-card' type="font-awesome" size={21} color={tintColor} />}}/>

            <MainNavigator.Screen name="Reserve Table" component={ReservationNavigatorScreen} options={{ drawerIcon: ({ tintColor}) =>
            <Icon name='cutlery' type="font-awesome" size={24} color={tintColor} />}}/>

           

        </MainNavigator.Navigator>
    );
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);