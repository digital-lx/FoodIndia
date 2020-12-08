import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
// @ts-ignore
import {Block, theme} from 'galio-framework';
import {HeaderHeight, height} from '../constants/utils';
import React, {useEffect} from 'react';

// import ImageZoom from 'react-native-image-pan-zoom';
// import ImageViewer from 'react-native-image-zoom-viewer';
import PhotoView from 'react-native-photo-view';

const {width} = Dimensions.get('window');

export default class Gallery extends React.Component {
  scrollX = new Animated.Value(0);
  state = {
    images2: [],
  };

  renderGallery = () => {
    const {route}: any = this.props;
    // const { params } = navigation && navigation.state;
    const {images, index} = route.params;

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0.2}
        scrollEventThrottle={12}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: this.scrollX}}},
        ])}>
        {images.map((image: string, key: any) => (
          <PhotoView
            source={{uri: image}}
            minimumZoomScale={1}
            maximumZoomScale={4}
            fadeDuration={300}
            androidScaleType="fitCenter"
            androidZoomTransitionDuration={300}
            onLoad={() => console.log('Image loaded!')}
            style={{
              width: width,
              height: height / 1.2,
            }}
          />
        ))}
      </ScrollView>
    );
  };

  renderProgress = () => {
    const {route}: any = this.props;
    // const { params } = navigation && navigation.state;
    const {images, index} = route.params;

    const position = Animated.divide(this.scrollX, width);

    return (
      <Block row>
        {images.map((_: any, i: any) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={i} style={[styles.dots, {opacity, width}]} />
          );
        })}
      </Block>
    );
  };

  componentDidMount() {
    const {route}: any = this.props;

    const {images, index} = route.params;
    const x: Array<any> = [];
    images.map((image: string, key: string) => {
      x.push({
        url: image,
      });
    });
    this.setState({images2: x});
  }

  render() {
    return (
      <Block flex style={styles.gallery}>
        <StatusBar backgroundColor={'#000'} />
        <Block flex middle style={{position: 'relative'}}>
          <Block style={styles.galleryImage}>{this.renderGallery()}</Block>
          <Block center style={styles.dotsContainer}>
            {this.renderProgress()}
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  gallery: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  galleryImage: {
    width: width,
    height: 'auto',
  },
  dots: {
    height: 8,
    margin: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: theme.SIZES.BASE * 2,
    left: 0,
    right: 0,
  },
});
