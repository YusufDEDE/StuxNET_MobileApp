/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';
import Api from '~/api';

@inject('authStore')
@observer
class PastPayments extends React.Component {
  state = {
    testData: null,
    loading: false,
  };

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    const {user} = this.props.authStore;
    Api.Auth.paymentTransactions({
      tc: user,
    })
      .then(res => {
        this.setState({
          testData: res,
        });
      })
      .catch(err => console.warn(err));
  }

  renderItem = ({item}) => (
    <ListItem
      titleStyle={{width: 210}}
      title={
        'Fatura Türü: ' +
        item.BillType +
        '           Fatura Numarası: ' +
        item.BillNumber +
        '                      İşlem Tutarı : ' +
        item.Payment
      }
      subtitle={
        'Ödeyen Hesap No: ' +
        item.additionalNo +
        '                          Ek No: ' +
        item.additionalNo
      }
      bottomDivider
      chevron
      style={styles.flatListItem}
      onPress={() => this.handlePress(item)}
    />
  );

  handlePress = item => {
    this.props.authStore.accounts.status === 404
      ? Alert.alert('İsmail abi nere gidiyon?.', 'Hesap açmayı unuttun :)')
      : Actions.jump('pastPaymentPopup', {item});
  };

  onPress = () => {
    const {user} = this.props.authStore;
    this.setState({loading: true});
    Api.Auth.paymentTransactions({
      tc: user,
    })
      .then(res => {
        this.setState({
          testData: res,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({loading: true});
        console.warn(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>İşlemlerim</Text>
        <View style={styles.accountsContainer}>
          <View style={styles.flatListContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.testData}
              renderItem={this.renderItem}
              nullable
            />
          </View>
        </View>
        {this.state.loading ? (
          <ActivityIndicator color={'blue'} size="large" />
        ) : (
          <Button title={'İşlemleri Listele'} onPress={this.onPress} />
        )}
      </View>
    );
  }
}

export default PastPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.secondaryDark,
    fontWeight: 'bold',
  },
  flatListItem: {
    borderColor: colors.cyprus,
    borderWidth: 0.2,
  },
  flatListContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
    height: '100%',
    marginHorizontal: 50,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.lightGray,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  accountsContainer: {
    width: '100%',
    flex: 0.9,
  },
});
