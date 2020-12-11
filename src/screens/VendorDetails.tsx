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
  View,
} from 'react-native';
// @ts-ignore
import {Block, Button, Text, theme} from 'galio-framework';
import {HeaderHeight, iPhoneX} from '../constants/utils';
import React, {FunctionComponent, useEffect, useState} from 'react';

import {BaseRouter} from '@react-navigation/native';
import Colors from '../constants/Theme';
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

  useEffect(() => {
    console.log(route.params.vendor);
  });
  return (
    <View style={styles.product}>
      {/* Image view  */}
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
      {/* Vendor Detail View  */}
      <View style={styles.vendorDetailsContainer}>
        <Text style={[base.text_large, {flex: 1}]}>
          {route.params.vendor.data.name}
        </Text>
        <Text
          style={[
            base.text_normal,
            {
              flex: 1,
              color: Colors.COLORS.ICON,
              textAlign: 'center',
            },
          ]}>
          {route.params.vendor.data.Address}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={base.text_normal}>Deals In{'  '}</Text>
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
        {/* mobile contact  */}
        {route.params.vendor.data.phone[0] != 'N/A' && (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={base.text_normal}>Mobile Number </Text>
            {route.params.vendor.data.phone.map(
              (phone: string, index: number) => (
                <View>
                  <Text
                    style={[base.text_small, {paddingLeft: 10, paddingTop: 2}]}>
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.4, alignItems: 'center'}}>
            <Text style={base.text_normal}>Telephone Number</Text>
          </View>
          <View style={{flex: 0.6, flexDirection: 'column'}}>
            {route.params.vendor.data.contacts.map((phone: any) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
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
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={base.text_normal}>Email</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={[base.text_small, {flex: 1}]}>
                  {route.params.vendor.data.email}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Website */}

        <View style={styles.Rowcontainer}>
          {route.params.vendor.data.website != 'N/A' && (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={base.text_normal}>Website</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={[base.text_small, {flex: 1}]}>
                  {route.params.vendor.data.website}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
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
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imageView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
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
