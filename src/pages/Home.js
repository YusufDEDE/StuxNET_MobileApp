/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, StyleSheet, StatusBar, Image, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {images, fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';
import {inject, observer} from 'mobx-react';

@inject('authStore')
@observer
class HomeScreen extends React.Component {
  // navigationOptions ile sayfalara custom title verebilir, react-navigation özelleştirebilirsin.
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: navigation.getParam('propName', 'default Value'),
  //   };
  // };

  state = {
    name: 'isim',
    surname: 'soyisim',
  };

  componentDidMount() {
    if (this.props.authStore.userInfo.firstName !== undefined) {
      const {firstName, lastName} = this.props.authStore.userInfo;
      this.setState({
        name: firstName,
        surname: lastName,
      });
    }
  }

  render() {
    const {name, surname} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.welcomeText}>
          Hoşgeldiniz sn {name} {surname}
        </Text>

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

export default HomeScreen;
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {width: 200, height: 161},
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.primary,
    marginBottom: 50,
  },
  welcomeText: {
    fontFamily: fonts.avenirMedium,
    fontSize: 25,
    color: colors.secondaryDark,
    marginBottom: 50,
  },
});
