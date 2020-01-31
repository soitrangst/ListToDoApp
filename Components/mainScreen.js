import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DeteleModal from "./button/deteleModalCha";
import Modal from "react-native-modal";
import Son from "./Son/son";
import xoa from "../media/recycle.png";
import {connect} from "react-redux";
 

const { height, width } = Dimensions.get('window');
 class MainScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props)
        this.state={
            text:"",
            textchild:'',
 
        }
    }


     handleSubmit = (a)=>{
         const {text} = this.state;
         if (!text) return;
         this.props.dispatch({type: "addSon",text,id:a.id})
         this.setState({text:''})
     }


    addMoreTask () {
        this.props.dispatch({type:'addNewArray'})
    }
    
    addMoreTaskChild = (a) => {
        const {textchild} = this.state;
        if (!textchild) return;
        this.props.dispatch({type:'addChildArray',id: a.id,textchild,idcon: a.con.length-1});
        this.props.dispatch({type:'addHeight',id:a.id})
        this.setState({textchild:''})
         }
    
    deleteModal(idcha){
        this.props.dispatch({type:'toggleModal',idcha})
    }

    render() {
        const { addNewTag, textInput1,textInput, iconStyle, addTag, addDsCv,} = styles;
      
        
        let newTaskParent = this.props.myArray.map((item, key) => {

            return (
                <View style={{ 
                    height:item.chieucao,
                    width: width - width / 10,
                    marginTop: height / 40,
                    marginLeft: width / 20,
                    marginRight: width / 25,
                    backgroundColor: "#f6c2c2"}}
                    key={key}>
                    <View>
                        <View style={{ flexDirection: "row", backgroundColor: "#fff568", justifyContent: "center", alignItems: "center" }}>
                            <TextInput style={textInput}
                                textAlign={'left'}
                                defaultValue={item.contend}
                                onChangeText={(text)=>this.setState({text})}
                                onSubmitEditing={this.handleSubmit.bind(this,item)}
                                keyboardType={'email-address'}
                            />
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={this.deleteModal.bind(this,item.id)}>
                                    <Image source={xoa} style={iconStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <ScrollView  >
                        <Son itemCon={item.con} movetochild={(chau,con)=> {this.props.navigation.navigate('MyChildScreen',{a:chau,c:con,b:item,})}}/>
                    </ScrollView>
                    <View style={addTag}>
                    <TextInput style={textInput1}
                                textAlign={'left'}
                                value={this.state.textchild}
                                placeholder= 'Add More'
                                placeholderTextColor='#2BDE73'
                                onChangeText={(textchild)=>this.setState({textchild})}
                                onSubmitEditing={this.addMoreTaskChild.bind(this,item)}
                                keyboardType={'email-address'}
                            />
                    </View> 
                    <Modal isVisible={item.toggleModal}
                        onBackdropPress={this.deleteModal.bind(this,item.id)}
                        animationIn='fadeIn'
                        animationOut='bounceOut'
                    >

                        <DeteleModal
                            id={key}
                            turnBack={this.deleteModal.bind(this,item.id)} />

                    </Modal>

                </View>
            );
        });

        return (
            <View style={{ flex: 1 }}>

                <ScrollView horizontal={true} style={{ backgroundColor: "#d4edf4" }}>

                    {newTaskParent}
                    <View style={addNewTag}>
                        <TouchableOpacity onPress={this.addMoreTask.bind(this)}>
                            <Text style={addDsCv}>MAKE NEW TAG</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>


            </View>

        )
    }
}

function mapStateToProps(state){
    
    return { myArray: state.dataArray};
    
}

export default connect(mapStateToProps)(MainScreen);

const styles = StyleSheet.create({
    placetag: {
        height: height / 5,
        width: width - width / 10,
        marginTop: height / 40,
        marginLeft: width / 20,
        marginRight: width / 25,
        backgroundColor: "#f6c2c2"
    },
    addNewTag: {
        height: height / 10,
        width: width - width / 10,
        marginTop: height / 40,
        marginLeft: width / 20,
        marginRight: width / 25,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: width/40
    },
    addDsCv: {
        color: "#f6003c",
        fontSize: 20,
    },
    textInput: {
        marginBottom: height/150,
        marginTop:height/150,
        width: width - width /5.5,
        marginLeft:width/80,

    },
    textInput1: {
        marginTop: height*0.009,
        width: width - width / 5,
        marginLeft:width/12,
    },
    iconStyle: {
        width: height / 40,
        height: height / 40,
        marginLeft: height / 400,
        padding: height/60
    },
    iconStyleCheckBox: {
        width: height / 25,
        height: height / 25,
    },
    tagChil: {
        height: height / 13,
        width: width - width / 8,
        margin: height / 150,
        backgroundColor: "#f9fbba",

    },
    addTag: {
        height: height / 16,
        width: width,
        backgroundColor: "#FFFFF2"

    },
})
