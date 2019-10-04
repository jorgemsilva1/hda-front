import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { alignCenter, colors } from '../../variables';

const Profile = props => {

    return (
        <View style={styles.style}>
            <Text>This is the profile view.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    style: alignCenter
});

export default Profile;