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

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#54D83A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
    }

})