/*TODO:
*   1.Copy screen from template(DONE)
*   2.Modify according to typescript(DONE)
*   3.Add/remove features to complete the screen(DONE)
*   4.Create Skeleton(DONE)
*   5.search product with search text - virtualized product list(DONE)
*  NEXT: Navigate to notifications
* THE END
* */

import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    TouchableWithoutFeedback
} from "react-native";
// @ts-ignore
import {Button, Block, NavBar, Text, theme, Input} from 'galio-framework';

const {height, width} = Dimensions.get('window');

import Icon from "../common/Icon";
import argonTheme from "../constants/Theme";
import materialTheme from "../constants/Theme";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Product from "../common/Product";
import {WooCommerce} from "../constants/config";

type Props = { navigation?: any, route?: any, data?: Array<any>, queryString?: string, isloading?: boolean };

const Search: FunctionComponent<Props> = ({navigation, route, data = [], queryString = '', isloading = false}) => {
    const [list, setList] = useState(data);
    const [search, setSearch] = useState(queryString);
    const [load, setLoad] = useState(isloading);


    const searchData = async () => {
        if (search.length === 0) return setList([]);
        setLoad(true)
        const searchData = await WooCommerce.get('products', {
            search: search
        })
        console.log('searchData', searchData);
        setLoad(false)
        setList(searchData)
    }
    const renderItems = ({item}: any) => {
        return <Block flex center key={'product-' + item.id} style={{marginBottom: theme.SIZES.BASE}}>
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
                    {key: 'buttonID', width: '90%', height: 27}

                ]}
            >
                <TouchableWithoutFeedback onPress={() => navigation.push('PDetails', {PID: item.id})}>
                    <Text>{item.name}</Text>
                </TouchableWithoutFeedback>
            </SkeletonContent>
        </Block>

    }
    useEffect(() => {
        searchData()
    }, [search])
    return <View>
        <Input
            onChangeText={(text: any) => setSearch(text)}
            right
            color="black"
            style={styles.search}
            placeholder="What are you looking for?"
            placeholderTextColor={'#8898AA'}
            onFocus={() => navigation.navigate('Search')}
            iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search" family="MaterialIcons"/>}
        />
        {/*TODO:Create list of all matched items*/}
        <FlatList
            style={{marginBottom: theme.SIZES.BASE * 4}}
            data={list}
            horizontal={false}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            renderItem={({item}) => renderItems({item})}
            ListEmptyComponent={<Text bold style={{
                marginHorizontal: theme.SIZES.BASE,
                marginVertical: theme.SIZES.BASE,
                alignSelf: 'center'
            }} size={theme.SIZES.BASE * 1.5}>No Product</Text>}
        />
    </View>;
};

export default Search;
const styles = StyleSheet.create({
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: argonTheme.COLORS.BORDER
    },

});
