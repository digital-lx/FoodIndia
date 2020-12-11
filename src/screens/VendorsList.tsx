/* TODO:
 * List of vendors
 * - VendorCard
 * */

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  View,
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

import Select from '../common/Select';
import Theme from '../constants/Theme';

import materialTheme from '../constants/Theme';
// vendor
import Vendor from '../common/Vendor';
import sampleData from '../constants/sampleData';

const {width, height} = Dimensions.get('window');

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
  vendor?: any;
  isLoading?: boolean;
  error?: string;
  currentPage?: string;
  sortValue?: any;
  scrollPosition?: number;
};

const VendorsList: FunctionComponent<Props> = ({
  navigation,
  route,
  vendor,

  isLoading = false,
  error,
  currentPage = '1',
  scrollPosition = 0,
}) => {
  const [load, setLoad] = useState(isLoading);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    // console.log('vendor is ', route.params.vendor);
  }, []);

  return (
    <Vendor
      navigation={navigation}
      route={route}
      data={sampleData.vendors}
      onPress={(id) =>
        navigation.navigate('vendordetails', {
          vendor: sampleData.vendors[id],
        })
      }
    />
  );
};

export default VendorsList;

const styles = StyleSheet.create({});
