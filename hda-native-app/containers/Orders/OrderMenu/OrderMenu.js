import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import Accordion from 'react-native-collapsible/Accordion';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OrderMenuSection from '../../../components/OrderMenuSection';
import OrderBill from '../../../components/OrderBill';
import HeaderButton from './HeaderButton';

import { setOrderItem } from '../../../stores/actions/order';

import { colors } from '../../../variables';
import SECTIONS from '../../../api/sections';

const OrderMenu = props => {

    const [tabSections, setTabSections] = useState([]);
    const [activeSections, setActiveSections] = useState([0]);
    const [showOrder, setShowOrder] = useState(false);

    useEffect(() => {
        setTabSections(SECTIONS);
    }, [SECTIONS]);
    
    _renderHeader = section => {
        return (
            <View style={styles.sectionHeader}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'roboto-slab-bold', fontSize: 30}}>{ section.name }</Text>
                    {
                        props.order[section.type] ? (
                            <Text style={styles.headerSubtitle}>-  ({ props.order[section.type].name })</Text>
                        ) : null
                    }
                </View>
                <Ionicons name='ios-arrow-down' size={20} color={colors.gray} />
            </View>
        );
    };

    _onChooseItem = (el, type) => {
        props.setOrderItem(el, type);

        setActiveSections(currentSections => {
            if (tabSections[activeSections[0]].type === 'ent') {
                setShowOrder(true);
                return [];
            }
            
            return [currentSections[0] + 1];
        });
    }

    _renderContent = section => {

        const activeFood = props.food.filter(el => {
            if (activeSections.length > 0) 
                return el.type === tabSections[activeSections[0]].type;
            
            return [];
        })

        return <OrderMenuSection onPress={_onChooseItem} activeFood={activeFood} />
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
            { showOrder && props.order.food !== null ? <OrderBill billArr={Object.entries(props.order)} /> : null }
        </View>
    );
};

OrderMenu.navigationOptions = {
    headerRight: (
        <View style={{paddingRight: 5}}>
            <HeaderButton />
        </View>
    )
}

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
    }
});

const mapStateToProps = state => {
    return {
        food: state.food,
        tables: state.tables,
        order: state.order
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setOrderItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderMenu);