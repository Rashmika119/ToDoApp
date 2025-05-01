import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function OpeningScreen({ navigation }: any) {
    useFocusEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home')
        }, 3000);
    }
    )
    return (

        <View style={styles.container}>
            
            <LottieView
                source={require('../Asset/loggin.json')}
                autoPlay
                loop
                style={styles.image}
            ></LottieView>
            <LottieView
                source={require('../Asset/load.json')}
                autoPlay
                loop
                style={styles.load}
            ></LottieView>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    load: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },


})