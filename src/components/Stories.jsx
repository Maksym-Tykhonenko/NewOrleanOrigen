import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import stories from "../constants/stories";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Stories = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>Hidden Stories</Text>
                <Text style={styles.subTitle}>Cultural Phenomena and Iconic Figures of New Orleans</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        stories.map((story, index) => (
                            <TouchableOpacity key={index} style={styles.card}>

                                <Text style={styles.storyTitle}>{story.title}</Text>
                                <Text style={styles.storyDescription} numberOfLines={4} ellipsizeMode='tail'>{story.description}</Text>

                                <TouchableOpacity style={styles.storyBtn} onPress={() => navigation.navigate('FullStoryScreen', { story: story })}>
                                    <Text style={styles.storyBtnText}>See more</Text>
                                </TouchableOpacity>

                            </TouchableOpacity>
                        ))
                    }
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
        paddingTop: height * 0.07,
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
        fontSize: 26,
        fontWeight: '900',
        color: '#5109ae',
        textAlign: 'center',
        marginBottom: height * 0.015,
    },

    subTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#fceb9d',
        textAlign: 'center',
        marginBottom: height * 0.03,
    },

    card: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },

    storyTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#915320',
        textAlign: 'center',
        marginBottom: height * 0.02,
    },

    storyDescription: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        textAlign: 'justify',
        marginBottom: height * 0.03  
    },

    storyBtn: {
        width: '100%',
        padding: 7,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f69809',
        backgroundColor: '#ece096'
    },

    storyBtnText: {
        fontSize: 16,
        color: '#f69809',
        fontWeight: '900',
        textAlign: 'center'   
    }

});

export default Stories;