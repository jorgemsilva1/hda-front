import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setActiveTable, _onDeleteSinglerOrder } from '../../stores/actions/tables';
import { checkoutOrder } from '../../stores/actions/cart';
import { clearOrder } from '../../stores/actions/order';

import TableBox from '../../components/TableBox';
import SingleOrder from '../../components/SingleOrder';

import { colors, intArr } from '../../variables';

const Orders = props => {

    const [finalTotal, setFinalTotal] = useState(0);
    const activeTable =  props.tables.allTables[props.tables.activeTableIndex];

    onNavigateToOrderMenu = () => {
        if (props.tables.activeTableIndex >= 0)
            return props.navigation.navigate('OrderMenu');
    };

    useEffect(() => {
        // set Checkout price
        setFinalTotal(activeTable.finalTotal);
    }, [props.tables]);

    return (
        <React.Fragment>
            <View style={styles.buttonLabel} >
                <Button 
                    disabled={activeTable.paymentMode}
                    onPress={onNavigateToOrderMenu}
                    title={activeTable.paymentMode ? "Processing payment..." : "Add Order"} 
                    color={colors.primaryColor} />
            </View>
            <View style={styles.holder}>
                <View style={styles.sideBar}>
                    <Text style={styles.header}>Tables</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        {
                            props.tables.allTables.map((table, i) => (
                                <TableBox
                                    onPress={() => props.setActiveTable(i)}
                                    isActive={table.isActive} 
                                    key={table.tableNumber} 
                                    tableNumber={table.tableNumber} />
                                ))
                        }
                    </ScrollView>
                </View>
                <View style={{position: 'relative', width: '70%'}}>
                    {
                        activeTable && activeTable.orders ? 
                        (
                            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                                {
                                    activeTable.orders.map((cur, i) => {

                                        return (
                                            <View key={i} style={{
                                                marginTop: i === 0 ? 20 : 0, 
                                                marginBottom: 30, 
                                                height: 80, 
                                                position: 'relative'
                                            }}>
                                                <SingleOrder
                                                    total={cur.total} 
                                                    onPressDelete={() => props._onDeleteSinglerOrder(cur._id)}
                                                    order={cur} 
                                                    key={i} />
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        ) : null
                    }
                    <TouchableOpacity 
                        onPress={() => props.checkoutOrder(activeTable.tableNumber, activeTable.orders, activeTable.finalTotal)} 
                        disabled={finalTotal === 0 || activeTable.paymentMode} 
                        activeOpacity={0.8} style={styles.checkoutBtnWrapper}>
                        <Ionicons 
                            name='ios-cart' 
                            size={16} 
                            color={finalTotal === 0 || activeTable.paymentMode ? "rgba(255, 255, 255, 0.3)" : 'white'} />                        
                        <Text 
                            style={{ 
                                marginLeft: 5, 
                                color: finalTotal === 0 || activeTable.paymentMode ? "rgba(255, 255, 255, 0.3)" : 'white', 
                                fontSize: 18 
                            }}>
                            {activeTable.paymentMode ? 'Processing Payment...' : intArr.includes(finalTotal) ? `Checkout - ${finalTotal}.00€` : `Checkout - ${Math.floor(finalTotal * 100) / 100}€`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    modal: {
        zIndex: 20, 
        width: '100%', 
        height: '100%', 
        backgroundColor: colors.yellow, 
        position: 'absolute', 
        left: 0,
        borderTopColor: colors.primaryColor,
        borderTopWidth: 1
    },
    buttonLabel: {
        height: 50, 
        backgroundColor: colors.yellow,
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingHorizontal: 10
    },
    sideBar: {
        width: '30%',
        height: '100%',
        marginVertical: 20,
        borderRightWidth: 1,
        borderRightColor: colors.lightGray
    },
    header: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    },
    scrollView: {
        flex: 1,
        paddingVertical: 20,
    },
    checkoutBtnWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 50, 
        width: '100%',
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

const mapStateToProps = state => {
    return {
        tables: state.tables
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setActiveTable,
        _onDeleteSinglerOrder,
        clearOrder,
        checkoutOrder
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);