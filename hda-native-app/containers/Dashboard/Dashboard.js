import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import { alignCenter, colors } from '../../variables';

const Dashboard = props => {

    return (
        <React.Fragment>
            <StatusBar barStyle="light-content"/>
            <View style={styles.style}>
                <Text>This is the Dashboard view.</Text>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    style: alignCenter
});

export default Dashboard;