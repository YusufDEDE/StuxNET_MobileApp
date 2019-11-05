/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inject, observer} from 'mobx-react';
import {fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';

@inject('authStore')
@observer
class MoneyTransfer extends React.Component {
  state = {
    testData: null,
    loading: false,
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      leftIcon={
        item.ACTIVITY === 'VIRMAN' ? (
          <Icon name="arrows-alt" size={24} color="green" />
        ) : this.props.authStore.accounts[0].accNo !== item.senderAccNo ? (
          <Icon name="arrow-left" size={24} color="green" />
        ) : (
          <Icon name="arrow-right" size={24} color="red" />
        )
      }
      title={
        'İşlem Türü: ' +
        item.ACTIVITY +
        '                      İşlem Tutarı : ' +
        item.PAY
      }
      subtitle={
        'Gönderen: ' + item.SENDER + '             Alıcı: ' + item.RECIPIENT
      }
      bottomDivider
      chevron
      style={styles.flatListItem}
      onPress={() => this.handlePress(item)}
    />
  );

  handlePress = item => {
    Actions.jump('moneyTransferPopup', {item});
  };

  onPress = () => {
    this.setState({loading: true});
    const {user, setMoneyTransferList} = this.props.authStore;
    setMoneyTransferList(user)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  };

  render() {
    const {moneyTransferList} = this.props.authStore;
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>İşlemlerim</Text>
        <View style={styles.accountsContainer}>
          <View style={styles.flatListContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={moneyTransferList}
              renderItem={this.renderItem}
              nullable
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator color={'blue'} size="large" />
        ) : (
          <Button title={'İşlemleri Listele'} onPress={this.onPress} />
        )}
      </View>
    );
  }
}

export default MoneyTransfer;

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
