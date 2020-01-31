import React, { Component } from "react";
import {View} from "react-native";
import HomeScreen from "./mainScreen";
import ChilScreen from "./Son/nephew";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';



export default class Router extends Component{
    static navigationOptions = {
        headerShown: false,
        };
        
    render (){
        return (
            <View style={{flex:1}}>
            <AppContainer/>
            </View>
            
            
        )
    }
}
const MyStack = createStackNavigator({
    Home: HomeScreen,
    MyChildScreen: ChilScreen
},

);
const AppContainer = createAppContainer (MyStack);



