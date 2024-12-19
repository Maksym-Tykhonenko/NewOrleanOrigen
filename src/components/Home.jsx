import React, { useState } from 'react';
import { ImageBackground, View, TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import SettingsModal from './SettingsModal';
import Icons from "./Icons"
import Map from "./Map";

const { height } = Dimensions.get('window');

const heightThreshold = 700;

const mapHeight = height < heightThreshold ? height * 0.43 : height * 0.48;

const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.btnsContainer}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.upperIcon} onPress={() => navigation.navigate('ScoreboardScreen')}>
                            <Icons type={'scoreboard'} />
                        </TouchableOpacity>
                        <Text style={styles.btnText}>Scoreboard</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.upperIcon} onPress={() => navigation.navigate('TimelineScreen')}>
                            <Icons type={'timeline'} />
                        </TouchableOpacity>
                        <Text style={styles.btnText}>Timeline</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.upperIcon} onPress={() => setModalVisible(true)}>
                            <Icons type={'settings'} />
                        </TouchableOpacity>
                        <Text style={styles.btnText}>Settings</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('PlacesScreen')}>
                    <Map next={false} />
                </TouchableOpacity>

                <Text style={styles.title}>Games</Text>

                <View style={styles.line} />

                <View style={styles.btnsContainer}>
                    <TouchableOpacity style={styles.gameBtn} onPress={() => navigation.navigate('QuizScreen')}>
                        <LinearGradient
                                    colors={['#8f3cfb', '#f6d300']}
                                    
                                    start={{ x: -0.15, y: 0.5 }}
                                    end={{ x: 1.1, y: 0.5 }}
                                    style={[styles.gradient]}
                                >
                            <Text style={styles.gameBtnText}>Quiz</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gameBtn} onPress={() => navigation.navigate('CrapsGameScreen')}>
                        <LinearGradient
                                    colors={['#f6d300', '#8f3cfb']}
                                    
                                    start={{ x: -0.15, y: 0.5 }}
                                    end={{ x: 1.1, y: 0.5 }}
                                    style={[styles.gradient]}
                                >
                            <Text style={styles.gameBtnText}>Craps Origins</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={[styles.btnsContainer, {marginBottom: 0}]}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.upperIcon} onPress={() => navigation.navigate('StoriesScreen')}>
                            <Icons type={'stories'} />
                        </TouchableOpacity>
                        <Text style={styles.btnText}>Hidden stories</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.upperIcon} onPress={() => navigation.navigate('AlbumScreen')}>
                            <Icons type={'album'} />
                        </TouchableOpacity>
                        <Text style={styles.btnText}>Photo album</Text>
                    </View>
                </View>

                <SettingsModal visible={modalVisible} onClose={() => setModalVisible(false)} />

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

    btnsContainer: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: height * 0.04
    },

    upperIcon: {
        width: 60,
        height: 60,
        marginBottom: height * 0.007
    },

    btnText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center'
    },

    mapContainer: {
        width: '100%',
        height: mapHeight,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#8f3cfb',
        overflow: 'hidden',
        marginBottom: height * 0.03
    },

    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#5109ae',
        textAlign: 'center'
    },

    line: {
        width: '100%',
        borderWidth: 0.7,
        opacity: 0.7,
        borderColor: '#403c33',
        marginVertical: height * 0.015
    },

    gameBtn: {
        width: '47%',
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f6d300'
    },

    gradient: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flexDirection: 'row',
    },

    gameBtnText: {
        fontSize: 19,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center'
    }

});

export default Home;