import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Animated, 
    Easing 
} from 'react-native';
import { connect } from 'react-redux';

// Local Imports
import { alignCenter, colors } from '../../variables';

// Card
import Card from '../../components/MenuCard';

const Menu = props => {

    const filtersArr = [
        { name: 'All', isActive: true, type: '' },
        { name: 'Hamburguers', isActive: false, type: 'food' },
        { name: 'Pães', isActive: false, type: 'pao' },
        { name: 'Entradas', isActive: false, type: 'ent' },
        { name: 'Bebidas', isActive: false, type: 'ref' },
    ];

    // state
    const [menu, setMenu] = useState([]);
    const [filters, setFilters] = useState(filtersArr);

    // Animation
    const [linePosition] = useState(new Animated.Value(0));

    useEffect(() => {
        setMenu(props.food);
    }, [props.food])

    onFilterHandler = (name, type, i) => {
        setFilters(currentFilters => {
            currentFilters.forEach(cur => cur.isActive = false);
            const el = currentFilters.find(cur => cur.name === name);
            el.isActive = true;
            
            return [...currentFilters];
        });
        
        setMenu(() => {
            if (type === '')
                return props.food;
            
            return props.food.filter(cur => cur.type === type);
        });

        const lineTransition = value => {
            Animated.timing(linePosition, { 
                toValue: value, 
                duration: 300, 
                easing: Easing.bezier(0, 0.75, 0.13, 1)
            }).start();
        };

        switch(type) {
            default:
                lineTransition(0);       
            break;
            case 'food':
                lineTransition(20);       
            break;
            case 'pao':
                lineTransition(40);
            break;
            case 'ent':
                lineTransition(60);        
            break;
            case 'ref':
                lineTransition(80);
            break;
        }
    };

    return (
        <React.Fragment>
            <View style={styles.filter}>
                {
                    filters.map((cur, i) => (
                        <TouchableWithoutFeedback onPress={() => onFilterHandler(cur.name, cur.type, i)} key={cur.name}>
                            <View style={styles.textWrapper}>
                                <Text style={{
                                    color: colors.primaryColor, 
                                    fontFamily: cur.isActive ? 'roboto-slab-bold' : 'roboto-slab-regular'
                                }}>{cur.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
                <Animated.View style={{
                    ...styles.bottomLine, 
                    left: linePosition.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    })
                }}></Animated.View>
            </View>
            <ScrollView style={styles.wrapper}>
                {
                    menu ? menu.map(el => (
                        <Card 
                            key={el._id} 
                            name={el.name}
                            imgPath={el.imgPath} 
                            description={el.description} />
                    )) : <Text style={{...alignCenter}}>Empty</Text>
                }
            </ScrollView>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    filter: {
        width: '100%',
        height: 50,
        backgroundColor: colors.yellow,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'relative'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomLine: {
        position: 'absolute',
        bottom: 0,
        width: '20%',
        height: 3,
        backgroundColor: colors.primaryColor
    }
});

const mapStateToProps = state => {
    return {
        food: state.food
    };
}

export default connect(mapStateToProps)(Menu);