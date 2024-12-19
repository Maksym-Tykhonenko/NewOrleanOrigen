import React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import places from "../constants/places";
import Icons from "./Icons";
import Map from "./Map"

const { height } = Dimensions.get('window');

const Places = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <View style={styles.mapContainer}>
                    <Map next={true} />
                </View>

                <Text style={styles.title}>Timeless Treasures of New Orleans</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        places.map((place, index) => (
                            <View key={index} style={styles.card}>
                                <Image source={place.image} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{place.name}</Text>
                                    <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate('DetailsScreen', {place: place})}>
                                        <Text style={styles.detailsBtnText}>Learn more</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
    },

    back: {
        width: 40,
        height: 40,
        position: 'absolute',
        left: 30,
        top: height * 0.08,
        zIndex: 10
    },

    mapContainer: {
        width: '100%',
        height: height * 0.35,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#8f3cfb',
        overflow: 'hidden',
    },

    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fceb9d',
        textAlign: 'center',
        marginVertical: height * 0.03
    },

    card: {
        width: '100%',
        height: height * 0.26,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 230, 130, 0.5)',
        marginBottom: height * 0.015
    },

    image: {
        width: height * 0.2,
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },

    name: {
        fontSize: 19,
        fontWeight: '800',
        color: '#ffd080',
        textAlign: 'center',
    },

    textContainer: {
        width: '44%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    detailsBtn: {
        width: '100%',
        padding: 7,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7a859'
    },

    detailsBtnText: {
        fontSize: 15,
        fontWeight: '900',
        color: '#915320',
        textAlign: 'center',
    }

});

export default Places;