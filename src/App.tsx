/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
// @ts-ignore
import {Block, GalioProvider} from 'galio-framework';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Navigation from './navigation';
import {NavigationContainer} from '@react-navigation/native';
import Service from './Services/notification';
import argonTheme from '../src/constants/Theme';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
const service = new Service();
const App = () => {
  useEffect(() => {
    service.checkHasPermission();
    // service.getToken();
    const unsubscribe = service.messageListener();
    const unsubscribe_notification = service.notificationEvent();
    return () => {
      unsubscribe_notification;
      unsubscribe;
    };
  }, []);

  return (
    <NavigationContainer>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <Navigation />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
};

function HeadlessCheck({isHeadless}: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }
  return <App />;
}

export default HeadlessCheck;
