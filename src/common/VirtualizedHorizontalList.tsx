import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// @ts-ignore
import {Block, Button, NavBar, Text, theme} from 'galio-framework';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Product from '../common/Product';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {WooCommerce} from '../constants/config';
import argonTheme from '../constants/Theme';

const {height, width} = Dimensions.get('window');

const RenderProduct = ({item}: any, props: any, navigation: any) => {
  return (
    <Block style={{marginRight: theme.SIZES.BASE}}>
      <SkeletonContent
        duration={1000}
        animationDirection="horizontalLeft"
        containerStyle={{flex: 1, width: width / 3}}
        isLoading={props.load}
        layout={[
          {
            key: 'imageID',
            width: '100%',
            height: 94,
            marginBottom: theme.SIZES.BASE / 1.5,
          },
          {
            key: 'textID',
            width: '40%',
            height: 15,
            marginBottom: theme.SIZES.BASE / 1.5,
          },
          {key: 'buttonID', width: '100%', height: 25},
        ]}>
        <Product
          navigation={navigation}
          product={item}
          priceColor={argonTheme.COLORS.PRIMARY}
          imageStyle={{width: 'auto', height: 94}}
          style={{width: width / 2.88}}
        />
        <Button
          center
          shadowless
          color={argonTheme.COLORS.BUTTON_COLOR}
          style={styles.optionsButton}
          textStyle={[styles.optionsButtonText, {color: 'white'}]}
          onPress={() => {
            if (item.attributes.length > 0) {
              return navigation.navigate('PDetails', {PID: item.id});
            }
          }}>
          {item.attributes && item.attributes.length === 0
            ? 'Add to cart'
            : 'Select options'}
        </Button>
      </SkeletonContent>
    </Block>
  );
};

const VirtualizedHorizontalList: FunctionComponent<{
  list?: Array<any>;
  getData: () => any;
  isLoading?: boolean;
  title: string;
  navigation: any;
}> = ({navigation, getData, list = [1, 2, 3], isLoading = false, title}) => {
  const [load, setLoad] = useState(isLoading);
  const [data, setData] = useState(list);

  const getProducts = async () => {
    setLoad(true);
    let products = [];
    try {
      products = await getData();
    } catch (e) {
      products = [];
      Alert.alert('Error', 'No Internet Connectivity');
    }
    setLoad(false);
    setData(products);
  };

  useEffect(() => {
    getProducts();
    return;
  }, []);

  return (
    <Block style={{marginHorizontal: theme.SIZES.BASE}}>
      <Text bold size={theme.SIZES.BASE} style={styles.similarTitle}>
        {title}
      </Text>
      {data && data.length === 0 ? (
        <Text size={theme.SIZES.BASE} style={{marginLeft: 5}}>
          No Product
        </Text>
      ) : (
        <FlatList
          decelerationRate={0.5}
          keyboardDismissMode="on-drag"
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          renderItem={({item}) => RenderProduct({item}, {load}, navigation)}
        />
      )}
    </Block>
  );
};

export default VirtualizedHorizontalList;

const styles = StyleSheet.create({
  optionsButtonText: {
    fontFamily: 'open-sans-bold',
    fontSize: theme.SIZES.BASE * 0.75,
    color: theme.COLORS.WHITE,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  similarTitle: {
    lineHeight: 26,
    marginBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
});
