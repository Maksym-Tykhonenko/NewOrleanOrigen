import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Share, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const avatars = [
  require('../assets/avatar/1.png'),
  require('../assets/avatar/2.png'),
  require('../assets/avatar/3.png'),
  require('../assets/avatar/4.png'),
  require('../assets/avatar/5.png'),
  require('../assets/avatar/6.png'),
  require('../assets/avatar/7.png'),
  require('../assets/avatar/8.png'),
  require('../assets/avatar/9.png'),
  require('../assets/avatar/10.png'),
]

const Scoreboard = () => {
  const navigation = useNavigation();
  const [totalScore, setTotalScore] = useState(0);
  const [users, setUsers] = useState([]);

  const generateRandomName = () => {

    const firstNames = [
        'Lydia', 'Elena', 'Naomi', 'Jade', 'Anastasia', 'Ruby', 
        'Clara', 'Ivy', 'Genevieve', 'Vivian', 'Eliza', 'Margot', 
        'Serena', 'Tessa', 'Daphne', 'Athena', 'Camille', 'Selene', 
        'Freya', 'Juniper', 'Willa', 'Dahlia', 'Esme', 'Ophelia', 
        'Sage', 'Bianca', 'Lena', 'Imogen', 'Phoebe', 'Maeve'
    ];
    
    const lastNames = [
        'Watson', 'Brooks', 'Fisher', 'Holland', 'Knight', 'Henderson', 
        'Barrett', 'Chavez', 'Franklin', 'Lawson', 'Rhodes', 'Jennings', 
        'Torres', 'Morris', 'Sullivan', 'Fleming', 'Harrington', 'Bishop', 
        'Hughes', 'Ramsey', 'Griffin', 'Hunt', 'Chapman', 'Warren', 
        'Webster', 'Bradley', 'Harper', 'Reynolds', 'Vaughn', 'Beck'
    ];
        
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateUsers = () => {
    const generatedUsers = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        name: generateRandomName(),
        score: Math.floor(Math.random() * (11500) + 500),
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      };
      generatedUsers.push(user);
    }
    setUsers(generatedUsers);
  };

  useEffect(() => {
    const fetchTotalScore = async () => {
      const score = await AsyncStorage.getItem('totalScore');
      setTotalScore(score ? parseInt(score) : 0);
    };

    fetchTotalScore();
    generateUsers();
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Look, I scored ${totalScore} points at 'New Orlean: Craps to Voodoo'! Can you beat my score? Join and find out hidden gems of New Orlean !`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/back/back.png')} style={{flex: 1}}>
        <View style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Icons type={"back"} />
            </TouchableOpacity>

            <Text style={styles.totalScore}>{totalScore}</Text>
            
            <FlatList
                data={users}
                renderItem={({ item }) => (
                <View style={styles.userContainer}>
                    <Image source={item.avatar} style={{width: 50, height: 50}} />
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userScore}>{item.score}</Text>
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>Share reached score</Text>
            </TouchableOpacity>

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
      width: 60,
      height: 60,
      padding: 10,
      position: "absolute",
      top: height * 0.055,
      left: 20,
    },

  totalScore: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    marginBottom: height * 0.05
  },

  list: {
    width: width * 0.87,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  userContainer: {
    width: height * 0.19,
    height: height * 0.19,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 120,
    borderWidth: 3,
    borderColor: '#8f3cfb',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5109ae',
    textAlign: 'center'
  },

  userScore: {
    fontSize: 18,
    color: '#555',
    fontWeight: '800'
  },

  shareButton: {
    width: 220,
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

  shareButtonText: {
    color: '#8f3cfb',
    fontWeight: '800',
    fontSize: 16,
  },

});

export default Scoreboard;
