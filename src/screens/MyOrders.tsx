/*TODO:
*   1.Copy screen from template(DONE)
*   2.Modify according to typescript(DONE)
*   3.Add/remove features to complete the screen(DONE)
*   5.Create Skeleton(DONE)
*   6.Orders -Virtualized list or items showing orders(DONE)
*Next:Move to wishlistScreen
\* */

import React, {FunctionComponent, useEffect, useState, createRef, useRef} from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    FlatList,
    Alert,
    ActivityIndicator, TouchableWithoutFeedback, Image,
} from "react-native";

const {width, height} = Dimensions.get('window');
const cardWidth = width - (theme.SIZES.BASE * 2);
// @ts-ignore
import {Button, Block, NavBar, Text, theme} from 'galio-framework';

import {WooCommerce} from "../constants/config";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Product from "../common/Product";
import materialTheme from "../constants/Theme";
import CartService from '../Services/CartService';
import Theme from "../constants/Theme";
import Select from "../common/Select";
import requests from "../Services/requests";
import LoginRequest from "../common/LoginRequest";

const service = new CartService();
const request = new requests();

type Props = {
    navigation?: any,
    route?: any,
    data?: any,
    isLoading?: boolean,
    error?: string,
    currentPage?: string,
    sortValue?: any,
    scrollPosition?: number,
    customer?: any
};


type OrderProps = {
    order: any,
    navigation: any
};

const Order: FunctionComponent<OrderProps> =
    ({
         order,
         navigation
     }) => {
        const orderDate = order.date_completed ? order.date_completed : order.date_created;
        const orderName = order && order.line_items && `${order.line_items[0].name} + ${order.line_items.length - 1}`
        const orderUrl = ['https://img.icons8.com/bubbles/2x/purchase-order.png', 'https://img.icons8.com/clouds/2x/purchase-order.png', 'https://img.icons8.com/cute-clipart/2x/purchase-order.png', 'https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Report-512.png']
        const randomUrl: any = Math.floor(Math.random() * (orderUrl.length - 1) + 1)

        return <Block row={true} card style={[orderStyles.order, orderStyles.shadow]}>
            <TouchableWithoutFeedback onPress={() => navigation.push('OrderDetails', {id: order.id})}>
                <Block flex style={[orderStyles.imageContainer, orderStyles.shadow]}>
                    <Image source={{uri: orderUrl[randomUrl]}} style={orderStyles.image}/>
                </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetails', {id: order.id})}>
                <Block flex style={orderStyles.orderDescription}>
                    <Text size={13} style={orderStyles.orderTitle}>{orderName}</Text>
                    <Text size={12} muted={true}>₹ {order.total}</Text>
                    <Text size={12} color={materialTheme.COLORS.GRADIENT_END}>{order.status}</Text>
                </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetails', {id: order.id})}>
                <Text size={11} style={[orderStyles.orderTitle, {
                    alignSelf: 'flex-end',
                    marginHorizontal: theme.SIZES.BASE / 2
                }]}>{new Date(orderDate).toDateString()}</Text>
            </TouchableWithoutFeedback>
        </Block>
    };

const orderStyles = StyleSheet.create({
    order: {
        backgroundColor: theme.COLORS.WHITE,
        // marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 110,
        paddingVertical: theme.SIZES.BASE / 1.2,
    },
    orderTitle: {
        flex: 1,
        flexWrap: 'wrap',
        maxHeight: 30,
        marginBottom: theme.SIZES.BASE / 1.5,
        width: width / 2,
    },
    orderDescription: {
        padding: theme.SIZES.BASE / 2,
        flex: 2
    },
    imageContainer: {
        elevation: 1,
        flex: 1
    },
    image: {
        borderRadius: 3,
        marginHorizontal: theme.SIZES.BASE / 2,
        height: 55,
        resizeMode: 'contain',
        marginTop: theme.SIZES.BASE
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});


const MyOrders: FunctionComponent<Props> = ({customer = null, navigation, route, data = [1, 2, 3, 4], isLoading = false, error, currentPage = '1'}) => {
    const [list, setList] = useState(data);
    const [load, setLoad] = useState(isLoading);
    const [page, setPage] = useState(currentPage);
    const [user, setUser] = useState(customer);

    const handleOrders = async () => {
        setLoad(true);
        //check if user
        const loggedIn = await request.isLoggedIn();
        if (!loggedIn) return
        //get user
        try {
            const x = await request.getUserData();
            if (x.status === 200) {
                const x2 = await WooCommerce.get('customers/' + x.data.user.id)
                setUser(x2);
                const orders = await WooCommerce.get('orders', {
                    customer: x2.id,
                    orderby: 'date',
                    order: 'desc',
                    per_page: 10,
                    page: page
                });
                setLoad(false);
                if (parseInt(page) > 1) {
                    return setList([...list, ...orders])
                }
                setList(orders);
            }
        } catch (e) {
            Alert.alert('Error', 'Network Error')
        }
        setLoad(false);

    }

    useEffect(() => {
        handleOrders()
    }, [page])

    const renderOrder = ({item}: any) => {
        return (
            <Block flex center key={'product-' + item.id} style={{marginBottom: theme.SIZES.BASE}}>
                <SkeletonContent
                    duration={1000}
                    animationDirection="horizontalLeft"
                    containerStyle={{
                        flex: 1,
                        width: width - 15,
                        backgroundColor: materialTheme.COLORS.WHITE,
                        padding: 15,
                        borderRadius: 4,
                    }}
                    isLoading={load}
                    layout={[
                        {
                            flexDirection: 'row',
                            // marginRight: 10,
                            children: [
                                {key: 'imageID', width: '20%', height: 40, marginBottom: theme.SIZES.BASE},
                                {
                                    key: 'textId1',
                                    width: '50%',
                                    height: 20,
                                    marginLeft: theme.SIZES.BASE,
                                    alignSelf: 'center',
                                    marginBottom: theme.SIZES.BASE
                                },
                            ]
                        },
                        {key: 'buttonID', width: '90%', height: 27}

                    ]}
                >
                    <Order navigation={navigation} order={item}/>
                </SkeletonContent>
            </Block>
        )
    };

    return <Block>
        <Block style={{marginTop: theme.SIZES.BASE}}>
        </Block>
        {user ? <Block>
            <FlatList
                style={{marginBottom: theme.SIZES.BASE}}
                data={list}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                renderItem={({item}) => renderOrder({item})}
                ListEmptyComponent={<Text
                    style={{marginHorizontal: theme.SIZES.BASE, marginVertical: theme.SIZES.BASE, alignSelf: 'center'}}
                    size={theme.SIZES.BASE}>No Orders</Text>}
                ListFooterComponent={<Block flex style={{
                    flex: 1,
                    width: width,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: 'center',
                    marginBottom: theme.SIZES.BASE,
                    paddingVertical: theme.SIZES.BASE,
                    paddingHorizontal: theme.SIZES.BASE
                }}>
                    <TouchableHighlight
                        disabled={load}
                        underlayColor={materialTheme.COLORS.MUTED}
                        style={styles.showMore}
                        onPress={() => {
                            const p = parseInt(page) + 1;
                            setPage(JSON.stringify(p));
                        }}
                    >

                        {!load
                            ? <Text size={16} muted bold>Show more</Text>
                            : <ActivityIndicator
                                color={materialTheme.COLORS.MUTED}
                                size={18}
                            />}
                    </TouchableHighlight>
                </Block>}
            />
        </Block> : <LoginRequest navigation={navigation}/>}
    </Block>
};

export default MyOrders;

const styles = StyleSheet.create({
    showMore: {
        flex: 1,
        height: 35,
        width: '30%',
        textAlign: "center",
        alignItems: "center",
        justifyContent: 'center',
        borderColor: materialTheme.COLORS.MUTED,
        borderWidth: 1,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 1,
        borderRadius: 4
    },
    image: {
        width: cardWidth,
        height: cardWidth,
        borderRadius: 3,
    },
    imageVertical: {
        overflow: 'hidden',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    },
    price: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE / 2,
    },
    description: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE * 2,
    },
    suggestion: {
        backgroundColor: theme.COLORS.WHITE,
        marginBottom: theme.SIZES.BASE,
        borderWidth: 0,
        marginLeft: theme.SIZES.BASE / 2,
        marginRight: theme.SIZES.BASE / 2,
    },
    suggestionTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 6,
    },
    suggestionDescription: {
        padding: theme.SIZES.BASE / 2,
    },
    optionsButtonText: {
        fontFamily: 'open-sans-bold',
        fontSize: theme.SIZES.BASE * 0.75,
        color: theme.COLORS.WHITE,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.29
    },
    optionsButton: {
        width: "auto",
        height: 34,
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: 5,
        borderRadius: 3,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 1
    },
});
