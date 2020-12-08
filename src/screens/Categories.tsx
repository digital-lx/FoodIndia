/* TODO:
 *   1.copy screen from template(DONE)
 *   2.modify according to typescript(DONE)
 *   3.add/remove features to complete the screen (DONE)
 * */

// @ts-ignore
import {Block, Text, theme} from 'galio-framework';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {WooCommerce} from '../constants/config';

const {width} = Dimensions.get('screen');
const noImageURL =
  'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

type Props = {
  navigation?: any;
  route?: any;
  categories?: any;
  isLoading?: boolean;
  error?: string;
};
const Categories: FunctionComponent<Props> = ({
  navigation,
  route,
  categories = [1, 2, 3, 4, 5, 6, 7, 8],
  isLoading = false,
  error = '',
}) => {
  const [load, setLoad] = useState(isLoading);
  const [categoryList, setCategories] = useState(categories);

  const getData = async () => {
    setLoad(true);
    const items = await WooCommerce.get('products/categories', {
      exclude: [104],
      per_page: 60,
    });
    setLoad(false);
    setCategories(items);
  };

  useEffect(() => {
    getData();
  }, []);

  const RenderCategory = ({item}: any, load: boolean, navigation: any) => {
    return (
      <SkeletonContent
        key={item.id ? `category-${item.title}` : `category-${item}`}
        duration={500}
        animationDirection="horizontalLeft"
        containerStyle={{
          flex: 1,
          width: '95%',
          backgroundColor: theme.COLORS.WHITE,
          padding: 12,
          borderRadius: 4,
        }}
        isLoading={load}
        layout={[
          {
            key: 'category_main',
            width: '100%',
            height: 140,
            marginBottom: theme.SIZES.BASE / 2,
            borderRadius: 4,
            alignSelf: 'center',
          },
        ]}>
        {item.id ? (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ProductList', {CID: item.id})}>
            <Block flex card style={styles.shadow}>
              <ImageBackground
                source={{
                  uri: item.image ? item.image.src : noImageURL,
                }}
                style={[
                  styles.imageBlock,
                  {
                    width: width / 2.2,
                    height: 140,
                  },
                ]}
                imageStyle={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: 140,
                }}>
                <Block style={styles.categoryTitle}>
                  <Text size={11} bold color={theme.COLORS.WHITE}>
                    {item.name} ({item.count})
                  </Text>
                </Block>
              </ImageBackground>
            </Block>
          </TouchableWithoutFeedback>
        ) : null}
      </SkeletonContent>
    );
  };

  return (
    <Block flex center style={styles.categories}>
      <FlatList
        style={{flex: 1, width: '100%', backgroundColor: '#fff'}}
        decelerationRate={1}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        data={categoryList}
        numColumns={2}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        renderItem={({item}) => RenderCategory({item}, load, navigation)}
      />
    </Block>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categories: {
    width: width,
    backgroundColor: theme.COLORS.WHITE,
  },
  categoryList: {
    justifyContent: 'center',
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
