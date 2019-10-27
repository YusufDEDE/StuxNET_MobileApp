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
class Virman extends React.Component {
  state = {
    accounts: [],
    wantedMoney: null,
    acc: -1,
    targetAcc: -1,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      accounts: this.props.authStore.accounts,
    });
  }

  onPress = () => {
    const {accounts, wantedMoney, acc, targetAcc} = this.state;
    const {user, setAccountList} = this.props.authStore;
    const value = accounts[acc].Balance.split('.');

    wantedMoney === null
      ? Alert.alert('Para miktarı boş geçilemez!')
      : wantedMoney.includes(',')
      ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'virgül kullanmayınız..')
      : value[0] - wantedMoney < 0
      ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'Bakiyeniz Yetersiz!.')
      : acc === targetAcc
      ? Alert.alert('İşlem Başarısız', 'Hedef hesap alıcı hesapla aynı olamaz!')
      : Api.Auth.virman({
          tc: user,
          sendAddit: accounts[acc].additionalNo,
          recAddit: accounts[targetAcc].additionalNo,
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
            Alert.alert('Para Aktama İşlemi Başarısız.', err);
          });
  };

  renderSenderPicker() {
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

  renderGetterPicker() {
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
    const {accounts, acc, targetAcc} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Virman İşlemleri</Text>
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
              {this.renderSenderPicker()}
            </Picker>
          </View>
        </View>
        <View>
          <Text>
            {targetAcc > -1
              ? 'Alıcı Hesap: ' + accounts[targetAcc].Balance
              : 'Hesap Seçiniz'}
          </Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={this.state.targetAcc}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({targetAcc: itemValue})
              }>
              {this.renderGetterPicker()}
            </Picker>
          </View>
        </View>

        <Input
          label={'Aktarılacak para miktarı (₺)'}
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
        <Button title={'Para Aktar'} onPress={this.onPress} />
      </View>
    );
  }
}

export default Virman;
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
