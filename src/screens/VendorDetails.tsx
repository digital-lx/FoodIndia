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
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// @ts-ignore
import {Block, Button, Text, theme} from 'galio-framework';
import {HeaderHeight, iPhoneX} from '../constants/utils';
import React, {FunctionComponent, useEffect, useState} from 'react';
import Colors from '../constants/Theme';

import materialTheme from '../constants/Theme';
import {BaseRouter} from '@react-navigation/native';

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
        <Text style={{flex: 1, fontSize: 23}}>
          {route.params.vendor.data.name}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            color: Colors.COLORS.ICON,
            textAlign: 'center',
          }}>
          {route.params.vendor.data.Address}
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 18}}>Deals In{'  '}</Text>
          {route.params.vendor.data.Deals_in.map(
            (deal: string, index: number) => (
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16,paddingTop:3}}>
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
            <Text style={{fontSize: 18}}>Mobile Number </Text>
            {route.params.vendor.data.phone.map(
              (phone: string, index: number) => (
                <View>
                  <Text style={{fontSize: 16, paddingLeft: 10, paddingTop: 2}}>
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
            <Text style={{fontSize: 18}}>Telephone Number</Text>
          </View>
          <View style={{flex: 0.6, flexDirection: 'column'}}>
            {route.params.vendor.data.contacts.map((phone: any) => (
              <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',}}>
                <Text style={{fontSize: 16, marginRight: 10}}>
                  {phone?.name}
                </Text>
                <Text style={{fontSize: 16}}>
                  {phone?.phone_number}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Email  */}

        <View style={{flex: 1, flexDirection: 'row'}}>
          {route.params.vendor.data.email != 'N/A' && (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>Email</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={{fontSize: 16, flex: 1}}>
                  {route.params.vendor.data.email}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Website */}

        <View style={{flex: 1, flexDirection: 'row'}}>
          {route.params.vendor.data.website != 'N/A' && (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>Website</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text style={{fontSize: 16, flex: 1}}>
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
  product: {
    flex: 1,
    flexDirection: 'column',
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
