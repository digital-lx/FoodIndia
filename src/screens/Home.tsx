/* TODO: Create Home Screen
 * - Banners /Ads - top - between
 * - Product Categories - Improve Styling
 * - List of vendors - nearest to far - 15 vendors
 *  - Flatlist
 *  - VendorCard - name - address - image - Deals in
 * */

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

import Banner from '../common/Banner';
import Data from '../constants/sampleData';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import VirtualizedHorizontalList from '../common/VirtualizedHorizontalList';
import {WooCommerce} from '../constants/config';
import argonTheme from '../constants/Theme';
import sampleData from '../constants/sampleData';

const {height, width} = Dimensions.get('window');
const noImageURL =
  'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';
//LIST CATEGORIES

const Category_Item = ({item}: any, props: any, navigation: any) => {
  if (item.count === 0) return null;
  return (
    <Block
      card
      style={{
        marginRight: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE,
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.SIZES.BASE / 2,
      }}>
      <SkeletonContent
        duration={1200}
        animationDirection="horizontalLeft"
        containerStyle={{flex: 1, width: width / 2.7}}
        isLoading={props.isLoading}
        layout={[
          {
            key: 'categoryimageID',
            width: '100%',
            height: 114,
            marginBottom: theme.SIZES.BASE,
          },
          {key: 'categorytextID', width: '99%', height: 18},
        ]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ProductList', {CID: item.id})}>
          <Block flex onPress={() => navigation.navigate('ProductList')}>
            <Image
              source={{uri: item.image ? item.image : noImageURL}}
              style={[
                {
                  width: '100%',
                  height: 114,
                  borderRadius: 5,
                  resizeMode: 'cover',
                  marginBottom: theme.SIZES.BASE / 2,
                },
                styles.shadow,
              ]}
            />
            <Text size={13}>{item.name}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </SkeletonContent>
    </Block>
  );
};

type listProps = {
  list: Array<any>;
  isLoading: boolean;
  navigation: any;
};
const RenderCategories: FunctionComponent<listProps> = ({
  list,
  isLoading,
  navigation,
}) => {
  return (
    <Block
      style={{
        marginHorizontal: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE / 3,
      }}>
      <Text
        bold
        size={theme.SIZES.BASE}
        style={styles.similarTitle}
        color={argonTheme.COLORS.TEXT}>
        Product Categories
      </Text>
      <FlatList
        style={{flex: 1}}
        numColumns={2}
        data={list}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        renderItem={({item}) => Category_Item({item}, {isLoading}, navigation)}
        extraData={{isLoading}}
      />
    </Block>
  );
};
//LIST CATEGORIES

//HOME
type Props = {
  categories?: Array<any>;
  loading?: boolean;
  navigation?: any;
  route?: any;
  newProducts?: Array<any>;
};

const Home: FunctionComponent<Props> = ({
  categories = sampleData.categories,
  loading = false,
  navigation,
  route,
}) => {
  const [categoryList, setCategories] = useState(categories);
  const [load, setLoad] = useState(loading);

  // const getData = async () => {
  //   setLoad(true);
  //   try {
  //     const categories = sampleData.categories;
  //     setLoad(false);
  //     setCategories(categories);
  //   } catch (e) {
  //     Alert.alert('Error', 'No Internet Connectivity');
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <ScrollView style={styles.parent}>
      <Banner
        navigation={navigation}
        route={route}
        images={Data.banner_top_images}
        styl={{height: 260}}
      />
      {/* <View style={styles.secondChild}>
        <Image
          source={{
            uri:
              'http://www.vyaparexpress.co/wp-content/uploads/2020/08/Side-Banner.jpg',
          }}
          style={{width: '50%', height: 75}}
        />
      </View> */}
      <View style={styles.verticalContainer}>
        <RenderCategories
          list={categoryList}
          isLoading={load}
          navigation={navigation}
        />
      </View>
      <View style={styles.banner_container}>
        <Text
          bold
          size={theme.SIZES.BASE}
          style={[styles.similarTitle, {paddingLeft: theme.SIZES.BASE * 1.2}]}
          color={argonTheme.COLORS.TEXT}>
          Our Prime Customers
        </Text>
        <Banner
          navigation={navigation}
          route={route}
          images={Data.banner_middle_images}
          styl={{height: 220}}
        />
      </View>
      {/* {PLACE VENDOR'S LIST - Place it here} */}
    </ScrollView>
  );
};
//MAIN HOME
export default Home;

const styles = StyleSheet.create({
  banner_container: {
    backgroundColor: '#fff',
    marginBottom: theme.SIZES.base,
  },
  parent: {
    backgroundColor: 'rgba(220,220,220,0.5)',
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
  },
  secondChild: {
    marginTop: 10,
    width: width,
    backgroundColor: '#fff',
    flex: 1,
    padding: 5,
  },
  verticalContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
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
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.7,
    elevation: 5,
  },
});
