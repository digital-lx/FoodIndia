/* TODO:
    1. Create Registration Screen
    2. Adjust Design
    3. Connect with api
    4. Navigate to Login screen if success else throw error
* */

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
// @ts-ignore
import {Block, Button, Input, Text, theme} from 'galio-framework';
import {HeaderHeight, height, width} from '../constants/utils';
import React, {FunctionComponent, useState} from 'react';

import {logoURL} from '../constants/config';
import materialTheme from '../constants/Theme';
import requests from '../Services/requests';

const service = new requests();

type Props = {
  navigation?: any;
  loading?: boolean;
  err?: string;
  email?: string;
  pass?: string;
  passAgain?: string;
  user?: string;
  status?: {
    email: boolean;
    password: boolean;
    username: boolean;
    passwordAgain: boolean;
  };
};

const Register: FunctionComponent<Props> = ({
  navigation,
  err = '',
  email = '',
  loading = false,
  status = {
    email: false,
    password: false,
    username: false,
    passwordAgain: false,
  },
  pass = '',
  user = '',
  passAgain,
}) => {
  const [active, setActive] = useState(status);
  const [error, setError] = useState(err);
  const [load, setLoad] = useState(loading);
  const [mail, setMail] = useState(email);
  const [password, setPassword] = useState(pass);
  const [passwordAgain, setPasswordAgain] = useState(pass);
  const [username, setUsername] = useState(user);

  const handleRegister = async () => {
    setError('');
    Keyboard.dismiss();

    if (mail.length < 4) {
      return setError('Email is invalid');
    }
    if (username.length < 4) {
      return setError('username is invalid');
    }
    if (password.length < 4) {
      return setError('password is invalid');
    }
    if (password !== passwordAgain) {
      return setError('Password does not match');
    }
    setLoad(true);

    const response = await service.register(mail, username, password);
    console.log('response_register', response);
    setLoad(false);
    if (response.status === 201) {
      Alert.alert('User Registered, Please Login');
      return navigation.goBack();
    } else {
      if (response.message === 'Request failed with status code 500') {
        return setError('User exists with same Username or email.');
      }
      return setError(
        response.data !== undefined ? response.data.error : response.message,
      );
    }
  };
  const toggleActive = (value: string) => {
    let act: {
      email: boolean;
      password: boolean;
      username: boolean;
      passwordAgain: boolean;
    } = active;
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
              style={[
                styles.input,
                active.email === true ? styles.inputActive : null,
              ]}
            />
            <Input
              borderless
              color="white"
              placeholder="Username"
              type="default"
              autoCapitalize="none"
              bgColor="transparent"
              onBlur={() => toggleActive('username')}
              onFocus={() => toggleActive('username')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={(text: any) => setUsername(text)}
              style={[
                styles.input,
                active.username === true ? styles.inputActive : null,
              ]}
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
                active.password === true ? styles.inputActive : null,
              ]}
            />
            <Input
              password
              viewPass
              borderless
              color="white"
              iconColor="white"
              placeholder="Password Again"
              bgColor="transparent"
              onBlur={() => toggleActive('passwordAgain')}
              onFocus={() => toggleActive('passwordAgain')}
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={(text: any) => {
                setPasswordAgain(text);
              }}
              style={[
                styles.input,
                active.passwordAgain === true ? styles.inputActive : null,
              ]}
            />
            {error.length > 0 ? (
              <Text
                color={materialTheme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                style={{lineHeight: theme.SIZES.FONT * 2}}>
                {error}
              </Text>
            ) : null}
          </Block>
          <Block flex top style={{marginTop: 20}}>
            <Button
              disabled={load}
              color={materialTheme.COLORS.BUTTON_COLOR}
              style={{height: 48}}
              onPress={() => handleRegister()}>
              {!load ? (
                'Register'
              ) : (
                <ActivityIndicator color={'#ffffff'} size={18} />
              )}
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default Register;

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
