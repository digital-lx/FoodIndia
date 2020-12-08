/* TODO:
 *   1.copy screen from template(DONE)
 *   2.modify according to typescript(DONE)
 *   3.add/remove features to complete the screen(DONE)
 *   4.Filter - Sort by Popularity, Sort by average rating, sort by latest, sort by price:low to high, sort by price:high to low(DONE)
 *   5.Pagination - show more at bottom(DONE)
 * */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
// @ts-ignore
import {Block, Button, NavBar, Text, theme} from 'galio-framework';
import React, {
  FunctionComponent,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import CartService from '../Services/CartService';
import Product from '../common/Product';
import Select from '../common/Select';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Theme from '../constants/Theme';
import {WooCommerce} from '../constants/config';
import materialTheme from '../constants/Theme';

const {width, height} = Dimensions.get('window');
const cardWidth = width - theme.SIZES.BASE * 2;

const service = new CartService();
const filterOptions = [
  {value: 'SortByDefault', label: 'Sort By Default'},
  {value: 'SortbyPopularity', label: 'Popularity'},
  {value: 'Sortbyaveragerating', label: 'Average Rating'},
  {value: 'Sortbylatest', label: 'latest'},
  {value: 'Sortbypricelowtohigh', label: 'Price:low to high'},
  {value: 'Sortbypricelowtohigh', label: 'Price:high to low'},
];
type Props = {
  navigation?: any;
  route?: any;
  data?: any;
  isLoading?: boolean;
  error?: string;
  currentPage?: string;
  sortValue?: any;
  scrollPosition?: number;
};

const ProductList: FunctionComponent<Props> = ({
  sortValue = filterOptions[0],
  navigation,
  route,
  data = [1, 2, 3, 4, 5, 6, 7, 8],
  isLoading = false,
  error,
  currentPage = '1',
  scrollPosition = 0,
}) => {
  const [list, setList] = useState(data);
  const [load, setLoad] = useState(isLoading);
  const [page, setPage] = useState(currentPage);
  const [sort, setSort] = useState(sortValue);
  // const ScrollRef  = useRef();
  const [position, setPosition] = useState(scrollPosition);

  // function handleScroll(event:any) {
  //     console.log(event.nativeEvent.contentOffset.y);
  //     setPosition(event.nativeEvent.contentOffset.y)
  // }
  const handleFilter = async () => {
    console.log('page', page, 'sort', sort.value);
    setLoad(true);
    try {
      let products = null;
      switch (sort) {
        //popularity
        case filterOptions[1]:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            stock_status: 'instock',
            orderby: 'popularity',
            order: 'desc',
            per_page: 10,
            page: page,
          });
          break;
        //average rating
        case filterOptions[2]:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            stock_status: 'instock',
            orderby: 'rating',
            order: 'desc',
            per_page: 10,
            page: page,
          });
          break;
        //latest
        case filterOptions[3]:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            stock_status: 'instock',
            orderby: 'date',
            order: 'desc',
            per_page: 10,
            page: page,
          });
          break;
        //Price:low to high
        case filterOptions[4]:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            stock_status: 'instock',
            orderby: 'price',
            order: 'asc',
            per_page: 10,
            page: page,
          });
          break;
        //Price:high to low
        case filterOptions[5]:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            stock_status: 'instock',
            orderby: 'price',
            order: 'desc',
            per_page: 10,
            page: page,
          });
          break;
        default:
          products = await WooCommerce.get('products', {
            category: route.params.CID,
            per_page: 10,
            page: page,
          });
          break;
      }
      setLoad(false);
      if (parseInt(page) > 1) {
        return setList([...list, ...products]);
      }
      setList(products);
    } catch (e) {
      Alert.alert('Error', 'Network Error');
    }
    setLoad(false);
  };

  useEffect(() => {
    console.log('productlist', list);
  }, [list]);

  useEffect(() => {
    handleFilter();
  }, [sort, page]);

  const renderProduct = ({item}: any, navigation: any) => {
    return (
      <Block
        flex
        center
        key={'product-' + item.id}
        style={{marginBottom: theme.SIZES.BASE}}>
        <SkeletonContent
          duration={500}
          animationDirection="horizontalLeft"
          containerStyle={{
            flex: 1,
            width: width / 2.2,
            backgroundColor: materialTheme.COLORS.WHITE,
            padding: 15,
            borderRadius: 4,
          }}
          isLoading={load}
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
            full
            navigation={navigation}
            product={item}
            priceColor={materialTheme.COLORS.PRIMARY}
            imageStyle={{width: 'auto', height: 94}}
            style={{width: width / 2.88, alignSelf: 'center'}}
          />
          <Button
            center
            shadowless
            color={materialTheme.COLORS.PRIMARY}
            style={styles.optionsButton}
            textStyle={[styles.optionsButtonText, {color: 'white'}]}
            onPress={() => {
              return service.add(item.id);
            }}>
            ADD TO CART
          </Button>
        </SkeletonContent>
      </Block>
    );
  };

  return (
    <Block flex>
      <Block style={{marginTop: theme.SIZES.BASE}}>
        <Select
          onSelect={(value) => {
            setPage('1');
            setSort(value);
          }}
          options={filterOptions}
          value={sort}
          disabled={false}
          containerStyle={{
            width: '60%',
            height: 40,
            marginBottom: theme.SIZES.BASE / 1.2,
            marginLeft: theme.SIZES.BASE,
          }}
        />
      </Block>
      <Block>
        <FlatList
          decelerationRate={0.5}
          // ref={ScrollRef}
          style={{marginBottom: theme.SIZES.BASE * 4}}
          // onScroll={handleScroll}
          data={list}
          horizontal={false}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          renderItem={({item}) => renderProduct({item}, navigation)}
          numColumns={2}
          ListEmptyComponent={<Text size={theme.SIZES.BASE}>No Product</Text>}
          ListFooterComponent={
            <Block
              flex
              style={{
                flex: 1,
                width: width,
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: theme.SIZES.BASE,
                paddingHorizontal: theme.SIZES.BASE,
              }}>
              <TouchableHighlight
                disabled={load}
                underlayColor={materialTheme.COLORS.MUTED}
                style={styles.showMore}
                onPress={() => {
                  const p = parseInt(page) + 1;
                  setPage(JSON.stringify(p));
                }}>
                {!load ? (
                  <Text size={16} muted bold>
                    Show more
                  </Text>
                ) : (
                  <ActivityIndicator
                    color={materialTheme.COLORS.MUTED}
                    size={18}
                  />
                )}
              </TouchableHighlight>
            </Block>
          }
        />
      </Block>
    </Block>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  showMore: {
    flex: 1,
    height: 35,
    width: '30%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: materialTheme.COLORS.MUTED,
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
    borderRadius: 4,
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
    borderTopLeftRadius: 4,
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
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 5,
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});
