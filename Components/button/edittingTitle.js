import React, { Component } from "react";
import { View, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import agree from '../../media/check.png';
import cancel from '../../media/cancel.png';
import { connect } from "react-redux";

const { height, width } = Dimensions.get("screen");

class edittingTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }
    }

    handleTitle() {
        const con = this.props.son;
        const cha = this.props.father;
        const { title } = this.state;
        this.props.dispatch({
            type: 'changeTitleSon',
            updateTitle: title,
            idcha: cha.id,
            idcon: con.idcon
        })
        this.props.dispatch({ type: 'toggleModalEdit' })
        this.props.update()

    }

    setModalEditting() {
        this.props.dispatch({ type: 'toggleModalEdit' })
    }

    render() {
        const { modalEdittingTitle, titleInput, iconStyleEdit } = styles
        return (
            <Modal visible={this.props.myData}
            transparent={true}
            >

                <View style={modalEdittingTitle}>

                    <TouchableOpacity onPress={() => { this.setModalEditting() }}>
                        <Image source={cancel} style={iconStyleEdit} />
                    </TouchableOpacity>

                    <TextInput style={titleInput}
                        textAlign={"left"}
                        underlineColorAndroid={'black'}
                        onChangeText={(title) => this.setState({ title })}
                        onSubmitEditing={this.handleTitle.bind(this)}
                        autoFocus={true}
                    />

                    <TouchableOpacity onPress={() => { this.setModalEditting() }}
                        onPressIn={this.handleTitle.bind(this)}>
                        <Image source={agree} style={iconStyleEdit} />
                    </TouchableOpacity>
                </View>
            </Modal>

        )
    }
}

function mapStateToProps(state) {
    return { myData: state.congtac }
}


export default connect(mapStateToProps)(edittingTitle)

const styles = StyleSheet.create({
    modalEdittingTitle: {
        backgroundColor: "#8ac6d1",
        height: height / 6,
        width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconStyleEdit: {
        width: height / 20,
        height: height / 20,
    },
    titleInput: {
        backgroundColor: "#8ac6d1",
        width: width - width / 5,
        borderBottomColor: "transparent",
        fontSize: 25,
        fontWeight: "bold"

    },
})