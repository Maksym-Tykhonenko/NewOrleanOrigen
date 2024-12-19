import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";
import quiz from "../constants/quiz";

const { height } = Dimensions.get('window');

const Quiz = () => {
    const navigation = useNavigation();
    const [selectedMode, setSelectedMode] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [timer, setTimer] = useState(45);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const fetchTotalScore = async () => {
            const storedScore = await AsyncStorage.getItem('totalScore');
            setTotalScore(storedScore ? parseInt(storedScore, 10) : 0);
        };
        fetchTotalScore();
    }, []);

    useEffect(() => {
        if (selectedMode === 'time' && timer > 0) {
            const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            setIsQuizOver(true);
        }
    }, [selectedMode, timer]);

    const handleAnswerPress = async (isCorrect, option) => {
        setSelectedAnswer(option);
    
        let updatedScore = totalScore;
    
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
            updatedScore += 100;
        } else {
            updatedScore = Math.max(updatedScore - 50, 0);
        }
    
        setTotalScore(updatedScore);
        await AsyncStorage.setItem('totalScore', updatedScore.toString());
    
        if (selectedMode === 'shot') {
            if (isCorrect && currentQuestionIndex < quiz.length - 1) {
                setTimeout(() => {
                    setSelectedAnswer(null);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }, 650);
            } else {
                setTimeout(() => setIsQuizOver(true), 1000);
            }
        } else if (selectedMode === 'time') {
            if (currentQuestionIndex < quiz.length - 1) {
                setTimeout(() => {
                    setSelectedAnswer(null);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                }, 650);
            } else {
                setTimeout(() => setIsQuizOver(true), 1000);
            }
        }
    };
    
    const handleRestart = () => {
        setSelectedMode(null);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setTimer(45);
        setIsQuizOver(false);
        setSelectedAnswer(null);
    };

    return (
        <ImageBackground source={require('../assets/back/back.png')} style={{ flex: 1 }}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Icons type={'back'} />
                </TouchableOpacity>

                {selectedMode ? (
                    isQuizOver ? (
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            <Text style={styles.title}>Quiz Over</Text>

                            <View style={styles.scoreContainer}>
                                <Text style={styles.score}>{totalScore}</Text>
                                <View style={{width: 30, height: 30, marginLeft: 10}}>
                                    <Icons type={selectedMode === 'time' ? 'time' : 'shot'} />
                                </View>
                            </View>

                            <Text style={styles.resultText}>Great job! You answered correctly {correctAnswers} times.</Text>

                            <Text style={[styles.resultText, {color: '#fceb9d', marginBottom: height * 0.1}]}>Challenge yourself to achieve an even higher score — try again and dive deeper into your knowledge!</Text>

                            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                                <Text style={styles.restartButtonText}>Go Back to Modes</Text>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <View style={{ width: '100%' }}>

                            <View style={styles.scoreContainer}>
                                <Text style={styles.score}>{totalScore}</Text>
                                <View style={{width: 30, height: 30, marginLeft: 10}}>
                                    <Icons type={selectedMode === 'time' ? 'time' : 'shot'} />
                                </View>
                            </View>

                            {selectedMode === 'time' && (
                                <View style={styles.timerContainer}>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progress, { width: `${(timer / 45) * 100}%` }]} />
                                    </View>
                                    <Text style={styles.timerText}>{timer}s</Text>
                                </View>
                            )}

                            <Text style={styles.questionText}>{quiz[currentQuestionIndex].question}</Text>

                            {quiz[currentQuestionIndex].options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === option && option === quiz[currentQuestionIndex].correctOption
                                            ? styles.correctOption
                                            : {},
                                        selectedAnswer === option && option !== quiz[currentQuestionIndex].correctOption
                                            ? styles.wrongOption
                                            : {},
                                    ]}
                                    onPress={() => handleAnswerPress(option === quiz[currentQuestionIndex].correctOption, option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                            )
                            ) : (
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.title}>Historic New Orleans Quiz</Text>
                                    <Text style={styles.subTitle}>Choose your mode:</Text>

                                    <View style={styles.modesContainer}>
                                        <View style={{ width: '47%', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={{ width: '100%', height: height * 0.2 }}
                                                onPress={() => setSelectedMode('time')}
                                            >
                                                <Icons type={'time'} />
                                            </TouchableOpacity>
                                            <Text style={styles.modeText}>Speed Round</Text>
                                        </View>

                                        <View style={{ width: '47%', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={{ width: '100%', height: height * 0.2 }}
                                                onPress={() => setSelectedMode('shot')}
                                            >
                                                <Icons type={'shot'} />
                                            </TouchableOpacity>
                                            <Text style={styles.modeText}>One Shot</Text>
                                        </View>
                                    </View>
                                </View>
                )}

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
        paddingTop: height * 0.15,
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
        color: '#fceb9d',
        textAlign: 'center',
        marginBottom: height * 0.1,
    },

    subTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#ffd080',
        textAlign: 'center',
        marginBottom: height * 0.07,
    },

    modesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },

    modeText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#ffd080',
        textAlign: 'center',
        marginTop: height * 0.02,
    },

    questionText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffd080',
        textAlign: 'center',
        marginVertical: height * 0.03,
        height: 100
    },

    optionButton: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#ece096',
        borderRadius: 12,
        width: '100%',
        borderWidth: 2,
        borderColor: '#f69809'
    },

    correctOption: {
        backgroundColor: 'green',
    },

    wrongOption: {
        backgroundColor: 'red',
    },

    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f69809',
        textAlign: 'center',
    },

    timerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.05,
    },

    progressBar: {
        width: '90%',
        height: 20,
        backgroundColor: '#ece096',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#5109ae'
    },

    progress: {
        height: '100%',
        backgroundColor: '#5109ae',
    },

    timerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fceb9d',
        marginTop: 5,
    },

    resultText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffd080',
        textAlign: 'center',
        marginVertical: height * 0.03,
    },

    restartButton: {
        width: '100%',
        backgroundColor: '#ece096',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#8f3cfb'
    },

    restartButtonText: {
        color: '#8f3cfb',
        fontWeight: '800',
        fontSize: 16,
    },

    scoreContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: height * -0.085
    },

    score: {
        fontSize: 24,
        fontWeight: '900',
        color: '#5109ae',
        textAlign: 'center',
    }

});

export default Quiz;