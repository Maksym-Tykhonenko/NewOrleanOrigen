import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { width, height } = Dimensions.get('window');

const Album = () => {
    const navigation = useNavigation();
    const [album, setAlbum] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            const storedAlbum = await AsyncStorage.getItem('album');
            const parsedAlbum = storedAlbum ? JSON.parse(storedAlbum) : {};
            setAlbum(parsedAlbum);
        };
        fetchAlbum();
    }, []);

    const handleDeleteImage = async (placeName, imageUri) => {
        const updatedAlbum = { ...album };
        updatedAlbum[placeName] = updatedAlbum[placeName].filter((uri) => uri !== imageUri);

        if (updatedAlbum[placeName].length === 0) {
            delete updatedAlbum[placeName];
        }

        await AsyncStorage.setItem('album', JSON.stringify(updatedAlbum));
        setAlbum(updatedAlbum);
        setSelectedImage(null);
    };

    const handleSelect = ({ placeName, uri: imageUri }) => {
        if (selectedImage?.placeName === placeName && selectedImage?.uri === imageUri) {
            setSelectedImage(null);
        } else {
            setSelectedImage({ placeName, uri: imageUri });
        }
    };    

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>Photo Album</Text>

                <ScrollView style={styles.scroll}>
                    {Object.entries(album).map(([placeName, images], index) => (
                        <View key={index} style={styles.placeContainer}>
                            <Text style={styles.placeName}>{placeName}</Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}
                                contentContainerStyle={styles.imageScrollContainer}
                                style={styles.scrollView}
                            >
                                {images.map((imageUri, imageIndex) => (
                                    <View key={`${placeName}_${imageIndex}`} style={styles.imageWrapper}>
                                        <TouchableOpacity
                                            style={[
                                                styles.imageTouch,
                                                selectedImage?.uri === imageUri && { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
                                            ]}
                                            onPress={() =>
                                                handleSelect({ placeName, uri: imageUri })
                                            }
                                        >
                                            <Image source={{ uri: imageUri }} style={styles.image} />
                                        </TouchableOpacity>
                                        {selectedImage?.uri === imageUri && (
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => handleDeleteImage(placeName, imageUri)}
                                            >
                                                <Text style={styles.deleteButtonText}>Delete</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        top: height * 0.055,
        zIndex: 10,
    },

    scroll: {
        width: '100%',
        height: '100%',
        padding: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#5109ae',
        textAlign: 'center',
        marginBottom: height * 0.03,
    },

    placeContainer: {
        marginBottom: 20,
    },

    placeName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#915320',
        marginBottom: 10,
    },

    scrollView: {
        height: 230,
    },

    imageScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    imageWrapper: {
        position: 'relative',
        marginRight: 10,
    },

    imageTouch: {
        borderRadius: 10,
        overflow: 'hidden',
    },

    image: {
        width: width * 0.8,
        height: 230,
        borderRadius: 10,
        resizeMode: 'cover',
    },

    deleteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'red',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
    },

    deleteButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
    },
});

export default Album;
