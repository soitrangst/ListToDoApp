import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import CheckBox from '@react-native-community/checkbox'
import Process from "../addMore/process";
import Nofification from "../../localNotification"
import EdittingTitle from '../button/edittingTitle';
import DeteleModal from '../button/deteleModal';
import { TextInput } from "react-native-gesture-handler";
import menu from "../../media/menu.png";
import backButton from "../../media/back.png";
import checklistBox from "../../media/checkboxF.png";
import recycle from "../../media/recycle.png";
import Modal from "react-native-modal";
import MenuModal from "../button/menuModal"
import { connect } from "react-redux";

const { height, width } = Dimensions.get("screen");

class nephew extends Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            textcon: '',
            check: false,
            textnephew: '',
            modalmenu: false,
            modalDetele: false,
            modalAlarm: false,
            num: false
        }
    }
    deleteNephew = (id) => {
        const con = this.props.navigation.getParam('c');
        const cha = this.props.navigation.getParam('b');
        const { num } = this.state.num;
        this.props.dispatch({
            type: 'deleteNephew',
            key: id,
            idcha: cha.id,
            idcon: con.idcon
        })
        this.setState({ num: !num })
    }

    backMain = () => {
        this.props.navigation.goBack();
    }

    handleChangeTextCon() {
        const con = this.props.navigation.getParam('c');
        const cha = this.props.navigation.getParam('b');
        const { textcon } = this.state;
        if (!textcon) return
        this.props.dispatch({
            type: 'addNephew',
            textcon,
            idcha: cha.id,
            idcon: con.idcon,
            id: con.chau.length - 1
        })
        this.setState({ textcon: "" })
    }

    handleEditCon = (idchau) => {
        const con = this.props.navigation.getParam('c');
        const cha = this.props.navigation.getParam('b');
        const { textnephew } = this.state;
        if (!textnephew) return
        this.props.dispatch({
            type: 'editNephew',
            textnephew,
            idcha: cha.id,
            idcon: con.idcon,
            idchau
        })
    }

    handleCheckBox = (id) => {
        const con = this.props.navigation.getParam('c');
        const cha = this.props.navigation.getParam('b');
        const { check } = this.state.check
        this.props.dispatch({ type: 'checkBox', idcha: cha.id, idcon: con.idcon, id })
        this.setState({ check: !check })
    }

    setModalMenu = () => {
        this.setState({ modalmenu: !this.state.modalmenu });
    }

    setEditing = () => {
        this.setState({ textcon: '' })
    }

    setModalDetele = () => {
        this.setState({ modalDetele: !this.state.modalDetele });
    }
    setModalAlarm = () => {
        this.setState({ modalAlarm: !this.state.modalAlarm });
    }


    render() {
        const { topTitle, secondTitle, textStyleTitle, taskInput, iconStyle,
            iconStyleChild, taskInputChild, iconStyleBack, addTaskInputChild, textStyle } = styles;

        const chau = this.props.navigation.getParam('a');
        const cha = this.props.navigation.getParam('b');
        const con = this.props.navigation.getParam('c');
        const titlecon = con.contendC;


        let checklist = chau.map((e, key) => {
            return (
                <View style={{ flexDirection: "row", flexDirection: "row", alignItems: "center", paddingTop: 5 }} key={e.idchau}>

                    <CheckBox
                        value={e.check}
                        onValueChange={this.handleCheckBox.bind(this, key)}
                    />

                    <TextInput style={taskInputChild}
                        textAlign={'left'}
                        defaultValue={e.contentChau}
                        onChangeText={(textnephew) => this.setState({ textnephew })}
                        keyboardType={'email-address'}
                        onSubmitEditing={this.handleEditCon.bind(this, e.idchau)}

                    />
                    <View>
                        <TouchableOpacity onPress={this.deleteNephew.bind(this, key)}>

                            <Image source={recycle} style={iconStyleChild} />

                        </TouchableOpacity>


                    </View>
                </View>
            )
        })

        return (
            <View style={{ flex: 1 }}>

                <View style={topTitle}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Image source={backButton} style={iconStyleBack} />
                    </TouchableOpacity>

                    <Text style={textStyleTitle}>{titlecon}</Text>

                    <Modal isVisible={this.state.modalmenu}
                        onBackdropPress={() => { this.setModalMenu() }}
                        backdropColor={"transparent"}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                    >

                        <MenuModal toggle={this.setModalMenu} toggleDetele={this.setModalDetele} toggleAlarm={this.setModalAlarm} />

                    </Modal>
                    <Modal isVisible={this.state.modalAlarm}
                        onBackdropPress={() => { this.setModalAlarm() }}
                        backdropColor={"transparent"}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                    >
                        <View>
                            <Nofification styleNot={height / 2} sonData={con} fatherData={cha} toggleNot={this.setModalAlarm} />
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => { this.setModalMenu() }}>
                        <Image source={menu} style={iconStyle} />
                    </TouchableOpacity>

                    <Modal isVisible={this.state.modalDetele}
                        onBackdropPress={() => { this.setModalDetele() }}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                    >

                        <DeteleModal
                            son={con}
                            father={cha}
                            toggleDetele={this.setModalDetele}
                            turnBack={this.backMain} />

                    </Modal>


                    <EdittingTitle
                        update={this.setEditing}
                        son={con}
                        father={cha}
                    />

                </View>
                <View style={secondTitle}>
                    <View style={{ flexDirection: "row", alignItems: "center", height: height / 16 }}>
                        <Image source={checklistBox} style={iconStyle} />
                        <View style={taskInput}>
                            <Text style={textStyle}>Progression </Text>
                        </View>
                        <View style={{ alignContent: "center", marginLeft: width / 30 }}>
                            <Process nephew={chau} />
                        </View>
                    </View>
                    <View style={{ padding: width / 200, backgroundColor: "#d9d9f3" }}></View>
                    <ScrollView>

                        {checklist}

                        <TextInput style={addTaskInputChild}
                            textAlign={'left'}
                            value={this.state.textcon}
                            placeholder='Add checkbox'
                            placeholderTextColor="#260033"
                            onChangeText={(textcon) => this.setState({ textcon })}
                            onSubmitEditing={this.handleChangeTextCon.bind(this)}
                            keyboardType={'email-address'}
                        />


                    </ScrollView>
                </View>
            </View>
        )
    }
}


export default connect()(nephew);

const styles = StyleSheet.create({
    topTitle: {
        flex: 2,
        backgroundColor: "#8ac6d1",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    modalEdittingTitle: {

        height,
        width,
        marginRight: 2000,
        marginBottom: height - height / 3.8,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textStyleTitle: {
        width: width - width / 5,
        borderBottomColor: "transparent",
        fontSize: 25,
        fontWeight: "bold"

    },
    titleInput: {
        backgroundColor: "#8ac6d1",
        width: width - width / 5,
        marginLeft: 5,
        marginRight: 5,
        borderBottomColor: "transparent",
        fontSize: 25,
        fontWeight: "bold"

    },
    secondTitle: {
        flex: 8,
        backgroundColor: "#ffffff",
    },
    title: {
        backgroundColor: "#8ac6d1",
        flex: 2,
        margin: height / 20

    },
    list: {
        flex: 8,
        backgroundColor: "grey"
    },
    textStyle: {
        backgroundColor: "white",
        width: width - width / 5,
        borderBottomColor: "transparent",
        fontSize: 25,
        fontWeight: "bold"

    },
    taskInput: {
        backgroundColor: "#ffffff",
        borderColor: "black",
        width: width - width / (4),
        fontSize: 25,
        fontWeight: "bold"

    },
    iconStyle: {
        width: height / 25,
        height: height / 25,

    },
    iconStyleEdit: {
        width: height / 20,
        height: height / 20,
    },
    iconStyleBack: {
        width: height / 20,
        height: height / 20,

    },
    iconStyleChild: {
        width: height / 30,
        height: height / 30,
    },
    taskInputChild: {
        backgroundColor: "#ffffff",
        borderColor: "black",
        width: width - width / 6,
        fontSize: 20
    },
    addTaskInputChild: {
        backgroundColor: "white",
        borderColor: "black",
        fontSize: 20,
        marginLeft: height / 20,
        width: width - width / 5,

    },
})