import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default OrderMenuSection = props => {

    return (
        <View style={{
            ...styles.sectionContentWrapper, 
            flexWrap: props.activeFood.length === 1 ? 'nowrap' : 'wrap'
        }}>
            {
                props.activeFood.map(el => {
                    return (
                        <TouchableOpacity 
                            onPress={() => props.onPress(el, el.type)}
                            key={el._id} 
                            activeOpacity={0.8}>
                            <View style={styles.contentItem}>
                                <LinearGradient 
                                    colors={['rgba(0,0,0, 0.9)', 'transparent']} 
                                    style={styles.gradient} />
                                <ImageBackground 
                                    style={{flex: 1}} 
                                    imageStyle={{borderRadius: 14}} 
                                    source={el.imgPath}/>
                                <Text style={styles.itemText}>{el.name}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    contentItem: {
        width: wp('35%'), 
        height: wp('35%'), 
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        position: 'relative'
    },
    gradient: {
        position: 'absolute',
        top: 0,
        height: '70%',
        width: '100%',
        zIndex: 2,
        borderRadius: 14
    },
    itemText: {
        fontFamily: 'roboto-slab-bold', 
        color: 'white', 
        position: 'absolute', 
        top: 8, 
        left: 12, 
        width: '80%', 
        zIndex: 5
    }
});