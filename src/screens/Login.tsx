/*TODO:
 *  1. Add Login screen from template - (DONE)
 *  2. Modify accordingly - (DONE)
 *  3. connect with api - (DONE)
 *  4. Save access Cookie - (DONE)
 *  5. navigate to any relevant screen required - (DONE)
 *  6. Connect with register screen and forgot Modal - (DONE)
 *  7. Attach Loader - (Done)
 *  8. Show Error Alert - (DONE)
 * */

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
// @ts-ignore
import {Block, Button, Input, Text, theme} from 'galio-framework';
import {HeaderHeight, height, width} from '../constants/utils';
import React, {FunctionComponent, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import NotificationService from '../Services/notification';
import {logoURL} from '../constants/config';
import materialTheme from '../constants/Theme';
import requests from '../Services/requests';

const notification = new NotificationService();
const service = new requests();
type Props = {
  navigation?: any;
  status?: {
    email: boolean;
    password: boolean;
  };
  email?: string;
  passwor?: string;
  error?: string;
  loading?: boolean;
};

const Login: FunctionComponent<Props> = ({
  navigation,
  status = {
    email: false,
    password: false,
  },
  email = '',
  passwor = '',
  error = '',
  loading = false,
}) => {
  const [active, setActive] = useState(status);
  const [mail, setMail] = useState(email);
  const [password, setPassword] = useState(passwor);
  const [err, setErr] = useState(error);
  const [load, setLoad] = useState(loading);

  const handleLogin = async () => {
    setErr('');
    Keyboard.dismiss();
    if (mail.length < 4) {
      return setErr('Email/Username is invalid');
    }
    if (password.length < 3) {
      return setErr('Passowrd is invalid');
    }
    setLoad(true);
    const response = await service.loginUser(mail, password);
    setLoad(false);
    if (response.data.status === 'ok') {
      //* Notification

      // const notification_response = await notification.sendNotification(
      //   'Welcome',
      //   'Hello ' + mail + ', Enjoy shopping',
      //   {},
      // );

      //*cookie stored in asyncstorage
      await AsyncStorage.setItem('cookie', response.data.cookie);
      return navigation.reset({
        index: 0,
        routes: [{name: 'App'}],
      });
    } else {
      return setErr(response.data.error);
    }
  };

  const toggleActive = (value: string) => {
    let act: {email: boolean; password: boolean} = active;
    // @ts-ignore
    act[value] = !act[value];
    return setActive(act);
  };

  return (
    <Block flex middle style={styles.container}>
      <KeyboardAvoidingView behavior="height" enabled>
        <Block flex={0.2} style={[styles.imageContainer, styles.shadow]}>
          <Image source={{uri: logoURL}} style={styles.logo} />
        </Block>
        <Block flex>
          <Block center>
            <Input
              borderless
              color="white"
              placeholder="Email"
              type="email-address"
              autoCapitalize="none"
              bgColor="transparent"
              onBlur={() => toggleActive('email')}
              onFocus={() => toggleActive('email')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={(text: any) => setMail(text)}
              style={[styles.input, active.email ? styles.inputActive : null]}
            />
            <Input
              password
              viewPass
              borderless
              color="white"
              iconColor="white"
              placeholder="Password"
              bgColor="transparent"
              onBlur={() => toggleActive('password')}
              onFocus={() => toggleActive('password')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={(text: any) => setPassword(text)}
              style={[
                styles.input,
                active.password ? styles.inputActive : null,
              ]}
            />
            {err.length > 0 ? (
              <Text
                color={materialTheme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                style={{lineHeight: theme.SIZES.FONT * 2}}>
                {err}
              </Text>
            ) : null}

            <Button color="transparent" shadowless>
              <Text
                disabled={load}
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => navigation.navigate('Reset')}
                style={{
                  alignSelf: 'flex-end',
                  lineHeight: theme.SIZES.FONT * 2,
                }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
          <Block flex top style={{marginTop: 20}}>
            <Button
              disabled={load}
              color={materialTheme.COLORS.BUTTON_COLOR}
              style={{height: 48}}
              onPress={() => handleLogin()}>
              {!load ? (
                'SIGN IN'
              ) : (
                <ActivityIndicator color={'#ffffff'} size={18} />
              )}
            </Button>
            <Button
              disabled={load}
              color="transparent"
              shadowless
              onPress={() => navigation.navigate('Register')}>
              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{marginTop: 20}}>
                {"Don't have an account? Sign Up"}
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: materialTheme.COLORS.DEFAULT,
  },
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: 'white',
  },
  logo: {
    width: width - theme.SIZES.BASE * 3,
    minHeight: 110,
    resizeMode: 'contain',
  },
  imageContainer: {
    // backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: height % 10,
    backgroundColor: materialTheme.COLORS.BLOCK,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: theme.SIZES.BASE * 3,
    marginBottom: theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
