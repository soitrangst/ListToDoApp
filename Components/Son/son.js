import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import checklistBox from "../../media/checkboxF.png";
import Process from "../addMore/process"

const { height, width } = Dimensions.get('window');

export default class ComponentSon extends Component {
    static navigationOption = {
        header: null
    }


    render() {
        const { tagChil, iconStyleCheckBox } = styles;
        console.log()
        return (
            <View>
                {this.props.itemCon.map((item, key) => {
                    return (
                        <View style={tagChil} key={key}>
                            <View style={{ marginBottom: height / 150, marginTop: height / 150, }}>
                                <TouchableOpacity onPress={() => { this.props.movetochild(item.chau, item) }} >
                                
                                    <Text>{item.contendC} </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }} >

                                        <Image source={checklistBox} style={iconStyleCheckBox} />
                                        
                                        <Process ref='process' nephew={item.chau} />
                                    </View>

                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    iconStyleCheckBox: {
        width: height / 25,
        height: height / 25,
    },
    tagChil: {
        marginBottom: height / 200,
        marginTop: height / 200,
        width: width - width / 8,
        margin: height / 150,
        backgroundColor: "#FFFFF2",
        borderRadius: height / 100

    },

})
