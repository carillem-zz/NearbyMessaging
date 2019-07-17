import React from 'react';
import RNNearbyMessagingLibrary from 'react-native-nearby-messaging-library-with-notifications';
import { StyleSheet, Text, View } from 'react-native';

const nearbyMessaging: any = RNNearbyMessagingLibrary

export default class App extends React.Component
{
  componentDidMount()
  {
    nearbyMessaging.checkLibraryConnection()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
