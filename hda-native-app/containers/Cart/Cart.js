import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import { colors } from '../../variables';
import tables from '../../api/tables';

const Cart = props => {

    const [tabSections, setTabSections] = useState([]);
    const [activeSections, setActiveSections] = useState([0]);

    useEffect(() => {
        
        const tablesSections = tables.map(table => (
            { 
                _id: uuidv4(), 
                tableNumber: table.tableNumber, 
                total: table.finalTotal
            }
        )); 

        setTabSections(tablesSections);
    }, []);
    
    _renderHeader = section => {
        return (
            <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'roboto-slab-bold', fontSize: 30}}>Mesa { section.tableNumber }</Text>
                </View>
                <Ionicons name='ios-arrow-down' size={20} color={colors.gray} />
            </View>
        );
    };

    _onChooseItem = (el, type) => {

        setActiveSections(currentSections => {
            if (tabSections[activeSections[0]].tableNumber === tabSections.length)
                return [];
            
            return [currentSections[0] + 1];
        });
    }

    _renderContent = section => {

        const activeFood = props.food.filter(el => {
            if (activeSections.length > 0) 
                return el.type === tabSections[activeSections[0]].type;
            
            return [];
        })

        const sectionTable = props.cart.allOrders.find(el => el.tableNumber === section.tableNumber);

        if (sectionTable) {
            return (
                <View>
                    {
                        sectionTable.orders.map(t => {
                            return (
                                <View key={t._id} style={{paddingRight: 20}}>
                                    <View style={styles.titleWrapper}>
                                        <Text style={styles.title}>{t.food.name}</Text>
                                        <Text style={{color: colors.gray, fontSize: 16}}>{t.total}€</Text>
                                    </View>
                                    <View style={styles.orderDetailsWrapper}>
                                        <Text style={{color: colors.gray}}>• {t.pao ? t.pao.name : 'N/D'}</Text>
                                        <Text style={{color: colors.gray}}>• {t.ent ? t.ent.name : 'N/D'}</Text>
                                        <Text style={{color: colors.gray}}>• {t.ref ? t.ref.name : 'N/D'}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                        <Text style={{...styles.title, fontSize: 17}}>Total: {sectionTable.finalTotal}€</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.finishOrder}>
                        <Text style={{color: 'white'}}>Finish Order</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.menuWrapper}>
                <Accordion 
                    sections={tabSections}
                    activeSections={activeSections}
                    touchableComponent={TouchableOpacity}
                    underlayColor="transparent"
                    sectionContainerStyle={styles.sectionStyling}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={actSess => setActiveSections(actSess)}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    menuWrapper: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: wp('10%'),
    },
    sectionHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20
    },
    sectionStyling: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        marginBottom: 20
    },
    headerSubtitle: {
        color: colors.gray, 
        marginTop: 5, 
        marginLeft: 5, 
        alignSelf: 'center', 
        fontFamily: 'roboto-slab-regular'
    },
    titleWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 20, 
        fontFamily: 'roboto-slab-bold'
    },
    orderDetailsWrapper: {
        justifyContent: 'space-between', 
        width: '100%',
        paddingVertical: 8
    },
    finishOrder: {
        width: '100%',
        height: 40,
        backgroundColor: colors.activeGreen,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 10
    }
});

const mapStateToProps = state => {
    return {
        food: state.food,
        tables: state.tables,
        order: state.order,
        cart: state.cart
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);