import React from 'react';
import {images} from 'res';
import {Image} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';

const Logo = () => {
  return <Image style={styles.logo} source={images.logo} />;
};

const styles = ScaledSheet.create({
  logo: {width: '40@s', height: '40@s', borderRadius: scale(75)},
});

export default Logo;
