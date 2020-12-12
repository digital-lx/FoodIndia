import { Platform, StatusBar, Dimensions } from 'react-native';
// @ts-ignore
import { theme } from 'galio-framework';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const StatusHeight = StatusBar.currentHeight;
// @ts-ignore
export const HeaderHeight = (theme.SIZES.BASE * 4 + StatusHeight);
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);