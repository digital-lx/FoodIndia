/*TODO:
*   1.Copy screen from template(DONE)
*   2.Modify according to typescript(DONE)
*   3.Add/remove features to complete the screen(DONE)
*   5.Create Skeleton(DONE)
*   6.Create Address
*     - Input - first_name, last_name, company, address_1, address_2, city, state, postcode, country,(DONE)
*     - Button - Create address(DONE)
*   7.getUser Addresses(DONE)
*     - if not logged in show button and text that - please login (DONE)
*     - if logged in get addresses and render list(DONE)
*     - if no addresses then render text - no address(DONE)
* */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView, ScrollView,
    StyleSheet, TouchableOpacity,
    View
} from "react-native";
// @ts-ignore
import {Button, Block, Text, theme, Input} from 'galio-framework';
import {WooCommerce} from "../constants/config";
import CartService from "../Services/CartService";
import materialTheme from '../constants/Theme';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import requests from "../Services/requests";
import {HeaderHeight, height, width} from "../constants/utils";
import LoginRequest from "../common/LoginRequest";

const request = new requests();
type Props = {
    navigation?: any,
    route?: any,
    isloading?: boolean,
    user?: any,
    error?: string,
    status?: {
        first: boolean,
        last: boolean,
        add1: boolean,
        add2: boolean,
        cit: boolean,
        sta: boolean,
        code: boolean,
    },
    first_name?: string,
    last_name?: string,
    address_1?: string,
    address_2?: string,
    city?: string,
    state?: string,
    postcode?: string,
    create?: boolean
};

const Addresses: FunctionComponent<Props> =
    ({
         status = {
             first: false,
             last: false,
             add1: false,
             add2: false,
             cit: false,
             sta: false,
             code: false,
         },
         navigation,
         route,
         isloading = false,
         user = null,
         error = '',
         first_name = '',
         last_name = '',
         address_1 = '',
         address_2 = '',
         city = '',
         state = '',
         postcode = '',
         create = false
     }) => {
        const [load, setLoad] = useState(isloading);
        const [data, setData] = useState(user);
        const [err, setErr] = useState(error);
        const [first, setFirst] = useState(first_name);
        const [last, setLast] = useState(last_name);
        const [add1, setAdd1] = useState(address_1);
        const [add2, setAdd2] = useState(address_2);
        const [cit, setCit] = useState(city);
        const [sta, setSta] = useState(state);
        const [code, setCode] = useState(postcode);
        const [active, setActive] = useState(status);
        const [mode, setMode] = useState(create);

        const getAddresses = async () => {
            setLoad(true)
            try {
                const isLoggedin = await request.isLoggedIn();
                if (isLoggedin) {
                    const user = await request.getUserData();
                    if (user.status === 200) {
                        const address = await WooCommerce.get('customers/' + user.data.user.id)
                        console.log('user', address);
                        setData(address);
                    }
                    setMode(false);
                }
            } catch (e) {
                console.log('error', e);
                Alert.alert('Error', 'No Internet Connectivity');

            }
            return setLoad(false)
        }
        const handleChange = async () => {
            //add address to user
            if (first.length < 2) return setErr('Invalid first name');
            if (last.length < 2) return setErr('Invalid last name');
            if (add1.length < 2) return setErr('Invalid address 1');
            if (add2.length < 2) return setErr('Invalid address 2');
            if (cit.length < 2) return setErr('Invalid city');
            if (sta.length === 0) return setErr('Invalid state');
            if (code.length < 6) return setErr('Invalid postal code');
            //update user doc with shipping address
            try {
               const updateData = {
                    shipping: {
                        first_name: first,
                        last_name: last,
                        address_1: add1,
                        address_2: add2,
                        city: cit,
                        state: sta,
                        postcode: code,
                        country: 'INDIA'
                    }
                };
                setLoad(true);
                const result = await WooCommerce.put('customers/' + data.id, updateData);
                console.log('user_update', result);
                setData(result);
            } catch (e) {
                console.log('error', e);
                Alert.alert('Error', 'No Internet Connectivity');
            }
            setMode(false)
            setLoad(false)

        }
        const toggleActive = (value: string) => {
            let act: any = active;
            // @ts-ignore
            act[value] = !act[value];
            return setActive(act)
        }
        const renderCreate = () => {
            return <ScrollView contentContainerStyle={{height: height / 1.2, alignItems: 'center'}}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <Text size={18} bold color={materialTheme.COLORS.FACEBOOK} style={{
                        alignSelf: 'flex-start',
                        marginBottom: theme.SIZES.BASE,
                        marginHorizontal: theme.SIZES.BASE
                    }}>Add New Address</Text>
                    <Input
                        borderless
                        color='Black'
                        placeholder="First Name"
                        type="default"
                        autoCapitalize="none"
                        bgColor='transparent'
                        onBlur={() => toggleActive('first')}
                        onFocus={() => toggleActive('first')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setFirst(text)}
                        style={[styles.input, active.first ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="Last Name"
                        bgColor='transparent'
                        onBlur={() => toggleActive('last')}
                        onFocus={() => toggleActive('last')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setLast(text)}
                        style={[styles.input, active.last ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="Address 1"
                        bgColor='transparent'
                        onBlur={() => toggleActive('add1')}
                        onFocus={() => toggleActive('add1')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setAdd1(text)}
                        style={[styles.input, active.add1 ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="Address 2"
                        bgColor='transparent'
                        onBlur={() => toggleActive('add2')}
                        onFocus={() => toggleActive('add2')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setAdd2(text)}
                        style={[styles.input, active.add2 ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="City"
                        bgColor='transparent'
                        onBlur={() => toggleActive('cit')}
                        onFocus={() => toggleActive('cit')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setCit(text)}
                        style={[styles.input, active.cit ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="State"
                        bgColor='transparent'
                        onBlur={() => toggleActive('sta')}
                        onFocus={() => toggleActive('sta')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setSta(text)}
                        style={[styles.input, active.sta ? styles.inputActive : null]}
                    />
                    <Input
                        borderless
                        color='Black'
                        iconColor="white"
                        placeholder="Post Code"
                        bgColor='transparent'
                        onBlur={() => toggleActive('code')}
                        onFocus={() => toggleActive('code')}
                        placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                        onChangeText={(text: any) => setCode(text)}
                        style={[styles.input, active.code ? styles.inputActive : null]}
                    />
                    {err.length > 0 ?
                        <Text
                            color={materialTheme.COLORS.ERROR}
                            size={theme.SIZES.FONT * 0.9}
                            style={{lineHeight: theme.SIZES.FONT * 2}}
                        >{err}
                        </Text> : null}
                    <Button
                        disabled={load}
                        color={materialTheme.COLORS.BUTTON_COLOR}
                        style={{height: 45, marginVertical: theme.SIZES.BASE / 2}}
                        onPress={() => handleChange()}
                    >
                        {!load
                            ? 'Add Address'
                            : <ActivityIndicator
                                color={'#ffffff'}
                                size={18}
                            />}
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        }
        const renderItem = ({item}: any) => {
            //TODO:Create Item layout - option to delete address
            return <Block style={styles.item} space={'between'} row>
                <Text style={{padding: theme.SIZES.BASE / 1.5}}>{item.address_1} {item.address_2}</Text>
                <TouchableOpacity style={styles.delete} onPress={() => setMode(true)}>
                    <Text size={16} color={materialTheme.COLORS.WHITE} bold>Change</Text>
                </TouchableOpacity>
            </Block>;
        };
        const renderList = () => {
            return <SafeAreaView style={{flex: 1}}>
                <FlatList
                    contentContainerStyle={{alignItems: 'center'}}
                    data={data.shipping ? [data.shipping] : []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.first_name}
                    ListEmptyComponent={<Block>
                        <Text size={15} bold>No Addresses Found </Text>
                    </Block>}
                    ListFooterComponent={data.shipping ? null : <Button color="transparent" shadowless style={styles.addNew}>
                        <Text
                            disabled={load}
                            color={theme.COLORS.FACEBOOK}
                            size={theme.SIZES.FONT}
                            onPress={() => setMode(true)}
                            style={{
                                alignSelf: 'center',
                                lineHeight: theme.SIZES.FONT * 2,
                                textDecorationLine: 'underline'
                            }}
                        >
                            Add
                        </Text>
                    </Button>}
                />
            </SafeAreaView>
        }

        useEffect(() => {
            getAddresses()
        }, [])

        return <Block flex center style={{width: width}}>
            <SkeletonContent
                duration={1000}
                animationDirection="horizontalLeft"
                containerStyle={{
                    flex: 1,
                    width: width,
                    paddingTop: theme.SIZES.BASE,
                    backgroundColor: theme.COLORS.WHITE,
                }}
                isLoading={load}
                layout={[
                    {
                        key: 'nameID',
                        width: '90%',
                        height: 30,
                        marginBottom: theme.SIZES.BASE / 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID1',
                        width: '60%',
                        height: 23,
                        marginBottom: theme.SIZES.BASE * 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID2',
                        width: '90%',
                        height: 27,
                        marginBottom: theme.SIZES.BASE / 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID3',
                        width: '60%',
                        alignSelf:'flex-end',
                        height: 24,
                        marginBottom: theme.SIZES.BASE * 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID4',
                        width: '90%',
                        height: 28,
                        marginBottom: theme.SIZES.BASE / 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID5',
                        width: '60%',
                        height: 22,
                        marginBottom: theme.SIZES.BASE * 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID6',
                        width: '90%',
                        height: 25,
                        marginBottom: theme.SIZES.BASE / 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'textID7',
                        width: '60%',
                        height: 27,
                        alignSelf:'flex-end',
                        marginBottom: theme.SIZES.BASE * 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    },
                    {
                        key: 'button1',
                        width: '60%',
                        height: 42,
                        alignSelf: 'center',
                        marginBottom: theme.SIZES.BASE / 1.5,
                        marginHorizontal: theme.SIZES.BASE,
                    }

                ]}
            >
                {data ? (mode ? renderCreate() : renderList()) : <LoginRequest navigation={navigation}/>}
            </SkeletonContent>
        </Block>;
    };

export default Addresses;

const styles = StyleSheet.create({
    delete: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: '99%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderLeftWidth: 2,
        borderLeftColor: materialTheme.COLORS.MUTED
    },
    item: {
        height: theme.SIZES.BASE * 3,
        width: width - 15,
        borderWidth: 1,
        marginVertical: theme.SIZES.BASE / 3,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: theme.SIZES.BASE / 4,
        shadowOpacity: 0.1,
        backgroundColor: materialTheme.COLORS.WHITE
    },
    addNew: {
        borderTopWidth: 1,
        borderTopColor: theme.COLORS.FACEBOOK,
        marginVertical: theme.SIZES.BASE,
        width: width / 3.2,
        height: 40
    },
    loginButton: {
        width: '25%',
        height: theme.SIZES.BASE * 2,
        fontSize: 12,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        shadowOpacity: 0.2,

    },
    signin: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    input: {
        width: width * 0.9,
        borderRadius: 5,
        borderWidth: .5,
        borderColor: materialTheme.COLORS.PLACEHOLDER,
    },
    inputActive: {
        borderBottomColor: materialTheme.COLORS.FACEBOOK,
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.1,
        elevation: 1,
    },
});