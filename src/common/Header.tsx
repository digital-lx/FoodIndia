// @ts-ignore
import {Block, Button, Input, NavBar, Text, theme} from 'galio-framework';
import {
  Dimensions,
  EventEmitter,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import CartService from '../Services/CartService';
import Icon from './Icon';
import NotificationService from '../Services/notification';
// import Input from './Input';
// import Tabs from './Tabs';
import argonTheme from '../constants/Theme';
import messaging from '@react-native-firebase/messaging';
import {withNavigation} from '@react-navigation/compat';

const notification_service = new NotificationService();
const service = new CartService();
const {height, width} = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' &&
  (height === 812 || width === 812 || height === 896 || width === 896);

type ButtonProps = {
  isWhite?: boolean;
  style?: any;
  navigation: any;
};

const BellButton: FunctionComponent<ButtonProps> = ({
  isWhite,
  style,
  navigation,
}) => {
  const [count, setCount] = useState(0);
  const getCount = async () => {
    const notifications = await notification_service.getNotifications();
    setCount(notifications !== null ? notifications.length : 0);
  };

  useEffect(() => {
    getCount();
  }, []);
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => {
        setCount(0);
        navigation.navigate('Notification');
      }}>
      <Icon
        family={'Feather'}
        size={18}
        name="bell"
        color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
      {count > 0 ? <Block middle style={styles.notify} /> : null}
    </TouchableOpacity>
  );
};

const BasketButton: FunctionComponent<ButtonProps> = ({
  isWhite,
  style,
  navigation,
}) => {
  const [count, setCount] = useState(0);
  const getCount = async () => {
    const cart = await service.get();
    setCount(cart !== null ? cart.length : 0);
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.navigate('Cart')}>
      <Icon
        family="AntDesign"
        size={18}
        name="shoppingcart"
        color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
      {count > 0 ? (
        <Block middle style={styles.basketCount}>
          <Text size={10} bold color={argonTheme.COLORS.WHITE}>
            {count}
          </Text>
        </Block>
      ) : null}
    </TouchableOpacity>
  );
};

const SearchButton: FunctionComponent<ButtonProps> = ({
  isWhite,
  style,
  navigation,
}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Search')}>
    <Icon
      size={18}
      family="Feather"
      name="search"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

type props = {
  back?: boolean;
  navigation: any;
  white?: boolean;
  title: string;
  transparent?: boolean;
  bgColor?: any;
  iconColor?: string;
  titleColor?: string;
  scene: any;
  image?: boolean;
  search?: boolean;
};

class Header extends React.Component<props> {
  handleLeftPress = () => {
    const {back, navigation, title} = this.props;
    if (title == 'Order Details')
      return back
        ? navigation.reset({
            index: 0,
            routes: [{name: 'App'}],
          })
        : null;
    return back ? navigation.goBack() : null;
  };
  renderRight = () => {
    // const { routeName } = navigation.state;
    const {navigation, white, title} = this.props;
    if (
      title === 'Home' ||
      title === 'Categories' ||
      title === 'Product List' ||
      title === 'Product Details'
    ) {
      return [
        <SearchButton
          navigation={navigation}
          isWhite={false}
          key={'home-search'}
        />,
        <BellButton key="chat-title" navigation={navigation} isWhite={false} />,
        <BasketButton
          key="basket-title"
          navigation={navigation}
          isWhite={false}
        />,
      ];
    }
  };

  // renderOptions = () => {
  //   const { navigation, optionLeft, optionRight } = this.props;
  //
  //   return (
  //     <Block row style={styles.options}>
  //       <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Beauty')}>
  //         <Block row middle>
  //           <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
  //           <Text style={{ fontFamily: 'open-sans-regular' }} size={16}  style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
  //         </Block>
  //       </Button>
  //       <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Fashion')}>
  //         <Block row middle>
  //           <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
  //           <Text style={{ fontFamily: 'open-sans-regular' }} size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
  //         </Block>
  //       </Button>
  //     </Block>
  //   );
  // }
  // renderTabs = () => {
  //   const { tabs, tabIndex, navigation } = this.props;
  //   const defaultTab = tabs && tabs[0] && tabs[0].id;
  //
  //   if (!tabs) return null;
  //
  //   return (
  //     <Tabs
  //       data={tabs || []}
  //       initialIndex={tabIndex || defaultTab}
  //       onChange={id => navigation.setParams({ tabId: id })} />
  //   )
  // }

  render() {
    const {
      back,
      navigation,
      white,
      title,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      image,
    } = this.props;

    // @ts-ignore
    const noShadow: Array<string> = [
      'Search',
      'Categories',
      'Deals',
      'Pro',
      'Profile',
    ].includes(title);

    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? {backgroundColor: 'rgba(0,0,0,0)'} : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && {backgroundColor: bgColor}];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title === 'Home' ? 'SIAPMART' : title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{alignItems: 'center', flex: 1.3}}
          onLeftPress={this.handleLeftPress}
          left={
            back ? (
              <Icon
                name={back ? 'chevron-left' : ''}
                family="entypo"
                size={back ? 24 : 24}
                onPress={this.handleLeftPress}
                color={
                  iconColor ||
                  (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)
                }
                style={{marginTop: 2}}
              />
            ) : image ? (
              <Image
                source={require('../assets/logo_sia.png')}
                style={{width: width / 5, height: 40, resizeMode: 'contain'}}
              />
            ) : null
          }
          leftStyle={{paddingVertical: 2, flex: back ? 0.3 : 0}}
          titleStyle={[
            styles.title,
            {color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER']},
            titleColor && {color: titleColor},
          ]}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    // paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 10,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER,
  },
  basketCount: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 25,
    height: theme.SIZES.BASE + 1,
    width: theme.SIZES.BASE + 1,
    position: 'absolute',
    top: 1,
    right: 2,
  },
});

export default Header;
