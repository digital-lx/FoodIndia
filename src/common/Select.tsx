import React, {FunctionComponent, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// @ts-ignore
import {Block, Text, Icon, theme} from 'galio-framework';
import materialTheme from '../constants/Theme';

type props = {
    onSelect: (value: any) => void;
    value: any,
    options: Array<any>,
    disabled: boolean,
    containerStyle:any
}

const Select: FunctionComponent<props> = ({value, onSelect, options, disabled,containerStyle}) => {

    return (
        <DropDownPicker
            items={options}
            defaultValue={value.value}
            containerStyle={containerStyle}
            style={styles.qty}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => onSelect(item)}
            disabled={disabled}
        />
    )
}

export default Select;

const styles = StyleSheet.create({
    qty: {
        backgroundColor: materialTheme.COLORS.SWITCH_OFF,
        paddingHorizontal: theme.SIZES.BASE,
        borderRadius: 3,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 1,
        borderWidth: 1,
    },
    dropdown: {
        marginTop: theme.SIZES.BASE / 2,
        marginLeft: -theme.SIZES.BASE,
        width: theme.SIZES.BASE * 6,
    },
});