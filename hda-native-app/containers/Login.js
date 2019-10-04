import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Button, 
    Alert, 
    Text,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { colors, alignCenter } from '../variables';

import LoginInput from '../components/LoginInput';

const logo = require('../assets/logo.png');

const Login = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.main} onPress={Keyboard.dismiss}>
            <View style={styles.holder}>
                <Image style={{alignSelf: 'center'}} source={logo}/>
                <View style={styles.form}>
                    <LoginInput 
                        value={username} 
                        placeholder="Username" 
                        onSubmitEditing={e => console.log(username)} 
                        onChangeText={enteredText => setUsername(enteredText)} />
                    <LoginInput 
                        value={password} 
                        placeholder="Password" 
                        onSubmitEditing={e => console.log(password)} 
                        onChangeText={enteredText => setPassword(enteredText)} />
                    <View style={styles.btnHolder}>
                        {/* <Button color={colors.primaryColor} title="Register" /> */}
                        <Button 
                            style={{opacity: 0.5}} 
                            title="Login" 
                            onPress={() => props.navigation.navigate('Home')}/>
                    </View>    
                </View>
                <Text style={styles.bottomText}>Hamburgueria da Praia © 2019 - Reserved Application</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.backgroundColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holder: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-around'
    },
    form: {
        width: '80%',
        borderColor: '#eeed',
        borderWidth: 1,
        padding: 16,
        alignSelf: 'center'
    },
    btnHolder: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    bottomText: {
        fontSize: 12, 
        alignSelf: 'center', 
        color: colors.gray
    }
});

export default Login;