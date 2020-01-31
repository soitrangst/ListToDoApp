import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("screen");

class deteleModalCha extends Component {

 

    yes(){
        const key = this.props.id
        this.props.dispatch({type:'deleteDataFather',key})
    }
    
    render() {
        const {  wrapper ,buttonSquare,content,text,buttonCancel,buttonYes} = styles

        return (
            <View style={wrapper}>

                <View style={content}>
                    <Text style={text}>
                        Make sure you wanna delete!{"\n"}
                        All this task will be removed!!!
                    </Text>
                </View>

                <View style={buttonSquare}>

                <TouchableOpacity onPress={()=> {this.props.turnBack()}}
                style={buttonCancel}
                >
                    <Text >
                    Cancel  
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this.yes.bind(this)}
                style={buttonYes}>
                    <Text>
                    Yes
                    </Text>
                </TouchableOpacity>

                
                </View>

            </View>


        )
    }
}
export default connect()(deteleModalCha)

const styles = StyleSheet.create({
    wrapper: {
        height:height/8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:height/8

    },
    buttonSquare:{
        flexDirection:'row',
        flex:2,

    },
    content:{
        marginTop:height/200,
        flex:2,
        width: width - width/8,
        borderRadius:height/10,
        borderBottomWidth:height/1000,
        alignItems:'center',
        backgroundColor:'white'
        
    },
    text:{
        fontSize:16
    },
    buttonCancel:{marginLeft: width/50,padding:height/500, 
        backgroundColor:'#a696c8',
        width:width/4,alignItems:'center',
        justifyContent:'center',
        borderRadius:height/10},

    buttonYes:{marginLeft: width/50,padding:height/500,
         backgroundColor:'#b689b0',
         width:width/4,alignItems:'center',
         justifyContent:'center',
         borderRadius:height/10}

})