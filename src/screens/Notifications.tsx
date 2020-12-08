/*TODO:
 *   1.Copy screen from template(DONE)
 *   2.Modify according to typescript(DONE)
 *   3.Add/remove features to complete the screen
 *   4.Create Skeleton
 *   5.Notifications - virtualized notification list
 *       - send notificaiton
 *       - order created
 *       - or order placed from server
 *       - navigate to notification screen
 */

// @ts-ignore
import {Block, Button, NavBar, Text, theme} from 'galio-framework';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Service from '../Services/notification';
import {width} from '../constants/utils';

type Props = {data?: any; navigation?: any; route?: any; isLoading?: boolean};
const service = new Service();
type OrderProps = {
  item: any;
  list: any;
  onPress: () => {};
};
const NotificationItem: FunctionComponent<OrderProps> = ({
  item,
  list = [],
  onPress,
}) => {
  const orderUrl =
    'https://cdn.iconscout.com/icon/premium/png-512-thumb/ringing-bell-621024.png';

  return (
    <Block
      row={true}
      card
      style={[notificationStyles.parent, notificationStyles.shadow]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Block
          flex
          style={[
            notificationStyles.imageContainer,
            notificationStyles.shadow,
          ]}>
          <Image source={{uri: orderUrl}} style={notificationStyles.image} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPress}>
        <Block flex style={notificationStyles.notificationDescription}>
          <Text size={15} style={notificationStyles.notificationTitle}>
            {item.data.title ? item.data.title : 'title'}
          </Text>
          <Text size={12} style={notificationStyles.notificationTitle}>
            {item.data.body ? item.data.body : 'body'}
          </Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

const notificationStyles = StyleSheet.create({
  parent: {
    width: '100%',
    backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 60,
    marginBottom: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BASE / 2,
  },
  notificationTitle: {
    flex: 1,
    flexWrap: 'wrap',
    maxHeight: 30,
    marginBottom: theme.SIZES.BASE / 2,
    width: width / 2,
  },
  notificationDescription: {
    padding: theme.SIZES.BASE / 2,
    flex: 3,
  },
  imageContainer: {
    elevation: 1,
    flex: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 4,
    height: 50,
    width: '80%',
    resizeMode: 'contain',
    marginTop: theme.SIZES.BASE / 1.5,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

const Notification: FunctionComponent<Props> = ({
  data = [],
  navigation,
  route,
  isLoading,
}) => {
  const [list, setList] = useState(data);
  const [load, setLoad] = useState(data);
  const getData = async () => {
    setLoad(true);
    //get notifications
    const notifications = await service.getNotifications();
    if (notifications) setList(notifications);
    console.log('notifications', notifications);
    setLoad(false);
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const renderNotifications = ({item}: any) => {
    return (
      <NotificationItem
        item={item}
        list={list}
        onPress={() => {
          // remove notification from asyncstorage and state
          service.updateNotifications(item, false);
          let New = list.filter(
            (notification: any) => notification.messageId !== item.messageId,
          );
          setList(New);
          // navigate to MyOrders
          return navigation.navigate('MyOrders');
        }}
      />
    );
  };
  return (
    <Block style={{marginTop: theme.SIZES.BASE, flex: 1}}>
      <FlatList
        // ref={ScrollRef}
        style={{
          marginBottom: theme.SIZES.BASE,
          paddingHorizontal: theme.SIZES.BASE / 2,
          width: '100%',
        }}
        // onScroll={handleScroll}
        data={list}
        horizontal={false}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => `${index}-${item.messageId}`}
        renderItem={({item}) => renderNotifications({item})}
        numColumns={1}
        ListEmptyComponent={
          <Text
            bold
            style={{
              marginHorizontal: theme.SIZES.BASE,
              marginVertical: theme.SIZES.BASE,
              alignSelf: 'center',
            }}
            size={theme.SIZES.BASE * 1.5}>
            No Notifications
          </Text>
        }
      />
    </Block>
  );
};

export default Notification;
