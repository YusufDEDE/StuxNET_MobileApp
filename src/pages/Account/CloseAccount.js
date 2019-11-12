/* eslint-disable comma-dangle */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Picker,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from 'res';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';

@inject('authStore')
@observer
class CloseAccount extends React.Component {
  state = {
    accounts: [],
    account: -1,
    loading: false,
  };
  componentDidMount() {
    const {accounts} = this.props.authStore;
    this.setState({
      accounts: this.props.authStore.accounts,
      account: accounts.status ? -1 : 0,
    });
  }
  onPress = () => {
    const {accounts, account} = this.state;
    const {user, setAccountList} = this.props.authStore;
    if (account === -1) {
      Alert.alert(
        'Hesap Tanımsız..',
        'İşleme devam etmek için lütfen hesap seçiniz..',
      );
    } else {
      this.setState({loading: true});
      Api.Auth.deleteAccount({
        tc: user,
        additNo: accounts[account].additionalNo,
      })
        .then(res => {
          this.setState({loading: false});
          Alert.alert(
            'Hesap Kapatıldı.',
            'Bankamızı kullandığınız için teşekkürler.',
          );
          Actions.pop();
          setAccountList(user);
        })
        .catch(err => {
          this.setState({loading: false});
          Alert.alert(
            'işlem başarısız.',
            'Hesapta bakiye mevcutken hesap kapatamazsınız.',
          );
          console.log(err);
        });
    }
  };

  renderPicker() {
    const {accounts} = this.props.authStore;

    if (accounts.status && accounts.status === 404) {
      return (
        <Picker.Item
          key="1"
          label="Üyeliğinize tanımlı hesap bulunmamaktadır!!"
          value="0"
        />
      );
    } else {
      return accounts.map((item, index) => {
        return (
          <Picker.Item
            key={index.toString()}
            label={item.accNo + ' - ' + item.additionalNo}
            value={index}
          />
        );
      });
    }
  }

  render() {
    const {accounts, account, loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesap Kapat</Text>
        <View>
          <Text>
            {account > -1
              ? 'Bakiye: ' + accounts[account].Balance
              : 'Hesap Seçiniz'}
          </Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.account}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({account: itemValue})
              }>
              {this.renderPicker()}
            </Picker>
          </View>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator color={'blue'} size="large" />
          ) : (
            <Button title={'Hesabı Kapat'} onPress={this.onPress} />
          )}
        </View>
      </View>
    );
  }
}

export default CloseAccount;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-evenly', alignItems: 'center'},
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
  pickerStyle: {
    height: 50,
    width: 300,
    borderColor: colors.cyprus,
    borderWidth: 1,
  },
});
