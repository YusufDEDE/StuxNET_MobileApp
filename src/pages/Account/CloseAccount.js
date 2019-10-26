/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
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
  };
  componentDidMount() {
    this.setState({
      accounts: this.props.authStore.accounts,
    });
  }
  onPress = () => {
    const {accounts, account} = this.state;
    const {user, setAccountList} = this.props.authStore;
    Api.Auth.deleteAccount({
      tc: user,
      additNo: accounts[account].additionalNo,
    })
      .then(res => {
        console.log('del' + res);
        Alert.alert(
          'Hesap Kapatıldı.',
          'Hesap başarıyla kapatıldı. Bankamızı kullandığınız için teşekkürler.'
        );
        Actions.pop();
        setAccountList(user);
      })
      .catch(err => {
        Alert.alert('işlem başarısız.', 'takrar deneyiniz..');
        console.log(err);
      });
  };

  renderPicker() {
    if (this.state.accounts === undefined) {
      return <Picker.Item key="1" label="seçimlerinizi yapınız" value="0" />;
    }
    return this.state.accounts.map((item, index) => {
      return (
        <Picker.Item
          key={index.toString()}
          label={item.accNo + ' - ' + item.additionalNo}
          value={index}
        />
      );
    });
  }

  render() {
    const {accounts, account} = this.state;
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
        <Button title={'Hesabı Kapat'} onPress={this.onPress} />
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
