/* TODO:
 *   1.copy screen from template(DONE)
 *   2.modify according to typescript(DONE)
 *   3.add/remove features to complete the screen(DONE)
 *   4.Add to cart function(DONE)
 *   5.checkout function -
 *     -check if logged in
 *     - navigation
 *       - address
 *       - payment
 *       - order confirmation
 *     -create order - validatations - parameters - response - error - loading
 *   6.Check for product types, inStock to display relevant options like size, quantity(DONE)
 *   7.description - render html
 * */

import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// @ts-ignore
import {Block, Button, Text, theme} from 'galio-framework';
import {HeaderHeight, iPhoneX} from '../constants/utils';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {WooCommerce, logoURL} from '../constants/config';

import AnimatedToggle from '../common/AnimatedToggle';
import CartService from '../Services/CartService';
import IconExtra from '../common/Icon';
import Select from '../common/Select';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import VirtualizedHorizontalList from '../common/VirtualizedHorizontalList';
import materialTheme from '../constants/Theme';

// import { WebView } from 'react-native-webview';

const {height, width} = Dimensions.get('window');

type Props = {
  navigation?: any;
  route?: any;
  data?: any;
  isLoading?: boolean;
  error?: string;
  scrollX?: any;
  size?: string;
  qty?: any;
  saved?: boolean;
};
const filterOptions = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
];

const service = new CartService();

const PDetails: FunctionComponent<Props> = ({
  navigation,
  route,
  data = null,
  isLoading = false,
  error,
  scrollX = new Animated.Value(0),
  size = null,
  qty = filterOptions[0],
  saved = false,
}) => {
  const [product, setProduct] = useState(data);
  const [load, setLoad] = useState(isLoading);
  const [scrollhorizontal, setScrollHorizontal] = useState(scrollX);
  const [selectedSize, setSelectedSize] = useState(size);
  const [quantity, setQuantity] = useState(qty);
  const [wishlist, setWishlist] = useState(saved);
  const getData = async () => {
    setLoad(true);
    let product = await WooCommerce.get('products/' + route.params.PID);
    const local_wish: Array<any> = await service.getWishlist();
    const isSaved =
      local_wish && local_wish.find((value) => value === product.id);
    product['saved'] = isSaved ? true : false;
    if (isSaved) setWishlist(true);
    console.log('product-' + route.params.PID, product, local_wish);
    setLoad(false);
    setProduct(product);
  };
  const getRelated = async () => {
    const relatedList = await WooCommerce.get('products', {
      stock_status: 'instock',
      category: route.params.CID,
      exclude: [route.params.PID],
      orderby: 'date',
      per_page: 7,
    });
    console.log('related', relatedList);
    return relatedList;
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    handleWishlist();
  }, [wishlist]);

  const handleWishlist = async () => {
    let response = null;
    if (product === null) return;
    if (wishlist) {
      response = await service.addWishlistItem(product.id);
    } else {
      response = await service.removeWishlistItem(product.id);
    }
    console.log('handleWishlist', response);
  };
  const renderGallery = () => {
    //render product images
    const productImages: Array<string> = [];

    product &&
      product.images &&
      product.images.map((el: any) => {
        productImages.push(el.src);
      });

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0.2}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollhorizontal}}}],
          {useNativeDriver: false},
        )}>
        {productImages.map((image: string, index: number) => (
          <TouchableWithoutFeedback
            key={`product-image-${index}`}
            onPress={() =>
              navigation.navigate('Gallery', {images: productImages, index})
            }>
            <Image
              resizeMode="cover"
              source={{uri: image}}
              style={{width, height: iPhoneX() ? width + 32 : width}}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };
  const renderProgress = () => {
    //render product images
    const productImages: Array<string> = [];
    product &&
      product.images &&
      product.images.map((el: any) => {
        productImages.push(el.src);
      });
    const position = Animated.divide(scrollhorizontal, width);

    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={i} style={[styles.dots, {opacity, width}]} />
          );
        })}
      </Block>
    );
  };
  const renderSize = (label: any) => {
    const active = selectedSize === label;

    return (
      <TouchableHighlight
        style={styles.sizeButton}
        underlayColor={materialTheme.COLORS.BUTTON_COLOR}
        onPress={() => setSelectedSize(label)}>
        <Text color={active ? theme.COLORS.WHITE : null}>{label}</Text>
      </TouchableHighlight>
    );
  };
  const renderToggle = () => {
    return (
      <Block style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text size={15}>Add to wishlist</Text>
        <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
          <IconExtra
            name={wishlist ? 'heart' : 'hearto'}
            color={
              wishlist
                ? materialTheme.COLORS.BUTTON_COLOR
                : materialTheme.COLORS.MUTED
            }
            size={27}
            style={styles.icon}
            family={'AntDesign'}
          />
        </TouchableOpacity>
      </Block>
    );
  };
  const getCategories = (categories: Array<any>) => {
    let str = '';
    categories.map((el: any, index: number) => {
      if (index == categories.length - 1) return (str = str + el.name);
      return (str = str + el.name + ', ');
    });
    return str;
  };

  return (
    <Block flex style={styles.product}>
      <SkeletonContent
        duration={1000}
        animationDirection="horizontalLeft"
        containerStyle={{
          flex: 1,
          width: width,
          alignItems: 'center',
          marginTop: theme.SIZES.BASE * 5,
          backgroundColor: theme.COLORS.WHITE,
        }}
        isLoading={load}
        layout={[
          {
            key: 'galleryID',
            width: '90%',
            height: 250,
            marginTop: theme.SIZES.BASE * 2,
          },
        ]}>
        <Block flex style={{position: 'relative'}}>
          {renderGallery()}
          <Block center style={styles.dotsContainer}>
            {renderProgress()}
          </Block>
        </Block>
      </SkeletonContent>
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
            width: '70%',
            height: 25,
            marginBottom: theme.SIZES.BASE / 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'textID1',
            width: '40%',
            height: 20,
            marginBottom: theme.SIZES.BASE * 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'textID2',
            width: '70%',
            height: 25,
            marginBottom: theme.SIZES.BASE / 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'textID3',
            width: '40%',
            height: 20,
            marginBottom: theme.SIZES.BASE * 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'textID4',
            width: '70%',
            height: 25,
            marginBottom: theme.SIZES.BASE / 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'textID5',
            width: '40%',
            height: 20,
            marginBottom: theme.SIZES.BASE * 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
          {
            key: 'button1',
            width: '60%',
            height: 44,
            alignSelf: 'center',
            marginBottom: theme.SIZES.BASE / 1.5,
            marginHorizontal: theme.SIZES.BASE,
          },
        ]}>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Block
              style={{
                paddingHorizontal: theme.SIZES.BASE,
                paddingTop: theme.SIZES.BASE * 2,
              }}>
              <Text size={22} style={{paddingBottom: 24}}>
                {product ? product.name : ''}
              </Text>
              <Block row space="between" flex>
                <Block style={{flex: 1}}>
                  <Text size={13}>
                    SKU:{' '}
                    <Text size={14}>
                      {product && product.sku.length !== 0
                        ? product.sku
                        : 'N/A'}
                    </Text>
                  </Text>
                  <Text size={13} muted>
                    {product &&
                    product.attributes &&
                    product.attributes.length !== 0
                      ? 'Fabric: '
                      : 'Feature: '}
                    <Text size={14}> {product ? product.slug : 'N/A'}</Text>
                  </Text>
                </Block>
                <Block style={{flex: 1, alignItems: 'flex-end'}}>
                  {product && product.sale_price ? (
                    <Text size={13}>
                      On Sale:
                      <Text size={16} bold>
                        {' '}
                        ₹ {product ? product.sale_price : 'N/A'}{' '}
                      </Text>
                    </Text>
                  ) : null}
                  <Text size={13} style={{color: materialTheme.COLORS.MUTED}}>
                    Price:
                    <Text size={16} bold>
                      {' '}
                      ₹{' '}
                      {product
                        ? product.regular_price.length !== 0
                          ? product.regular_price
                          : product.price
                        : 'N/A'}
                    </Text>
                  </Text>
                </Block>
              </Block>
              <Block row space="between" style={{marginTop: theme.SIZES.BASE}}>
                <Block>
                  <Text size={12}>
                    Categories:{' '}
                    <Text size={13}>
                      {' '}
                      {product && product.categories
                        ? getCategories(product.categories)
                        : 'N/A'}
                    </Text>
                  </Text>
                </Block>
              </Block>
              <Block
                row
                space="between"
                style={{flex: 1, marginTop: theme.SIZES.BASE}}>
                <Block
                  center
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text size={14}>Qty: </Text>
                  <Select
                    onSelect={(value) => setQuantity(value)}
                    options={filterOptions}
                    value={quantity}
                    disabled={false}
                    containerStyle={{
                      width: '43%',
                      height: 33,
                      marginLeft: theme.SIZES.BASE / 1.2,
                    }}
                  />
                </Block>
                {renderToggle()}
              </Block>
            </Block>
            <Block style={{padding: theme.SIZES.BASE}}>
              {product &&
              product.attributes &&
              product.attributes.length !== 0 ? (
                <Text size={16}>Size</Text>
              ) : null}
              {product &&
              product.attributes &&
              product.attributes.length !== 0 ? (
                <Block card style={{marginTop: 16}}>
                  <Block row>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        styles.roundTopLeft,
                        selectedSize === 'XS' ? styles.active : null,
                      ]}>
                      {renderSize('XS')}
                    </Block>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        selectedSize === 'S' ? styles.active : null,
                      ]}>
                      {renderSize('S')}
                    </Block>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        styles.roundTopRight,
                        selectedSize === 'M' ? styles.active : null,
                      ]}>
                      {renderSize('M')}
                    </Block>
                  </Block>
                  <Block row>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        styles.roundBottomLeft,
                        selectedSize === 'L' ? styles.active : null,
                      ]}>
                      {renderSize('L')}
                    </Block>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        {borderBottomWidth: 0},
                        selectedSize === 'XL' ? styles.active : null,
                      ]}>
                      {renderSize('XL')}
                    </Block>
                    <Block
                      flex
                      middle
                      style={[
                        styles.size,
                        styles.roundBottomRight,
                        selectedSize === '2XL' ? styles.active : null,
                      ]}>
                      {renderSize('2XL')}
                    </Block>
                  </Block>
                </Block>
              ) : null}
              <Button
                shadowless
                style={styles.addToCart}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => {
                  if (
                    product.attributes &&
                    product.attributes.length !== 0 &&
                    selectedSize === null
                  ) {
                    return Alert.alert('Select Size', 'Please select size');
                  }
                  service.add(
                    product.id,
                    parseInt(quantity.value),
                    selectedSize ? selectedSize : undefined,
                  );
                }}>
                Add to cart
              </Button>
              <Button
                shadowless
                style={styles.addToCart}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => {
                  if (
                    product.attributes &&
                    product.attributes.length !== 0 &&
                    selectedSize === null
                  ) {
                    return Alert.alert('Select Size', 'Please select size');
                  }
                  service.add(
                    product.id,
                    parseInt(quantity.value),
                    selectedSize ? selectedSize : undefined,
                    true,
                  );
                  navigation.navigate('Cart');
                }}>
                Proceed to checkout
              </Button>
            </Block>
            <VirtualizedHorizontalList
              title={'Related Products'}
              getData={getRelated}
              navigation={navigation}
            />
          </ScrollView>
        </Block>
      </SkeletonContent>
    </Block>
  );
};

export default PDetails;

const styles = StyleSheet.create({
  product: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: theme.SIZES.BASE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  galleryImage: {
    width: width,
    height: 'auto',
  },
  dots: {
    height: theme.SIZES.BASE / 2,
    margin: theme.SIZES.BASE / 2,
    borderRadius: 4,
    backgroundColor: 'white',
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
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 0,
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
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    shadowOpacity: 1,
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
    alignItems: 'center',
  },
});
