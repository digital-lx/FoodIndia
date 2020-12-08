/* TODO:
 *   1. Improve Requests response time - (DONE);
 *   2. Add to cart functionality -(DONE)
 *      - create local_cart in local storage(DONE)
 *      - when an item is added to cart(DONE)
 *          - check if present(DONE)
 *          - if present increase quantity - update(DONE)
 *          - if not add new product in list(DONE)
 *   3. Connect product to product details screen - (DONE)
 *   4. Connect categories to Products list screen -(DONE)
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
import CartService from '../Services/CartService';
import Product from '../common/Product';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import VirtualizedHorizontalList from '../common/VirtualizedHorizontalList';
import {WooCommerce} from '../constants/config';
import argonTheme from '../constants/Theme';

const service = new CartService();
const {height, width} = Dimensions.get('window');

const noImageURL =
  'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

type listProps = {
  list: Array<any>;
  isLoading: boolean;
  navigation: any;
};

const renderHorizontalItem = ({item}: any, props: any, navigation: any) => {
  if (item.count === 0) return null;
  return (
    <Block style={{marginRight: theme.SIZES.BASE, width: width / 3}}>
      <SkeletonContent
        duration={1200}
        animationDirection="horizontalLeft"
        containerStyle={{flex: 1, width: width / 3}}
        isLoading={props.isLoading}
        layout={[
          {
            key: 'categoryimageID',
            width: '100%',
            height: 94,
            marginBottom: theme.SIZES.BASE / 1.5,
          },
          {key: 'categorytextID', width: '99%', height: 15},
        ]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ProductList', {CID: item.id})}>
          <Block flex onPress={() => navigation.navigate('ProductList')}>
            <Image
              source={{uri: item.image ? item.image.src : noImageURL}}
              style={{
                width: '100%',
                height: 94,
                borderRadius: 3,
                backgroundColor: '#ccc',
                resizeMode: 'cover',
                marginBottom: theme.SIZES.BASE / 2,
              }}
            />
            <Text size={11}>
              {item.name} ({item.count})
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </SkeletonContent>
    </Block>
  );
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
        Shop by Category
      </Text>
      <FlatList
        data={list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        renderItem={({item}) =>
          renderHorizontalItem({item}, {isLoading}, navigation)
        }
        extraData={{isLoading}}
      />
    </Block>
  );
};

type Props = {
  categories?: Array<any>;
  loading?: boolean;
  navigation?: any;
  route?: any;
  newProducts?: Array<any>;
};

const Home: FunctionComponent<Props> = ({
  categories = [1, 2, 3],
  loading = false,
  navigation,
  route,
}) => {
  const [categoryList, setCategories] = useState(categories);
  const [load, setLoad] = useState(loading);

  const renderData = [
    {
      id: 0,
      title: 'New In',
      getData: async () => {
        try {
          const newIn = await WooCommerce.get('products', {
            stock_status: 'instock',
            orderby: 'date',
            order: 'desc',
            per_page: 6,
          });

          return newIn;
        } catch (e) {
          Alert.alert('Error', 'No Internet Connectivity');
        }
      },
    },
    {
      id: 1,
      title: 'Recommended',
      getData: async () => {
        try {
          const recommended = await WooCommerce.get('products', {
            category: 121,
            stock_status: 'instock',
            per_page: 6,
          });
          return recommended;
        } catch (e) {
          Alert.alert('Error', 'No Internet Connectivity');
        }
      },
    },
    {
      id: 2,
      title: 'Fan Favorite',
      getData: async () => {
        try {
          const fanFavourite = await WooCommerce.get('products', {
            category: 35,
            stock_status: 'instock',
            per_page: 6,
          });
          return fanFavourite;
        } catch (e) {
          Alert.alert('Error', 'No Internet Connectivity');
        }
      },
    },
    {
      id: 3,
      title: 'On Sale',
      getData: async () => {
        try {
          const onSale = await WooCommerce.get('products', {
            on_sale: true,
            stock_status: 'instock',
            order: 'asc',
            per_page: 6,
          });
          return onSale;
        } catch (e) {
          Alert.alert('Error', 'No Internet Connectivity');
        }
      },
    },
    {
      id: 4,
      title: 'Best Seller',
      getData: async () => {
        try {
          const bestSeller = await WooCommerce.get('products', {
            category: 79,
            stock_status: 'instock',
            per_page: 6,
          });
          return bestSeller;
        } catch (e) {
          Alert.alert('Error', 'No Internet Connectivity');
        }
      },
    },
  ];

  const getData = async () => {
    setLoad(true);
    try {
      const categories = await WooCommerce.get('products/categories', {
        exclude: [104],
        per_page: 6,
      });
      setLoad(false);
      setCategories(categories);
    } catch (e) {
      Alert.alert('Error', 'No Internet Connectivity');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <ScrollView style={styles.parent}>
      <Banner navigation={navigation} route={route} />
      <View style={styles.secondChild}>
        <Image
          source={{
            uri:
              'https://siapmart.in/wp-content/uploads/2020/06/fashion-banner3.jpg',
          }}
          style={{width: '100%', height: 75}}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <RenderCategories
          list={categoryList}
          isLoading={load}
          navigation={navigation}
        />
      </View>
      {renderData.map((el) => (
        <View style={styles.horizontalContainer} key={`list_${el.title}`}>
          <VirtualizedHorizontalList
            title={el.title}
            getData={el.getData}
            navigation={navigation}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
  horizontalContainer: {
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
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
