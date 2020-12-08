/* TODO:
    1. Create Registration Screen
    2. Adjust Design
    3. Connect with api
    4. Navigate to Login screen if success else throw error
* */

import React, {FunctionComponent, useState} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Image,
    ActivityIndicator,
    Keyboard,
    Alert
} from "react-native";
import requests from "../Services/requests";
import {HeaderHeight, height, width} from "../constants/utils";
import materialTheme from '../constants/Theme';
// @ts-ignore
import {Block, Button, Input, Text, theme} from 'galio-framework';
import {logoURL} from "../constants/config";

const service = new requests();

type Props = {
    navigation?: any,
    loading?: boolean,
    err?: string,
    email?: string,
    status?: boolean,
    buttonText?: string
};

const ResetPassword: FunctionComponent<Props> =
    ({
         navigation,
         err = '',
         email = '',
         loading = false,
         status = false,
         buttonText = 'Send reset link'
     }) => {
        const [active, setActive] = useState(status);
        const [error, setError] = useState(err);
        const [load, setLoad] = useState(loading);
        const [mail, setMail] = useState(email);
        const [btext, setBtext] = useState(buttonText);
        const handleRegister = async () => {
            setError('')
            Keyboard.dismiss()

            if (mail.length < 4) {
                return setError('Email is invalid')
            }
            setLoad(true);

            const response = await service.resetPassword(mail);
            console.log('regis', response);
            setLoad(false);
            if (response.status === 200 && response.data.status === 'ok') {
                Alert.alert('Success', response.data.msg)
                setBtext('Resend email')
            } else {
                return setError(response.data !== undefined ? response.data.error : response.message);
            }
        }

        return <Block flex middle style={styles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>
                <Block flex>
                    <Block>
                        <Input
                            borderless
                            color="white"
                            placeholder="Email"
                            type="email-address"
                            autoCapitalize="none"
                            bgColor='transparent'
                            onBlur={() => setActive(!active)}
                            onFocus={() => setActive(!active)}
                            placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                            onChangeText={(text: any) => setMail(text)}
                            style={[styles.input, active ? styles.inputActive : null]}
                        />
                        {error.length > 0 ?
                            <Text
                                color={materialTheme.COLORS.ERROR}
                                size={theme.SIZES.FONT * 0.75}
                                style={{lineHeight: theme.SIZES.FONT * 2}}
                            >{error}
                            </Text> : null}
                    </Block>
                    <Block flex top style={{marginTop: 20}}>
                        <Button
                            disabled={load}
                            color={materialTheme.COLORS.BUTTON_COLOR}
                            style={{height: 48}}
                            onPress={() => handleRegister()}
                        >
                            {!load
                                ? btext
                                : <ActivityIndicator
                                    color={'#ffffff'}
                                    size={18}
                                />}
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        </Block>;
    };

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: materialTheme.COLORS.DEFAULT
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
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    input: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    },
    inputActive: {
        borderBottomColor: "white",
    },
    logo: {
        width: width - theme.SIZES.BASE * 3,
        minHeight: 110,
        resizeMode: 'contain'
    },
    imageContainer: {
        // backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: height % 10,
        backgroundColor: materialTheme.COLORS.BLOCK,
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: theme.SIZES.BASE * 3,
        marginBottom: theme.SIZES.BASE * 3
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});