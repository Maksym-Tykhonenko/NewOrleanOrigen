import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, light }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'scoreboard':
      imageSource = require('../assets/home/scoreboard.png');
      break;
    case 'timeline':
      imageSource = require('../assets/home/timeline.png');
      break;
    case 'settings':
      imageSource = require('../assets/home/settings.png');
      break;
    case 'stories':
      imageSource = require('../assets/home/stories.png');
      break;
    case 'album':
      imageSource = require('../assets/home/album.png');
      break;
    case 'close':
      imageSource = require('../assets/common/close.png');
      iconStyle.push(styles.color);
      break;
    case 'back':
      imageSource = require('../assets/common/back.png');
      light ? iconStyle.push(styles.light): iconStyle.push(styles.color);
      break;
    case 'music-on':
      imageSource = require('../assets/home/music-on.png');
      iconStyle.push(styles.color);
      break;
    case 'music-off':
      imageSource = require('../assets/home/music-off.png');
      iconStyle.push(styles.color);
      break;
    case 'vibration-on':
      imageSource = require('../assets/home/vibration-on.png');
      iconStyle.push(styles.color);
      break;
    case 'vibration-off':
      imageSource = require('../assets/home/vibration-off.png');
      iconStyle.push(styles.color);
      break;
    case 'map':
      imageSource = require('../assets/common/map.png');
      break;
    case 'camera':
      imageSource = require('../assets/common/camera.png');
      break;
    case 'dice':
      imageSource = require('../assets/craps/dice.png');
      break;
    case 'time':
      imageSource = require('../assets/common/time.png');
      iconStyle.push(styles.contain);
      break;
    case 'shot':
      imageSource = require('../assets/common/shot.png');
      iconStyle.push(styles.contain);
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  color: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#5109ae',
  },
  light: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fa982f',
  },
  contain: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }
});

export default Icons;
