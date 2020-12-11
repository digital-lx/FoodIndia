// @ts-ignore
import {Block, Button, NavBar, Text, theme} from 'galio-framework';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
/*TODO:Create Vendor Card
 * VendorCard
 *  - name
 *  - address
 *  - image
 *  - Deals in
 */
import React, {
  FunctionComponent,
  FunctionComponentFactory,
  useEffect,
} from 'react';
import {height, width} from '../constants/utils';

import Colors from '../constants/Theme';
// sample data
import Data from '../constants/sampleData';
import {FlatList} from 'react-native-gesture-handler';
import {JsonConfig} from '@notifee/react-native/dist/types/Module';
import argonTheme from '../constants/Theme';
// common styles
import {base} from '../common/styles';
import {navigate} from '@react-navigation/compat/lib/typescript/src/NavigationActions';

type itemprops = {
  name: string;
  address: string;
  image: Array<string>;
  deals: Array<string>;
  index: number;
  onPress: (id: number) => {};
};
const noImageURL =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

export const VendorCard: FunctionComponent<itemprops> = ({
  name,
  address,
  image,
  deals,
  index,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.touchable}
      onPress={() => onPress(index)}>
      <View style={styles.parent}>
        {/* Image View  */}
        <View style={styles.Image}>
          <Image
            source={{uri: image[0] != 'N/A' ? image[0] : noImageURL}}
            style={[
              {
                width: '100%',
                height: 114,
                borderRadius: 10,
                resizeMode: 'contain',
                marginBottom: 2,
              },
              styles.shadow,
            ]}
          />
        </View>
        {/* Vendor Detail View  */}
        <View style={styles.vendorDetailsContainer}>
          <Text
            style={[
              {
                fontSize: base.text_normal.fontSize - 2,
                fontFamily: base.text_large.fontFamily,
              },
              {flex: 0.1},
            ]}>
            {name}
          </Text>
          <Text
            style={[
              base.text_small.fontSize - 2,
              base.text_small.fontFamily,
              {flex: 0.7, color: Colors.COLORS.ICON},
            ]}>
            {address}
          </Text>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                {
                  fontSize: base.text_small.fontSize - 2,
                  fontFamily: base.text_normal.fontFamily,
                },
              ]}>
              Deals In -{'  '}
            </Text>
            {deals.map((deal, index) => (
              <View
                style={{
                  paddingTop: 2,
                }}>
                {index < 3 && (
                  <Text
                    style={[
                      {
                        fontSize: base.text_small.fontSize - 2,
                        fontFamily: base.text_large.fontFamily,
                      },
                    ]}>
                    {deal}
                    {/* if it is the third index, then '.' else ',' */}
                    <Text style={{fontWeight: 'normal'}}>
                      {index == deals.length - 1 || index == 2 ? '.' : ' , '}
                    </Text>
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type props = {
  data?: Array<any>;
  navigation: any;
  route: any;
  onPress: (id: number) => {};
};

const Vendor: FunctionComponent<props> = ({
  data,
  onPress,
  navigation,
  route,
}) => {
  return (
    <FlatList
      data={data}
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: theme.SIZES.BASE,
      }}
      ListHeaderComponent={() => (
        <View>
          {route.name === 'Home' && (
            <View style={{backgroundColor: 'white', flex: 1, paddingTop: 18}}>
              <Text
                bold
                size={theme.SIZES.BASE * 1.1}
                style={[base.text_large, {paddingLeft: theme.SIZES.BASE * 1.1}]}
                color={argonTheme.COLORS.TEXT}>
                Top Vendors
              </Text>
            </View>
          )}
        </View>
      )}
      ListFooterComponent={() => (
        // if it is the home screen show View All, else show Load More
        <TouchableOpacity
          onPress={() => {
            if (route.name === 'Home') {
              navigation.navigate('vendorslist');
            } else {
              // load more data
            }
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#0B94E8',
                fontSize: theme.SIZES.BASE * 1.1,
                textDecorationLine: 'underline',
              }}>
              {route.name === 'Home' ? 'View all' : 'Load more'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      renderItem={({item, index}) => (
        <VendorCard
          name={item.data.name}
          address={item.data.Address}
          image={item.data.images}
          deals={item.data.Deals_in}
          onPress={onPress}
          index={index}
        />
      )}
    />
  );
};

export default Vendor;

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    margin: width * 0.02,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 3,
    backgroundColor: 'white',
  },
  parent: {
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE / 1.5,
  },
  Image: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    // borderRadius:10,
    // borderWidth:10,
  },
  similarTitle: {
    lineHeight: 26,
    marginBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  vendorDetailsContainer: {
    flex: 0.7,
    justifyContent: 'center',
    padding: 5,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.7,
    elevation: 5,
  },
});
