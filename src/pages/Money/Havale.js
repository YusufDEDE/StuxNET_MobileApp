/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class Havale extends React.Component {
  state = {
    accounts: [],
    acc: -1,
    wantedMoney: null,
    targetAcc: null,
    targetAddit: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      accounts: this.props.authStore.accounts,
    });
  }

  onPress = () => {
    const {wantedMoney, targetAcc, targetAddit, accounts, acc} = this.state;
    const {user, setAccountList} = this.props.authStore;
    const value = accounts[acc].Balance.split('.');

    wantedMoney === null
      ? Alert.alert('Para miktarı boş geçilemez!')
      : wantedMoney.includes(',')
      ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'virgül kullanmayınız..')
      : value[0] - wantedMoney < 0
      ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'Bakiyeniz Yetersiz!.')
      : Api.Auth.havale({
          tc: user,
          sendAddit: accounts[acc].additionalNo,
          recAcc: targetAcc,
          recAddit: targetAddit,
          money: wantedMoney,
        })
          .then(res => {
            setAccountList(user);
            Alert.alert(
              'Para Aktarma İşlemi Başarılı.',
              'Bankamızı kullandığınız için teşekkürler :)',
              [{text: 'TAMAM', onPress: () => Actions.pop()}],
            );
          })
          .catch(err => {
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
          label={item.accNo + ' - ' + item.additionalNo + ' / ' + item.Balance}
          value={index}
        />
      );
    });
  }

  render() {
    const {accounts, acc, targetAcc} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Havale İşlemleri</Text>
        <View>
          <Text>
            {acc > -1
              ? 'Gönderen Hesap: ' + accounts[acc].Balance
              : 'Hesap Seçiniz'}
          </Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.acc}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({acc: itemValue})
              }>
              {this.renderPicker()}
            </Picker>
          </View>
        </View>
        <Input
          label={'Gönderilecek hesap no'}
          labelStyle={{color: 'gray'}}
          placeholder="123456789"
          leftIconContainerStyle={{left: -13}}
          containerStyle={{marginTop: 30, width: 350}}
          keyboardType={'number-pad'}
          value={targetAcc}
          onChangeText={item => {
            this.setState({targetAcc: item});
          }}
        />
        <Input
          label={'Gönderilecek Ek no'}
          labelStyle={{color: 'gray'}}
          placeholder="54001"
          leftIconContainerStyle={{left: -13}}
          containerStyle={{marginTop: 30, width: 350}}
          keyboardType={'number-pad'}
          value={this.state.targetAddit}
          onChangeText={item => {
            this.setState({targetAddit: item});
          }}
        />

        <Input
          label={'Gönderilecek para miktarı (₺)'}
          labelStyle={{color: 'gray'}}
          placeholder="300 ₺"
          leftIconContainerStyle={{left: -13}}
          containerStyle={{marginTop: 30, width: 350}}
          keyboardType={'number-pad'}
          value={this.state.wantedMoney}
          onChangeText={item => {
            this.setState({wantedMoney: item});
          }}
        />
        <Button title={'Gönder'} onPress={this.onPress} />
      </View>
    );
  }
}

export default Havale;

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
