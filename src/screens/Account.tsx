/*
  1.Create Account Screen:
     - User Info Section : ( Check if Logged In render accordingly)
        - Logo/Image/Loader
        - Name/Loader
        - Wallet Balance/loader
         /////////////////
        - Login / SignUp
     - Primary List: ( Logo and title Necessary for each list Item)
        - MyOrders
        - MyAddresses
        - Wallet
        - Wishlist
     - Secondary List: ( Logo and title Necessary for each list Item)
        - About Us
        - Contact
        - TandC
        - Policy
        - Sign Out (Null if logged in)
  2.Connect to login screen
  3.Next steps in Login screen
* */


import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback, Image, Alert} from "react-native";

// @ts-ignore
import {Block, Text, theme, Button} from "galio-framework";
import materialTheme from '../constants/Theme';
import DrawerCustomItem from '../common/Drawer';
import requests from "../Services/requests";
import {height, width} from "../constants/utils";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

const service = new requests()

type Props = {
    navigation?: any,
    isUser?: boolean,
    loading?: boolean,
    userData?: {
        name: string,
        email: string,
        avatar: string,
    }
};

const Account: FunctionComponent<Props> =
    ({
         navigation,
         isUser = false,
         loading = false,
         userData = {
             name: '',
             email: '',
             avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTphvbDwEv5H6ApfLePNXbasvb3NKwd4cmTOQ&usqp=CAU'
         }
     }) => {
        const [loggedIn, setLoggedIn] = useState(isUser);
        const [load, setLoad] = useState(loading);
        const [profile, setProfile] = useState(userData);

        const getUser = async () => {
            setLoad(true)
            const cookie = await service.isLoggedIn();
            if (cookie !== null) {
                const data = await service.getUserData();

                if (data.data.status === 'ok') {
                    setProfile({
                        name:data.data.user.displayname,
                        email:data.data.user.email,
                        avatar:profile.avatar
                    })
                } else {
                    Alert.alert(data.data.error)
                }
                setLoggedIn(!loggedIn)
            }
            setLoad(false)
        }

        useEffect(() => {
            getUser()
        }, [])

        useEffect(() => {
            console.log('mounted');
            return () => {
                console.log('Do some cleanup');
            }
        }, [])

        const primary = [
            "MyOrders",
            "Addresses",
            "Wishlist",
        ];
        const Secondary = [
            'About Us',
            'Contact',
            'Terms and Conditions',
            'Policy',
            'FAQ',
            'Sign Out'
        ]

        return <Block
            style={styles.container}
            forceInset={{top: "always", horizontal: "never"}}
        >
            <Block flex={0.23} style={styles.header}>
                <Block style={styles.profile}>
                    <Image source={{uri: profile.avatar}} style={styles.avatar}/>
                </Block>
                <SkeletonContent
                    duration={1200}
                    animationDirection="horizontalLeft"
                    containerStyle={{width: width / 2}}
                    isLoading={load}
                    layout={[
                        {key: 'imageID', width: '60%', height: 19, marginBottom: theme.SIZES.BASE / 1.5},
                        {key: 'textID', width: '60%', height: 19, marginBottom: theme.SIZES.BASE / 1},
                    ]}
                >
                    {loggedIn ?
                        <Block style={[styles.pro]}>
                            <Text size={18} bold color={"white"} style={{marginBottom: 3}}>
                                {profile.name}
                            </Text>
                            <Text size={14} bold color={"#6699cc"}>
                                {profile.email}
                            </Text>
                        </Block>
                        :
                        <Block style={[styles.pro]}>
                            <Block>
                                <Text size={16} bold color={"white"}>
                                    Welcome User
                                </Text>
                            </Block>
                            <Block style={{
                                flexDirection: 'row',
                                justifyContent: "flex-start",
                                alignItems: 'center'
                            }}>
                                <TouchableWithoutFeedback
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Auth')}>
                                    <Text size={16} bold color={"#6699cc"}>
                                        Sign In
                                    </Text>
                                </TouchableWithoutFeedback>
                                <Text size={20} bold color={"#6699cc"}> / </Text>
                                <TouchableWithoutFeedback
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Auth')}>
                                    <Text size={16} bold color={"#6699cc"}>
                                        Register
                                    </Text>
                                </TouchableWithoutFeedback>
                            </Block>
                        </Block>
                    }
                </SkeletonContent>
            </Block>
            <Block flex style={{paddingLeft: 7, paddingRight: 14}}>
                <ScrollView
                    contentContainerStyle={[
                        {
                            paddingTop: theme.SIZES.BASE / 2,
                        }
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {primary.map((item, index) => {
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                            />
                        );
                    })}
                    {Secondary.map((item, index) => {
                        if (item === Secondary[Secondary.length - 1]) {
                            if (loggedIn) {
                                return <DrawerCustomItem
                                    title={item}
                                    key={index}
                                    navigation={navigation}
                                />
                            }
                            return null
                        }
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                            />
                        );
                    })}

                </ScrollView>
            </Block>
        </Block>
    };

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: materialTheme.COLORS.DEFAULT,
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 2,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    footer: {
        paddingHorizontal: 28,
        justifyContent: "flex-end"
    },
    profile: {
        marginBottom: theme.SIZES.BASE / 2
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE,
        backgroundColor: materialTheme.COLORS.BLOCK
    },
    pro: {
        // backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 6,
        marginRight: 8,
        borderRadius: 4,
    },
    seller: {
        marginRight: 16
    },
    button: {}
});
