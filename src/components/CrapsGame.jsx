import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const diceImages = {
    1: require('../assets/craps/1.png'),
    2: require('../assets/craps/2.png'),
    3: require('../assets/craps/3.png'),
    4: require('../assets/craps/4.png'),
    5: require('../assets/craps/5.png'),
    6: require('../assets/craps/6.png'),
};

const CrapsGame = () => {
    const navigation = useNavigation();
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [message, setMessage] = useState('Place your bet and roll the dice!');
    const [bet, setBet] = useState(null);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const fetchScore = async () => {
            const storedScore = await AsyncStorage.getItem('totalScore');
            setTotalScore(storedScore ? parseInt(storedScore, 10) : 0);
        };
        fetchScore();
    }, []);

    const rollDice = async () => {
        const newDice1 = Math.floor(Math.random() * 6) + 1;
        const newDice2 = Math.floor(Math.random() * 6) + 1;
        const total = newDice1 + newDice2;

        setDice1(newDice1);
        setDice2(newDice2);

        let updatedScore = totalScore;

        if (bet === 'win' && (total === 7 || total === 11)) {
            setMessage('You rolled a ' + total + ' ! You win!');
            updatedScore += 100;
        } else if (bet === 'lose' && (total === 2 || total === 3 || total === 12)) {
            setMessage('You rolled a ' + total + ' ! You win!');
            updatedScore += 100;
        } else {
            setMessage('You rolled a ' + total + ' ! You lose... (');
            updatedScore = Math.max(updatedScore - 100, 0);
        }

        setTotalScore(updatedScore);
        await AsyncStorage.setItem('totalScore', updatedScore.toString());

        setBet(null);
    };

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack('')}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                <Text style={styles.title}>Craps Game</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: height * 0.1}}>
                    <Text style={styles.score}>{totalScore}</Text>
                    <View style={{ width: 30, height: 30}}>
                        <Icons type={'dice'} />
                    </View>
                </View>

                <View style={styles.diceContainer}>
                    <Image source={diceImages[dice1]} style={styles.dice} />
                    <Image source={diceImages[dice2]} style={styles.dice} />
                </View>

                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonsContainer}>

                    <TouchableOpacity 
                        style={[styles.button, bet === 'win' && styles.activeButton]} 
                        onPress={() => setBet('win')}
                    >
                        <Text style={styles.buttonText}>Bet on Win</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, bet === 'lose' && styles.activeButton]} 
                        onPress={() => setBet('lose')}
                    >
                        <Text style={styles.buttonText}>Bet on Lose</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity 
                    style={[styles.rollButton, !bet && {opacity: 0.6}]} 
                    onPress={rollDice}
                    disabled={!bet}
                    >
                    <Text style={styles.rollButtonText}>Roll Dice</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.07
    },

    back: {
        width: 40,
        height: 40,
        position: 'absolute',
        left: 30,
        top: height * 0.055,
        zIndex: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#5109ae',
        textAlign: 'center',
        marginBottom: height * 0.1,
    },

    score: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fceb9d',
        textAlign: 'center',
        marginRight: 10
    },

    diceContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    dice: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
    },

    message: {
        fontSize: 19,
        fontWeight: '800',
        color: '#fceb9d',
        textAlign: 'center',
        marginVertical: height * 0.03,
    },

    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: height * 0.05,
        width: '100%'
    },

    button: {
        width: '43%',
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#8f3cfb',
        alignItems: 'center',
        justifyContent: 'center'
    },

    activeButton: {
        backgroundColor: '#5109ae',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800'
    },

    rollButton: {
        width: '93%',
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#f69809',
        backgroundColor: '#ece096'
    },

    rollButtonText: {
        fontSize: 16,
        color: '#f69809',
        fontWeight: '900',
        textAlign: 'center'
    },

});

export default CrapsGame;
