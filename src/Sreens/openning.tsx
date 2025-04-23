import React from 'react';
import {View, Text,StyleSheet,Image,TouchableOpacity} from 'react-native';

export default function OpeningScreen({navigation}:any) {
    return (
        
        <View style={styles.container}>
            <Image source={require('../Asset/openning.png')} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    image:{
        width:300,
        height:300,
        resizeMode:'contain',
    },
    button:{
        marginTop:30,
        backgroundColor:'#007BFF',
        padding:15,
        borderRadius:10
    },
    buttonText:{
        color:'#fff',
        fontSize:18,
    }

})