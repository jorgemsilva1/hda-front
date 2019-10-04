import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { alignCenter, colors } from '../variables';

// images
const batataDoce = require('../assets/batata-doce.jpg');

const MenuCard = props => {

    return (
        <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.card}>
                <LinearGradient colors={['rgba(0,0,0, 0.9)', 'transparent']} style={styles.gradient}></LinearGradient>
                <ImageBackground source={props.imgPath} imageStyle={{borderRadius: 12}} style={styles.background}></ImageBackground>
                <View style={styles.textHolder}>
                    <Text style={{color: 'white', fontFamily: 'roboto-slab-bold', fontSize: 24}}>{props.name}</Text>
                    <Text style={{color: 'white', width: '75%'}}>{props.description}</Text>
                </View>
                <View style={styles.line}></View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 150,
        position: 'relative',
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    background: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        resizeMode: 'cover'
    },
    line: {
        position: 'absolute',
        left: 0,
        bottom: -20,
        width: '100%',
        height: 1,
        backgroundColor: colors.lightGray
    },
    gradient: {
        position: 'absolute',
        top: 0,
        height: '70%',
        width: '100%',
        zIndex: 2,
        borderRadius: 12
    },
    textHolder: {
        position: 'absolute',
        top: 8,
        left: 16,
        zIndex: 3,
        width: '100%'
    }
});

export default MenuCard;