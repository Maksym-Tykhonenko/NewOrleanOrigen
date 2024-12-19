import React, { useState, useRef } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import timeline from "../constants/timeline";
import Icons from './Icons';

const { height } = Dimensions.get('window');

const Timeline = () => {
    const navigation = useNavigation();
    const [selectedYear, setSelectedYear] = useState(null);
    const eventScrollRef = useRef(null);
    const eventPositions = useRef({});

    const handleYearPress = (year) => {
        setSelectedYear(year);
        const yOffset = eventPositions.current[year];
        if (yOffset !== undefined) {
            eventScrollRef.current?.scrollTo({ y: yOffset, animated: true });
        }
    };

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>Timeline</Text>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.yearScroll}
                >
                    {timeline.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[
                                styles.yearButton,
                                selectedYear === item.year && styles.selectedYearButton
                            ]}
                            onPress={() => handleYearPress(item.year)}
                        >
                            <Text 
                                style={[
                                    styles.yearText,
                                    selectedYear === item.year && styles.selectedYearText
                                ]}
                            >
                                {item.year}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Image source={require('../assets/decor/image.png')} style={styles.image} />

                <ScrollView 
                    style={styles.eventScroll} 
                    ref={eventScrollRef}
                >
                    {timeline.map((item, index) => (
                        <View 
                            key={index} 
                            style={[
                                styles.eventContainer,
                                selectedYear === item.year && styles.highlightedEvent
                            ]}
                            onLayout={(event) => {
                                const { y } = event.nativeEvent.layout;
                                eventPositions.current[item.year] = y;
                            }}
                        >
                            <Text style={styles.eventText}>{item.event}</Text>
                        </View>
                    ))}
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
        marginBottom: height * 0.03,
    },

    yearScroll: {
        width: '100%',
        height: 80,
        marginBottom: height * 0.02,
    },

    yearButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },

    selectedYearButton: {
        backgroundColor: '#915320',
    },

    yearText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#333',
    },

    selectedYearText: {
        color: '#fff',
    },

    image: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 12,
        marginBottom: height * 0.02,
        resizeMode: 'cover'
    },

    eventScroll: {
        width: '100%',
    },

    eventContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
    },

    highlightedEvent: {
        backgroundColor: '#f7c59f',
    },

    eventText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center'
    },
});

export default Timeline;
