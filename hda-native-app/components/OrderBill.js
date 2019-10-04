import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from '../variables';

export default OrderBill = props => {

    return (
        <View style={styles.wrapper}>
            <View style={styles.listWrapper}>
                {
                    props.billArr.map((bill, i) => {
                        if (bill)
                            return (
                                <View key={i} style={styles.billWrapper}>
                                    <Text style={{fontFamily: 'roboto-slab-regular'}}>{bill[1] ? bill[1].name : 'N/F'}</Text>
                                    <View style={styles.btnWrapper}>
                                        <Button disabled={bill[1] ? false : true} title="Alterar" color={colors.gray} />  
                                        <Button disabled={bill[1] ? false : true} title="Editar" color='#a0a0a0' />  
                                        <Button disabled={bill[1] ? false : true} title="Apagar" color="red" />  
                                    </View>
                                </View>
                            )
                    })
                }
            </View>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
                {/* <Text style={{fontFamily: 'roboto-slab-bold', fontSize: 24}}>8.60€</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-end', 
        paddingHorizontal: wp('10%'), 
        marginBottom: 20
    },
    listWrapper: {
        borderBottomWidth: 1, 
        borderBottomColor: colors.lightGray, 
        paddingBottom: 8, 
        marginBottom: 8
    },
    billWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    btnWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    }
});