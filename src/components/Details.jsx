import React, { useRef, useEffect, useState } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Details = ({ place }) => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [isMap, setIsMap] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        const fetchUploadedImages = async () => {
            const album = await AsyncStorage.getItem('album');
            const parsedAlbum = album ? JSON.parse(album) : {};
            setUploadedImages(parsedAlbum[place.name] || []);

            console.log(album)
        };
        fetchUploadedImages();
    }, [place.name]);
    
    const handleUploadImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
    
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                alert('Error selecting image. Please try again.');
            } else if (response.assets && response.assets.length > 0) {
                const newImage = response.assets[0].uri;
    
                const album = await AsyncStorage.getItem('album');
                const parsedAlbum = album ? JSON.parse(album) : {};
    
                const updatedImages = [...(parsedAlbum[place.name] || []), newImage];
                parsedAlbum[place.name] = updatedImages;
    
                await AsyncStorage.setItem('album', JSON.stringify(parsedAlbum));
    
                setUploadedImages(updatedImages);
            }
        });
    };

    const handleShowMap = () => {
        if (isMap) {
            setIsMap(false)
        } else {
            setIsMap(true)
        }
    };

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.iconsContainer}>

                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                        <Icons type={'back'} light />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.back} onPress={handleShowMap}>
                        <Icons type={'map'} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.back} onPress={handleUploadImage}>
                        <Icons type={'camera'} />
                    </TouchableOpacity>

                </View>

                {
                    isMap ? (
                        <View style={styles.mapContainer}>
                            <MapView
                                ref={mapRef}
                                style={styles.map}
                                initialRegion={{
                                    latitude: place.coordinates[0].lat,
                                    longitude: place.coordinates[0].lng,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                            >
                                <Marker
                                    key={place.name}
                                    coordinate={{
                                        latitude: place.coordinates[0].lat,
                                        longitude: place.coordinates[0].lng,
                                    }}
                                >
                                    <View>
                                        <Image
                                            source={place.image}
                                            style={styles.markerImage}
                                        />
                                    </View>
                                </Marker>
                            </MapView>
                        </View>            
                    ) : (
                        <View style={{height: height * 0.35, marginBottom: height * 0.03}}>
                            <ScrollView 
                                style={{height: height * 0.35}} 
                                horizontal={true}
                                showsHorizontalScrollIndicator={true} 
                                contentContainerStyle={styles.imageScrollContainer}
                                >
                                <Image source={place.image} style={styles.scrollableImage} />
                                {uploadedImages.length > 0 &&
                                    uploadedImages.map((item, index) => (
                                        <Image
                                            key={`${place.name}_${index}`}
                                            source={{ uri: item }}
                                            style={styles.scrollableImage}
                                        />
                                    ))
                                }
                            </ScrollView>                    
                        </View>
                    )
                }
                

                <Text style={styles.name}>{place.name}</Text>

                <Text style={styles.address}>
                    <Text style={{fontWeight: '700'}}>Address: </Text>
                    {place.address}
                </Text>

                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.description}>{place.description}</Text>
                    <Text style={styles.subTitle}>Historical significance</Text>
                    <Text style={styles.description}>{place.history}</Text>
                    <View style={{height: 50}} />
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
        paddingTop: height * 0.05,
    },

    iconsContainer: {
        position: 'absolute',
        left: 30,
        top: height * 0.07,
        zIndex: 10
    },

    back: {
        width: 40,
        height: 40,
        zIndex: 10,
        marginVertical: 10,
    },

    mapContainer: {
        width: '100%',
        height: height * 0.35,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: height * 0.03,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    markerImage: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f69809',
        width: 60,
        height: 60
    },

    imageScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    
    scrollableImage: {
        width: width * 0.87,
        height: height * 0.35,
        borderRadius: 12,
        marginRight: 10,
        resizeMode: 'cover',
    },
    

    name: {
        fontSize: 22,
        fontWeight: '900',
        color: '#fceb9d',
        textAlign: 'center',
        marginBottom: height * 0.02
    },

    address: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffd080',
        marginBottom: height * 0.02
    },

    description: {
        fontSize: 17,
        textAlign: 'justify',
        color: '#3d3227',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: height * 0.015
    },

    subTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#ffd080',
        textAlign: 'center',
        marginBottom: height * 0.01
    }

});

export default Details;