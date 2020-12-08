// @ts-ignore
import {Block, Text, theme} from 'galio-framework';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {FunctionComponent, useEffect} from 'react';

const {width} = Dimensions.get('screen');
const noImageURL =
  'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

type props = {
  product: any;
  horizontal?: boolean;
  full?: boolean;
  style?: any;
  priceColor?: any;
  imageStyle: any;
  navigation: any;
};

const Product: FunctionComponent<props> = ({
  product,
  horizontal,
  full,
  style,
  priceColor,
  imageStyle,
  navigation,
}) => {
  const imageStyles = [
    styles.image,
    full ? styles.fullImage : styles.horizontalImage,
    imageStyle,
  ];

  return (
    <Block
      row={horizontal}
      card
      flex
      style={[styles.product, styles.shadow, style]}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.push('PDetails', {
            PID: product.id,
            CID: product.categories[0].id,
          })
        }>
        <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Image
            source={{
              uri:
                product.images !== undefined
                  ? product.images[0].src
                  : noImageURL,
            }}
            style={imageStyles}
          />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('PDetails', {PID: product.id})}>
        <Block flex space="between" style={styles.productDescription}>
          <Text size={12} style={styles.productTitle}>
            {product.name}
          </Text>
          <Text size={10} muted={!priceColor} color={priceColor}>
            ₹ {product.price}
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    maxHeight: 42,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
