import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// @ts-ignore
import {Block, Button, NavBar, theme} from 'galio-framework';
import {height, width} from '../constants/utils';
import {base} from '../common/styles';

type props = {
  title?: string;
  children: any;
};
const CustomCard: FunctionComponent<props> = ({title = '', children}) => {
  return (
    <View style={styles.card}>
      {title != '' && (
        <View>
          <Text style={base.text_normal}>{title}</Text>
        </View>
      )}

      {children}
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
      flex:1,
    flexDirection: 'column',
    paddingHorizontal: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BASE / 3,
    // backgroundColor:'#ccc',

    margin: width * 0.02,
    borderRadius: 10,
    borderColor: 'white',
    elevation: 3,
    backgroundColor: 'white',
  },

  inner: {},
});
