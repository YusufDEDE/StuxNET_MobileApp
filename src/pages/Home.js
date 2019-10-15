import React from 'react';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {images, fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';

export default class HomeScreen extends React.Component {
  // navigationOptions ile sayfalara custom title verebilir, react-navigation özelleştirebilirsin.
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('propName', 'default Value'),
  //   };
  // };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Image
          resizeMode={'contain'}
          source={images.logo}
          style={styles.image}
        />
        <Text style={styles.text}>Ana Ekran</Text>

        <Button title={'Çıkış Yap'} onPress={Actions.auth} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {width: 200, height: 161},
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 50,
  },
});
