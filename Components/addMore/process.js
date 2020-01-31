import React, { Component } from "react";
import { View, Text } from "react-native";


export default class process extends Component {


    percentage() {
        let color = 'white';
        const chau = this.props.nephew;
        const numTrue = chau.filter(item => item.check === true);
        const numFalse = chau.filter(item => item.check === false);
        const numChecked = numTrue.length;
        const numUncheck = numFalse.length;
        const percent = Math.round((numChecked / (numChecked + numUncheck)) * 100)
        if (percent ===NaN) {
            return <Text style={{ color, fontSize: 20 }}>{percent} %</Text>   
        } else {
            if (percent < 50) {
                color = 'red'
                return <Text style={{ color, fontSize: 20 }}>{percent} %</Text>
            } else {
                if (percent<99) {
                    color = '#009A31'
                    return <Text style={{ color, fontSize: 20 }}>{percent} %</Text>
                } else { 
                    if(percent ==100)
                    color = 'purple'
                    return <Text style={{ color, fontSize: 20 }}>{percent} %</Text>                    
                }
            }
        }

    }

    render() {

        return (
            <View>
                {this.percentage()}
            </View>

        )
    }
}


