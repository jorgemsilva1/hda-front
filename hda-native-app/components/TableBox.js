import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import { alignCenter, colors } from '../variables';

export default TableBox = props => {
    
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
            <View style={{
                ...styles.tableBox, 
                opacity: props.isActive ? 1 : 0.8
            }}>
                <Ionicons name="ios-beer" size={25} color={props.isActive ? colors.yellow : 'white'} />
                <Text style={{
                    ...styles.tableNumber, 
                    color: props.isActive ? colors.yellow : 'white'
                }}>{props.tableNumber}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tableBox: {
        height: wp('17%'),
        width: wp('17%'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
        shadowColor: "#000",
        backgroundColor: colors.primaryColor,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.07,
        shadowRadius: 6.68,
        elevation: 11,
        position: 'relative',
        marginBottom: 20
    },
    tableNumber: {
        position: 'absolute', 
        bottom: 8, 
        right: 8, 
        fontSize: 14, 
        color: 'white'
    }
});