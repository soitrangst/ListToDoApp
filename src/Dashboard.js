import React, { Component } from 'react';
import { Platform, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { connect } from 'react-redux';


class Dashboard extends Component {

  state = {
    isDateTimePickerVisible: false,
    reset: false
  };


  componentDidMount() {
    this.setReminder();
  }
  componentDidUpdate(prevProps, prevState) {
    const { notificationTime, enableNotification } = this.props.conData;

    if (enableNotification !== prevState.enableNotification || notificationTime !== prevState.notificationTime) {
      this.setReminder();
    }
  }
  setReminder = async () => {
    const { notificationTime, enableNotification } = this.props.conData;
    if (enableNotification) {
      // schedule notification       
      firebase.notifications().scheduleNotification(this.buildNotification(), {
        fireDate: notificationTime.valueOf(),
        repeatInterval: 'day',
        exact: true,
      });
    } else {
      return false;
    }
  };

  buildNotification = () => {
    const title = Platform.OS === "android" ? "Danh sach cong viec can lam" : "";
    const notification = new firebase.notifications.Notification()
      .setNotificationId("1") // Any random ID
      .setTitle(title) // Title of the notification
      .setBody(this.props.conData.contendC) // body of notification
      .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
      .android.setChannelId('reminder') // should be the same when creating channel for Android
      .android.setAutoCancel(true); // To remove notification when tapped on it
    return notification;
  };


  enableNotification = (value) => {
    const idcon = this.props.conData.idcon;
    const idcha = this.props.chaData.id;
    this.props.dispatch({ type: 'toggleNot', value, idcon, idcha })
    this.setState({ reset: true });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    this.props.toggleAlarm()
  };

  handleDatePicked = (date) => {
    const idcon = this.props.conData.idcon;
    const idcha = this.props.chaData.id;
    this.props.dispatch({ type: 'alarmNot', not: moment(date), idcon, idcha })
    this.hideDateTimePicker();
  };

  render() {
    const { isDateTimePickerVisible } = this.state;
    const { notificationTime, enableNotification } = this.props.conData;
    return (
      <SafeAreaView style={this.props.style}>

        <View style={styles.cardTitleView}>
          <Text style={styles.cardTitle}>Add Reminder</Text>

        </View>

        <ListItem
          title="Notification"
          bottomDivider
          titleStyle={styles.titleStyle}
          switch={{ onValueChange: this.enableNotification, value: enableNotification }}
        />
        <ListItem
          title="Time"
          titleStyle={styles.titleStyle}
          onPress={this.showDateTimePicker}
          rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('lll')}</Text>}
        />


        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="time"
          is24Hour={true}
          date={new Date(notificationTime)}
          titleIOS="Pick your Notification time"
        />
      </SafeAreaView>
    );
  }
}
export default connect()(Dashboard)

const styles = StyleSheet.create({
  cardTitleView: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    color: '#585858',
    fontWeight: '600',
  },
  titleStyle: {
    fontSize: 20,
    color: '#585858'
  },
});