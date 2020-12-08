/*TODO:Create Vendor Card
 * VendorCard
 *  - name
 *  - address
 *  - image
 *  - Deals in
 */
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {height, width} from '../constants/utils';
type props = {
  name: string;
  address: string;
  image: string;
  deals: Array<string>;
};
const Vendor: FunctionComponent<props> = ({name, address, image, deals}) => {
  return (
    <View style={styles.parent}>
      <Text>Vendor Card</Text>
    </View>
  );
};

export default Vendor;

const styles = StyleSheet.create({
  parent: {
    width: width / 0.9,
    height: height / 2.6,
    backgroundColor: '#ccc',
  },
});
