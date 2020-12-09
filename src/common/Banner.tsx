import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FunctionComponent} from 'react';

import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;

type Props = {
  navigation?: any;
  route?: any;
  images: Array<string>;
  styl?: any;
};

const Banner: FunctionComponent<Props> = ({
  navigation,
  route,
  images,
  styl = {width: BannerWidth, height: BannerHeight},
}) => {
  const renderPage = (image: string, index: number) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        style={{backgroundColor: '#fff'}}
        onPress={() => navigation.navigate('Categories')}>
        <Image style={styl} source={{uri: image}} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={3000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {images.map((image, index) => renderPage(image, index))}
      </Carousel>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
