/*TODO:
*   1.Copy screen from template(DONE)
*   2.Modify according to typescript(DONE)
*   3.Add/remove features to complete the screen(DONE)
*   5.Create Skeleton(DONE)
*   6.Product list - same as product list(DONE)
*   7.Add product to wishlist(DONE)
*   8.remove product from wishlist(DONE)
*   9.get products in wishlist(DONE)
*   11.Add/remove button - color difference(DONE)
*Next: move to wallet
* */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator, Dimensions, Alert} from "react-native";
import materialTheme from "../constants/Theme";
// @ts-ignore
import {Button, Block, NavBar, Text, theme} from 'galio-framework';
import Select from "../common/Select";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Product from "../common/Product";
import {WooCommerce} from "../constants/config";
import CartService from "../Services/CartService";
import LoginRequest from "../common/LoginRequest";
import requests from "../Services/requests";

const service = new CartService();
const request = new requests();

const {width, height} = Dimensions.get('window');
const cardWidth = width - (theme.SIZES.BASE * 2);

type Props = {
    navigation?: any,
    route?: any,
    data?: any,
    isLoading?: boolean,
    error?: string,
    customer?: false
};

const Wishlist: FunctionComponent<Props> = ({customer = false, navigation, route, data = [1, 2, 3, 4, 5, 6, 7, 8], isLoading = false, error}) => {
    const [list, setList] = useState(data);
    const [load, setLoad] = useState(isLoading);
    const [user, setUser] = useState(customer);

    const getProducts = async () => {
        setLoad(true);
        //check if user
        const loggedIn = await request.isLoggedIn();
        if (!loggedIn) return Alert.alert('Error', 'Please Login')
        setUser(true)
        try {
            let wishData: Array<any> = await service.getWishlist();
            if (wishData.length === 0) return setList([]);
            const Products = await WooCommerce.get('products', {
                include: wishData
            })

            let wish_products = Products

            wish_products.map((value: any, index: number) => {
                const isSaved = wishData.filter(item => value.id === item)
                if (isSaved.length !== 0) return wish_products[index].saved = true
                return wish_products[index].saved = false
            })
            setLoad(false)
            setList(wish_products);
        } catch (e) {
            setLoad(false)
            console.log('Error', e)
        }

    }
    const handleDelete = async (id: number) => {
        const response = await service.removeWishlistItem(id);
        let x = list.filter((item:any) => item.id !== id);
        console.log('x',x, response);
        setList(x);
    }
    useEffect(() => {
        getProducts()
    }, [])
    const renderProduct = ({item}: any, navigation: any) => {
        return (
            <Block flex center key={'product-' + item.id} style={{marginBottom: theme.SIZES.BASE}}>
                <SkeletonContent
                    duration={1000}
                    animationDirection="horizontalLeft"
                    containerStyle={{
                        flex: 1,
                        width: width / 2.2,
                        backgroundColor: materialTheme.COLORS.WHITE,
                        padding: 15,
                        borderRadius: 4
                    }}
                    isLoading={load}
                    layout={[
                        {key: 'imageID', width: '100%', height: 94, marginBottom: theme.SIZES.BASE / 1.5},
                        {key: 'textID', width: '40%', height: 15, marginBottom: theme.SIZES.BASE / 1.5},
                        {key: 'buttonID', width: '100%', height: 25}
                    ]}
                >
                    <Product
                        full
                        navigation={navigation}
                        product={item}
                        priceColor={materialTheme.COLORS.PRIMARY}
                        imageStyle={{width: 'auto', height: 94}}
                        style={{width: width / 2.88, alignSelf: 'center'}}
                    />
                    <Block row space={'between'}>
                        <Button
                            center
                            shadowless
                            color={materialTheme.COLORS.PRIMARY}
                            style={[styles.optionsButton,{width: '55%'}]}
                            textStyle={[styles.optionsButtonText, {color: 'white'}]}
                            onPress={() => {
                                return service.add(item.id);
                            }}
                        >
                            Add to cart
                        </Button>
                        <Button
                            center
                            shadowless
                            color={materialTheme.COLORS.MUTED}
                            style={[styles.optionsButton,{width: '40%'}]}
                            textStyle={[styles.optionsButtonText, {color: 'white'}]}
                            onPress={() => handleDelete(item.id)}
                        >
                            Remove
                        </Button>
                    </Block>
                </SkeletonContent>
            </Block>
        )
    };

    return <Block flex style={{marginTop: theme.SIZES.BASE}}>
        <Block>
            {user ? <FlatList
                data={list}
                horizontal={false}
                ListEmptyComponent={<Text
                    bold
                    style={{marginHorizontal: theme.SIZES.BASE, marginVertical: theme.SIZES.BASE, alignSelf: 'center'}}
                    size={theme.SIZES.BASE}>No items in wishlist </Text>}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                renderItem={({item}) => renderProduct({item}, navigation)}
                numColumns={2}
            /> : <LoginRequest navigation={navigation}/>}
        </Block>
    </Block>;
};

export default Wishlist;

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
    product: {
        width: cardWidth - theme.SIZES.BASE * 2,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: theme.SIZES.BASE * 2,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 7},
        shadowRadius: 10,
        shadowOpacity: 0.2,
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
        fontFamily:'apple',
        fontSize: 12,
        color: theme.COLORS.WHITE,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.29
    },
    optionsButton: {
        height: 32,
        paddingHorizontal: theme.SIZES.BASE/2,
        borderRadius: 3,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 1,
    },
});
