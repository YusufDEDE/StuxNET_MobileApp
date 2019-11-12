/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, StyleSheet, StatusBar, Image, Text, FlatList} from 'react-native';
import {images, fonts, colors} from 'res';
import Api from '~/api';
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
    rates: [],
  };

  componentDidMount() {
    if (this.props.authStore.userInfo.firstName !== undefined) {
      const {firstName, lastName} = this.props.authStore.userInfo;
      this.setState({
        name: firstName,
        surname: lastName,
      });
    }
    Api.Auth.exchangeRates()
      .then(res => {
        const array = [];
        Object.keys(res.rates).map((key, index) => {
          array.push({[key]: res.rates[key]});
        });
        this.setState(state => ({
          rates: array,
        }));
        console.log(this.state.rates);
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.ratesItem}>
        <Text>{Object.keys(item)[0]} :</Text>
        <Text style={{marginLeft: 20}}>{Object.values(item)[0]}</Text>
      </View>
    );
  };

  render() {
    const {name, surname} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Image
          resizeMode={'contain'}
          source={images.logo}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>
          Hoşgeldiniz sn {name} {surname}
        </Text>
        <Text style={styles.text}>TRY Bazında Kurlar</Text>
        <FlatList
          style={{width: '50%', marginBottom: 15, marginTop: -30}}
          keyExtractor={this.keyExtractor}
          data={this.state.rates}
          renderItem={this.renderItem}
          nullable
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  image: {width: 200, height: '25%'},
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
    marginHorizontal: 30,
    textAlign: 'center',
  },
  ratesItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderColor: colors.lightGray,
    borderBottomWidth: 0.2,
  },
});
