import React, { Component } from 'react';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import Dashboard from './src/Dashboard';

export default class localNotification extends Component {
  componentDidMount() {
    // Create notification channel required for Android devices
    this.createNotificationChannel();

    // Ask notification permission and add notification listener
    this.checkPermission();
  }

  createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new firebase.notifications.Android.Channel(
      'reminder',
      'Reminders Channel',
      firebase.notifications.Android.Importance.High
    ).setDescription('Used for getting reminder notification');

    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.notificationListener = firebase.notifications().onNotification(async notification => {
        // Display your notification
        await firebase.notifications().displayNotification(notification);
      });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
        );
      }
    }
  };

  render() {
    return <Dashboard style={this.props.styleNot} conData={this.props.sonData} chaData={this.props.fatherData} toggleAlarm={this.props.toggleNot} />;
  }
}