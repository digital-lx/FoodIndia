/* TODO:
*   1.copy screen from template(DONE)
*   2.modify according to typescript(DONE)
*   3.add/remove features to complete the screen(DONE)
*   4.Items Virtualized list(DONE)
*   5.order Info - id, status(DONE)
*   6.payment details - payment method - billing address(DONE)
*   7.shipping details(DONE)
*   8.Fees and taxes - Text(DONE)
* */


import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Platform,
    TouchableOpacity,
} from 'react-native';

// @ts-ignore
import {Block, Text, Button, theme} from 'galio-framework';
import {iPhoneX, HeaderHeight} from "../constants/utils";

const {height, width} = Dimensions.get('window');
import {logoURL, WooCommerce} from "../constants/config";
import materialTheme from '../constants/Theme';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Select from "../common/Select";
import VirtualizedHorizontalList from "../common/VirtualizedHorizontalList";


type Props = {
    navigation?: any,
    route?: any,
    data?: any,
    isLoading?: boolean,
    error?: string,
};
import CartService from "../Services/CartService";

const OrderDetails: FunctionComponent<Props> = ({navigation, route, data = null, isLoading = false, error}) => {
    const [order, setOrder] = useState(data);
    const [load, setLoad] = useState(isLoading);
    const getData = async () => {
        setLoad(true);
        const order = await WooCommerce.get('orders/' + route.params.id);
        console.log('order-' + route.params.id, order);
        setLoad(false)
        setOrder(order);
    }
    const getRelated = async () => {
        const relatedList = await WooCommerce.get('products', {
            stock_status: 'instock',
            orderby: 'date',
            per_page: 6,
            page: 1
        });
        console.log('related', relatedList);
        return relatedList
    }
    useEffect(() => {
        getData()
    }, []);
    const renderItem = (item: any) => {
        const orderUrl = ['https://img.icons8.com/bubbles/2x/purchase-order.png', 'https://img.icons8.com/clouds/2x/purchase-order.png', 'https://img.icons8.com/cute-clipart/2x/purchase-order.png', 'https://cdn2.iconfinder.com/data/icons/fintech-butterscotch-vol-2/512/Report-512.png']
        const randomUrl: any = Math.floor(Math.random() * (orderUrl.length - 1) + 1)
        return <Block key={item.id} row={true} style={[styles.item]}>
            <TouchableWithoutFeedback onPress={() => navigation.push('PDetails', {PID: item.product_id})}>
                <Block flex style={[styles.imageContainer]}>
                    <Image source={{uri: 'https://img.icons8.com/bubbles/2x/product.png'}} style={styles.image}/>
                </Block>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('PDetails', {PID: item.product_id})}>
                <Block flex style={styles.itemDescription}>
                    <Text size={13} color={materialTheme.COLORS.TEXT} style={{width: '100%'}}>{item.name}</Text>
                    <Text size={13} color={materialTheme.COLORS.TEXT} style={{marginVertical: theme.SIZES.BASE / 4}}>Qunatity
                        x <Text size={13}
                                color={materialTheme.COLORS.TEXT} bold>{item.quantity}</Text></Text>
                    <Text size={13} color={materialTheme.COLORS.BUTTON_COLOR}
                          style={{alignSelf: 'flex-end'}}>₹ {item.total}</Text>
                </Block>
            </TouchableWithoutFeedback>
        </Block>
    }
    return <Block flex>
        <SkeletonContent
            duration={1000}
            animationDirection="horizontalLeft"
            containerStyle={{
                flex: 1,
                width: width,
                paddingTop: theme.SIZES.BASE,
                backgroundColor: theme.COLORS.WHITE
            }}
            isLoading={load}
            layout={[
                {
                    key: 'nameID',
                    width: '85%',
                    height: 55,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID1',
                    width: '75%',
                    height: 35,
                    alignSelf:"flex-end",
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID2',
                    width: '85%',
                    height: 55,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID3',
                    width: '75%',
                    alignSelf:"flex-end",
                    height: 35,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID4',
                    width: '85%',
                    height: 55,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID5',
                    width: '75%',
                    alignSelf:"flex-end",
                    height: 35,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID6',
                    width: '85%',
                    height: 55,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
                {
                    key: 'textID7',
                    width: '75%',
                    alignSelf:"flex-end",
                    height: 35,
                    marginBottom: theme.SIZES.BASE * 1.5,
                    marginHorizontal: theme.SIZES.BASE,
                },
            ]}
        >
            <Block flex>
                <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                    paddingBottom:theme.SIZES.BASE
                }}>
                    <Block>
                        <Text size={20} color={materialTheme.COLORS.BLACK}>Order Info</Text>
                        <Block style={styles.card} flex>
                            <Text size={17} color={materialTheme.COLORS.TEXT}>Order ID: <Text size={14}
                                                                                              color={materialTheme.COLORS.BUTTON_COLOR}>{order && order.id}</Text></Text>
                            <Text size={17} color={materialTheme.COLORS.TEXT}>Order Status: <Text size={14}
                                                                                                  color={materialTheme.COLORS.GRADIENT_END}>{order && order.status}</Text></Text>
                            <Text size={17} color={materialTheme.COLORS.TEXT}>Order Total: <Text size={14}
                                                                                                 color={materialTheme.COLORS.BUTTON_COLOR}>₹ {order && order.total} ({order && order.line_items.length} items)</Text></Text>
                        </Block>
                    </Block>
                    <Block style={{paddingVertical: theme.SIZES.BASE / 2}}>
                        <Text size={20} color={materialTheme.COLORS.BLACK}>Order Items</Text>
                        <Block style={styles.card} flex>
                            {order && order.line_items ? order.line_items.map((el: any, index: number) =>
                                    renderItem(el))
                                :
                                <Text>No Items</Text>}
                        </Block>
                    </Block>
                    <Block style={{paddingVertical: theme.SIZES.BASE / 2}}>
                        <Text size={20} color={materialTheme.COLORS.BLACK}>Payment</Text>
                        <Block style={styles.card} flex>
                            <Text size={17} color={materialTheme.COLORS.TEXT}
                                  style={{marginBottom: theme.SIZES.BASE / 2}}>Payment Method:</Text>
                            <Text size={14}
                                  color={materialTheme.COLORS.MUTED}>{order && order.payment_method_title}</Text>
                        </Block>
                        <Block style={styles.card} flex>
                            <Text size={17} color={materialTheme.COLORS.TEXT}
                                  style={{marginBottom: theme.SIZES.BASE / 2}}>Billing Address:</Text>
                            <Text size={14}
                                  color={materialTheme.COLORS.MUTED}>{order && order.billing.first_name + ' ' + order.billing.last_name + '\n' + order.billing.address_1 + '\n' + order.billing.address_2 + '\n' + order.billing.city +
                            '\n' + order.billing.state}</Text>
                        </Block>
                    </Block>
                    <Block style={{paddingVertical: theme.SIZES.BASE / 2}}>
                        <Text size={20} color={materialTheme.COLORS.BLACK}>Shipping: </Text>
                        <Block style={styles.card} flex>
                            <Text size={17} color={materialTheme.COLORS.TEXT}
                                  style={{marginBottom: theme.SIZES.BASE / 2}}>Shipping Address: </Text>
                            <Text size={14}
                                  color={materialTheme.COLORS.MUTED}>{order && order.shipping.first_name + ' ' + order.shipping.last_name + '\n' + order.shipping.address_1 + '\n' + order.shipping.address_2 + '\n' + order.shipping.city +
                            '\n' + order.shipping.state}</Text>
                        </Block>
                    </Block>
                    <Block style={{paddingVertical: theme.SIZES.BASE / 2}}>
                        <Text size={20} color={materialTheme.COLORS.BLACK}>Fees & Taxes: </Text>
                        <Block style={styles.card} flex>
                            <Block flex row space={'between'}>
                                <Text size={14} color={materialTheme.COLORS.TEXT}>Items Total: </Text>
                                <Text size={13}
                                      color={materialTheme.COLORS.BUTTON_COLOR}>₹ {order && (parseInt(order.total) - parseInt(order.total_tax))}</Text>
                            </Block>
                            <Block flex row space={'between'}>
                                <Text size={14} color={materialTheme.COLORS.TEXT}>Shipping Charges: </Text>
                                <Text size={13}
                                      color={materialTheme.COLORS.BUTTON_COLOR}>₹ {order && order.shipping_total}</Text>
                            </Block>
                            <Block flex row space={'between'}>
                                <Text size={14} color={materialTheme.COLORS.TEXT}>Discount Total: </Text>
                                <Text size={13}
                                      color={materialTheme.COLORS.BUTTON_COLOR}>₹ {order && order.discount_total}</Text>
                            </Block>
                            <Block flex row space={'between'} style={{
                                borderBottomWidth: 1,
                                borderBottomColor: materialTheme.COLORS.BLOCK,
                                paddingBottom: theme.SIZES.BASE / 3
                            }}>
                                <Text size={14} color={materialTheme.COLORS.TEXT}>Tax: </Text>
                                <Text size={13}
                                      color={materialTheme.COLORS.BUTTON_COLOR}>₹ {order && order.total_tax}</Text>
                            </Block>
                            <Block flex row space={'between'} style={{paddingTop: theme.SIZES.BASE / 3}}>
                                <Text size={15} color={materialTheme.COLORS.TEXT}>Total: </Text>
                                <Text size={14} color={materialTheme.COLORS.BUTTON_COLOR}
                                      bold>₹ {order && order.total}</Text>
                            </Block>
                        </Block>
                    </Block>
                    <VirtualizedHorizontalList
                        title={'Related products'}
                        getData={getRelated}
                        navigation={navigation}/>
                </ScrollView>
            </Block>
        </SkeletonContent>
    </Block>;
};

export default OrderDetails;

const styles = StyleSheet.create({
    item: {
        backgroundColor: theme.COLORS.WHITE,
        // marginVertical: theme.SIZES.BASE,
        borderBottomWidth: .7,
        borderColor: '#ccc',
        paddingVertical: theme.SIZES.BASE / 1.2,
    },
    itemTile: {
        flex: 1,
        flexWrap: 'wrap',
        maxHeight: 30,
        width: width / 2.5,
    },
    itemDescription: {
        paddingHorizontal: theme.SIZES.BASE / 2,
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
        // marginTop: theme.SIZES.BASE
    },
    card: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.1,
        elevation: 1,
        backgroundColor: theme.COLORS.WHITE,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: theme.SIZES.BASE / 1.5,
        paddingHorizontal: theme.SIZES.BASE / 2,
        paddingVertical: theme.SIZES.BASE / 1.5
    },
    galleryImage: {
        width: width,
        height: 'auto'
    },
    dots: {
        height: theme.SIZES.BASE / 2,
        margin: theme.SIZES.BASE / 2,
        borderRadius: 4,
        backgroundColor: 'white'
    },
    dotsContainer: {
        position: 'absolute',
        bottom: theme.SIZES.BASE,
        left: 0,
        right: 0,
        // bottom: height / 10,
    },
    addToCart: {
        width: width - theme.SIZES.BASE * 4,
        marginTop: theme.SIZES.BASE,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 0
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE,
        marginRight: 8,
    },
    chat: {
        width: 56,
        height: 56,
        padding: 20,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 8,
        shadowOpacity: 1
    },
    chatContainer: {
        top: -28,
        right: theme.SIZES.BASE,
        zIndex: 2,
        position: 'absolute',
    },
    size: {
        height: theme.SIZES.BASE * 3,
        width: (width - theme.SIZES.BASE * 2) / 3,
        borderBottomWidth: 0.5,
        borderBottomColor: materialTheme.COLORS.BORDER_COLOR,
        overflow: 'hidden',
    },
    sizeButton: {
        height: theme.SIZES.BASE * 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    },
    roundTopLeft: {
        borderTopLeftRadius: 4,
        borderRightColor: materialTheme.COLORS.BORDER_COLOR,
        borderRightWidth: 0.5,
    },
    roundBottomLeft: {
        borderBottomLeftRadius: 4,
        borderRightColor: materialTheme.COLORS.BORDER_COLOR,
        borderRightWidth: 0.5,
        borderBottomWidth: 0,
    },
    roundTopRight: {
        borderTopRightRadius: 4,
        borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
        borderLeftWidth: 0.5,
    },
    roundBottomRight: {
        borderBottomRightRadius: 4,
        borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0,
    },
    icon: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

