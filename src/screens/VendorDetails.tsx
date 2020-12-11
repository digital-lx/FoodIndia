/* TODO:
 * - Show all the information od the vendor
 * - Name ,email etc.
 * Create the Banner
 * Title for Each Card
 * Card containing the image name, Address
 * Card containing the Products
 * Card containing the contacts info
 *
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
  View,
} from 'react-native';
// @ts-ignore
import {Block, Button, Text, theme} from 'galio-framework';
import {HeaderHeight, iPhoneX} from '../constants/utils';
import React, {FunctionComponent, useEffect, useState} from 'react';
import Data from '../constants/sampleData';
import Banner from '../common/Banner';
import {BaseRouter} from '@react-navigation/native';
import Colors from '../constants/Theme';
import CustomCard from '../common/CustomCard';
// common styles
import {base} from '../common/styles';
import materialTheme from '../constants/Theme';

// import { WebView } from 'react-native-webview';

const {height, width} = Dimensions.get('window');

type Props = {
  navigation?: any;
  route?: any;
  vendor: any;
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

const VDetails: FunctionComponent<Props> = ({navigation, route, vendor}) => {
  const noImageURL =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

  // useEffect(() => {
  //   console.log(route.params.vendor);
  // });
  return (
    <ScrollView>
      <View style={styles.product}>
        {/* banner View  */}
        <Banner
          navigation={navigation}
          route={route}
          images={Data.banner_top_images}
          styl={{height: 150}}
        />
        {/* Image name address Card */}
        <CustomCard>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.imageView}>
              <Image
                source={{
                  uri:
                    route.params.vendor.data.images[0] != 'N/A'
                      ? route.params.vendor.data.images[0]
                      : noImageURL,
                }}
                style={[
                  {
                    width: '100%',
                    height: 114,
                    borderRadius: 10,
                    resizeMode: 'contain',
                  },
                  styles.shadow,
                ]}
              />
            </View>
            <View style={{flex: 3, flexDirection: 'column'}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={[base.text_large, {textAlign: 'center'}]}>
                  {route.params.vendor.data.name}
                </Text>
              </View>
              <Text
                style={[
                  base.text_small,
                  {
                    flex: 1,
                    color: Colors.COLORS.ICON,
                    textAlign: 'center',
                  },
                ]}>
                Address {route.params.vendor.data.Address}
              </Text>
            </View>
          </View>
        </CustomCard>
        {/* Vendor Product View  */}
        <CustomCard title="Deals In">
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* <Text style={base.text_normal}>Deals In{'  '}</Text> */}
            {route.params.vendor.data.Deals_in.map(
              (deal: string, index: number) => (
                <View>
                  <Text
                    style={[
                      base.text_small,
                      {fontWeight: 'bold', paddingTop: 3},
                    ]}>
                    {deal}
                    {/* if it is the third index, then '.' else ',' */}
                    <Text style={{fontWeight: 'normal'}}>
                      {index == route.params.vendor.data.Deals_in.length - 1
                        ? '.'
                        : ' , '}
                    </Text>
                  </Text>
                </View>
              ),
            )}
          </View>
        </CustomCard>

        <CustomCard title="Contact Info">
          {/* mobile contact  */}
          {route.params.vendor.data.phone[0] != 'N/A' && (
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={[base.text_normal, {fontFamily: 'argon'}]}>
                Mobile Number{' '}
              </Text>
              {route.params.vendor.data.phone.map(
                (phone: string, index: number) => (
                  <View>
                    <Text
                      style={[
                        base.text_small,
                        {paddingLeft: 10, paddingTop: 2},
                      ]}>
                      {phone}
                      {index == route.params.vendor.data.phone.length - 1
                        ? '.'
                        : ','}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}

          {/* phone contact  */}
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 0.4}}>
              <Text style={[base.text_normal, {fontFamily: 'argon'}]}>
                Telephone Number
              </Text>
            </View>
            <View style={{flex: 0.6, flexDirection: 'column'}}>
              {route.params.vendor.data.contacts.map((phone: any) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <Text style={[base.text_small, {marginRight: 10}]}>
                    {phone?.name}
                  </Text>
                  <Text style={base.text_small}>{phone?.phone_number}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Email  */}

          <View style={styles.Rowcontainer}>
            {route.params.vendor.data.email != 'N/A' && (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1}}>
                  <Text style={[base.text_normal, {fontFamily: 'argon'}]}>
                    Email
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={[base.text_small]}>
                    {route.params.vendor.data.email}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Website */}

          <View style={styles.Rowcontainer}>
            {route.params.vendor.data.website != 'N/A' && (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1}}>
                  <Text style={[base.text_normal, {fontFamily: 'argon'}]}>
                    Website
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text style={[base.text_small, {flex: 1}]}>
                    {route.params.vendor.data.website}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </CustomCard>
        <View style={styles.vendorDetailsContainer}></View>
      </View>
    </ScrollView>
  );
};

export default VDetails;

const styles = StyleSheet.create({
  Rowcontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  product: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
  },
  vendorDetailsContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
