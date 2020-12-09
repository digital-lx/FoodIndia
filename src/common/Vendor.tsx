/*TODO:Create Vendor Card
 * VendorCard
 *  - name
 *  - address
 *  - image
 *  - Deals in
 */
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {height, width} from '../constants/utils';
import Colors from '../constants/Theme';

type props = {
  name: string;
  address: string;
  image: Array<string>;
  deals: Array<string>;
};
const noImageURL =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
const Vendor: FunctionComponent<props> = ({name, address, image, deals}) => {
  return (
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
        <Text style={{flex: 0.1, fontSize: 20}}>{name}</Text>
        <Text style={{fontSize: 13, flex: 0.7, color: Colors.COLORS.ICON}}>
          {address}
        </Text>
        <View style={{flex: 0.2, flexDirection: 'row'}}>
          <Text>Deals In{'  '}</Text>
          {deals.map((deal, index) => (
            <View>
              {index < 3 && (
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
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
  );
};

export default Vendor;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 8,
    margin: width * 0.02,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 4,
  },
  Image: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    // borderRadius:10,
    // borderWidth:10,
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
