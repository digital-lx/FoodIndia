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
};

const images = [
  'https://siapmart.in/wp-content/uploads/2020/06/slider1.jpg',
  'https://siapmart.in/wp-content/uploads/2020/06/slider2.jpg',
  'https://siapmart.in/wp-content/uploads/2020/06/slider3.jpg',
];

const Banner: FunctionComponent<Props> = ({navigation, route}) => {
  const renderPage = (image: string, index: number) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.navigate('Categories')}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={5000}
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
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
