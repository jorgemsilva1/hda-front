import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { PanGestureHandler } from 'react-native-gesture-handler';

import { colors, dimensions } from '../variables';

export default SingleOrder = props => {

    const [leftPos] = useState(new Animated.Value(0));
    const [opacity] = useState(new Animated.Value(100));

    _onPanGestureEvent = e => {

        let value = -92;

        if (e.nativeEvent.translationX > 0)
            value = 0;

        Animated.timing(leftPos, { 
            toValue: value, 
            duration: 300, 
            easing: Easing.bezier(0, 0.75, 0.13, 1)
        }).start();
    };

    _onDeleteItem = () => {
        Animated.timing(leftPos, { toValue: 0 }).start();
        props.onPressDelete();
    }
 
    return (
        <PanGestureHandler 
            activeOffsetY={10}
            minDist={20} 
            onGestureEvent={_onPanGestureEvent}>
            <Animated.View style={{
                ...styles.orderWrapper,
                position: 'absolute',
                left: leftPos,
                opacity
            }}>
                <View style={{flex: 1, position: 'relative'}}>
                    <View style={{paddingRight: 20}}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{props.order.food.name}</Text>
                            <Ionicons name='ios-arrow-forward' size={25} color={colors.gray} />
                        </View>
                        <View style={styles.orderDetailsWrapper}>
                            <View>
                                <Text style={{color: colors.gray}}>• {props.order.pao ? props.order.pao.name : 'N/D'}</Text>
                                <Text style={{color: colors.gray}}>• {props.order.ent ? props.order.ent.name : 'N/D'}</Text>
                                <Text style={{color: colors.gray}}>• {props.order.ref ? props.order.ref.name : 'N/D'}</Text>
                            </View>
                            <Text style={{alignSelf: 'flex-end', color: colors.gray}}>{props.total}€</Text>
                        </View>
                        <View style={styles.line}></View>
                    </View>
                    <TouchableOpacity style={styles.trash} onPress={_onDeleteItem} activeOpacity={0.7}>
                        <Ionicons name='ios-trash' size={35} color='white' />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    orderWrapper: {
        width: '100%',
        paddingLeft: 20,
    },
    titleWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20, 
        fontFamily: 'roboto-slab-bold'
    },
    orderDetailsWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%'
    },
    line: { 
        marginTop: 20,
        backgroundColor: colors.lightGray, 
        height: 1,
        width: '100%'
    },
    trash: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.redAlert, 
        height: 92, 
        width: 92, 
        position: 'absolute', 
        top: 0, 
        right: -92
    }
});