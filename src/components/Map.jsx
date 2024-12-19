import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import places from '../constants/places.js';

const Map = ({ next }) => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerSize, setMarkerSize] = useState(40);
    const [visitedPlaces, setVisitedPlaces] = useState([]);
    const [purchasedPlaces, setPurchasedPlaces] = useState([]);

    // useEffect(() => {
    //     const fetchVisitedPlaces = async () => {
    //         try {
    //             const storedVisitedTrips = await AsyncStorage.getItem('visitedTrips');
    //             const visitedTripsArray = storedVisitedTrips ? JSON.parse(storedVisitedTrips) : [];
    //             const visitedNames = visitedTripsArray.map((trip) => trip.place?.name);
    //             setVisitedPlaces(visitedNames);

    //             const storedPurchasedPlaces = await AsyncStorage.getItem('purchasedPlaces');
    //             const purchasedPlacesArray = storedPurchasedPlaces ? JSON.parse(storedPurchasedPlaces) : [];
    //             setPurchasedPlaces(purchasedPlacesArray);        
    //         } catch (error) {
    //             Alert.alert('Error', `Could not retrieve visited trips: ${error.message}`);
    //         }
    //     };

    //     fetchVisitedPlaces();
    // }, []);

    useEffect(() => {
        if (mapRef.current) {
            const coordinates = places.map((item) => ({
                latitude: item.coordinates[0].lat,
                longitude: item.coordinates[0].lng,
            }));
            mapRef.current.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, []);

    const handleNextMarker = () => {
        const nextIndex = (currentIndex + 1) % places.length;
        setCurrentIndex(nextIndex);
        setSelectedPlace(null);

        const { lat, lng } = places[nextIndex].coordinates[0];
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        }, 1000);

        setMarkerSize(80);
    };

    const handlePlaceChange = (region) => {
        const zoomFactor = Math.max(0.1, Math.min(0.1 / region.latitudeDelta, 1));
        const newSize = 40 * zoomFactor;

        if (markerSize !== 80) {
            setMarkerSize(Math.max(20, Math.min(newSize, 120)));
        }
    };

    const handleMarkerPress = (place) => {
        setSelectedPlace(place);
    };

    const goToDetailsScreen = () => {
        if (selectedPlace) {
            navigation.navigate('DetailsScreen', { place: selectedPlace });
        }
    };

    // const isVisited = (placeName) => visitedPlaces.includes(placeName);

    // const combinedPlaces = [...places, ...purchasedPlaces];

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 29.951065,
                    longitude: -90.071533,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                onRegionChange={handlePlaceChange}
            >
                {places.map((item) => (
                    <Marker
                        key={item.name}
                        coordinate={{
                            latitude: item.coordinates[0].lat,
                            longitude: item.coordinates[0].lng,
                        }}
                        onPress={() => handleMarkerPress(item)}
                        title={item.name}
                    >
                        <View>
                            <Image
                                source={item.image}
                                style={[styles.markerImage,
                                     { width: markerSize, height: markerSize }]}
                            />
                        </View>
                    </Marker>
                ))}
            </MapView>
            {
                next && (
                    <TouchableOpacity style={styles.btn} onPress={handleNextMarker}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>    
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#f69809'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        left: '40%',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#f69809',
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerImage: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#f69809'
    },
    visitedMarkerBorder: {
        borderWidth: 3,
        borderColor: '#FFC000',
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '800'
    },
    calloutContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        minWidth: 120,
    },
    placeName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#3C3C3B',
        marginBottom: 5,
        textAlign: 'center',
    },
    detailsButton: {
        backgroundColor: '#f69809',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    visitedButton: {
        backgroundColor: '#FFC000',
    },
    detailsButtonText: {
        color: '#fff',
    },
    visitedIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 15,
    },
});

export default Map;
