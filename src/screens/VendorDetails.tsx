/* TODO:
 * - Show all the information od the vendor
 * - Name ,email etc.
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

const VDetails: FunctionComponent<Props> = ({
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
  const [vendor, setVendor] = useState(data);
  const [load, setLoad] = useState(isLoading);
  const [scrollhorizontal, setScrollHorizontal] = useState(scrollX);
  const [selectedSize, setSelectedSize] = useState(size);
  const [quantity, setQuantity] = useState(qty);
  const [wishlist, setWishlist] = useState(saved);
  const getData = async () => {
    setLoad(true);
    setLoad(false);
    setVendor([]);
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
        <Block flex style={{position: 'relative'}}></Block>
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
              }}></Block>
          </ScrollView>
        </Block>
      </SkeletonContent>
    </Block>
  );
};

export default VDetails;

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
