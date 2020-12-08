import React, { FunctionComponent } from 'react';
import materialTheme from "../constants/Theme";
// @ts-ignore
import {Button, Block, NavBar, Text, theme} from 'galio-framework';
import {StyleSheet} from "react-native";


type Props = {
    navigation:any
};

const LoginRequest: FunctionComponent<Props> = ({navigation}) => {

  return <Block style={{marginHorizontal: theme.SIZES.BASE}}>
      <Text style={{marginVertical: theme.SIZES.BASE / 2,}} size={15}>Please Sign in/Sign up first </Text>
      <Button
          style={styles.loginButton}
          color={materialTheme.COLORS.BUTTON_COLOR}
          transparent
          onPress={() => navigation.navigate('Auth')}>
          login
      </Button>
  </Block>;
};

export default LoginRequest;

const styles = StyleSheet.create({
    loginButton: {
        width: '25%',
        height: theme.SIZES.BASE * 2,
        fontSize: 12,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        shadowOpacity: 0.2,

    }

})

