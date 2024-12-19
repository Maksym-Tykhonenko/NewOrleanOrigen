import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const FullStory = ({ story }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>{story.title}</Text>

                <ScrollView style={{width: '100%'}}>

                    <Image source={story.image} style={styles.image} />

                    <Text style={styles.subTitle}>Description and History</Text>

                    <Text style={styles.description}>{story.description}</Text>

                    <Text style={styles.subTitle}>Why it’s Interesting for Historians</Text>

                    <Text style={styles.description}>{story.interesting}</Text>

                </ScrollView>

                </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.13,
    },

    back: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: height * 0.055,
        left: 20,
        zIndex: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fceb9d',
        textAlign: 'center',
        marginBottom: height * 0.03,
    },

    image: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: height * 0.03,
    },

    subTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.015,
    },

    description: {
        width: '100%',
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        textAlign: 'justify',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginBottom: height * 0.03
    }

});

export default FullStory;