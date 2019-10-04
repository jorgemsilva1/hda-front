import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const LoginInput = props => {

    return (
        <React.Fragment>
            <TextInput 
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardAppearance="dark" 
                returnKeyType="done"
                onSubmitEditing={props.onSubmitEditing} 
                autoCorrect 
                style={styles.input} 
                placeholder={props.placeholder} />    
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: 'rgba(0,0,0, 0.3)',
        borderBottomWidth: 1,
        padding: 10
    },
});

export default LoginInput;