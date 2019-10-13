import React from 'react';
import {View, StyleSheet, StatusBar, Image, Text, Button} from 'react-native';
import {images, fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';

export default class HomeScreen extends React.Component {
  // navigationOptions ile sayfalara custom title verebilir, react-navigation özelleştirebilirsin.
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('propName', 'default Value'),
  //   };
  // };

  showAlert1 = () => {
    const title = 'Title';
    const text =
      "Don't invent the wheel again!\n Don't use store (mobx-redux) to show a simple modal.";
    Actions.alert({title, text});
  };

  showAlert2 = () => {
    const title = 'Title';
    const text =
      "Don't invent the wheel again!\n Don't use store (mobx-redux) to show a simple modal.";
    Actions.customAlert({title, text});
  };

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
        <Button title={'Show LightBox 1'} onPress={this.showAlert1} />
        <Button title={'Show LightBox 2'} onPress={this.showAlert2} />
        <Button title={'Çıkış Yap'} onPress={Actions.auth} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {width: 200, height: 161},
  text: {fontFamily: fonts.avenirMedium, fontSize: 28, color: colors.primary},
});
