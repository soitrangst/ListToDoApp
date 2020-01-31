import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";


const { height, width } = Dimensions.get("screen");

class menuModal extends Component {

    setModalEditting(){
        this.props.dispatch({type:'toggleModalEdit'})
        this.props.toggle()
    }
    render() {
        const {  wrapper,buttonStyle ,buttonCancel} = styles
        return (
            <View style={wrapper}>
                <TouchableOpacity onPress={()=> {this.props.toggleDetele()}} onPressIn={()=>{this.props.toggle()}}
                style={buttonStyle}
                >
                    <Text style={buttonCancel}>
                    Delete    
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setModalEditting() }}
                style={buttonStyle}
                >
                    <Text style={buttonCancel}>
                    Change Title
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.props.toggleAlarm() }} onPressIn={()=>{this.props.toggle()}}
                style={buttonStyle}
                >
                    <Text style={buttonCancel}>
                    Alarm
                    </Text>
                </TouchableOpacity>

                <View></View>
                <View></View>

            </View>


        )
    }
}
export default connect()(menuModal)
const styles = StyleSheet.create({
    wrapper: {
        height: height / 14,
        width: width / 2 - width / 4,
        alignContent: "center",
        marginLeft: width - width / 3,
        marginBottom: height - height/2.6 ,
        borderRadius: 5,
        justifyContent:'space-around'
        
    },
    buttonStyle:{
        marginLeft: width/50,
        borderRadius:5,

    },
    buttonCancel:{
        fontSize:15,
        padding:height/500, 
        fontWeight:'bold',
        backgroundColor:'white',
        color:'#ff585d',
        width:width/4,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:height/10},
})