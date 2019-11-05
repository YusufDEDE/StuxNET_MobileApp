/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
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
import {Button, Input} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import Api from '~/api';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class Deposit extends React.Component {
  state = {
    money: '',
    accounts: [],
    account: -1,
    loading: false,
  };

  componentDidMount() {
    this.setState({
      accounts: this.props.authStore.accounts,
    });
  }

  onPress = () => {
    const {accounts, account, money} = this.state;
    const {user, setAccountList} = this.props.authStore;

    money.indexOf('.') !== -1 && money.includes('.', money.indexOf('.') + 1)
      ? Alert.alert(
          'Hoaydaa',
          'Biladerim alt tarafı para gönderecen fantazi yapma!',
        )
      : money.includes(' ') || money.includes('-')
      ? Alert.alert(
          'Oooooooopsss',
          'Elf gözlerim tanımsız simgeler görüyor :) ',
        )
      : money <= 0
      ? Alert.alert('Oooooooopsss', 'Sıfır para gönderemezsiniz :) ')
      : money > 0 && !money.includes(',')
      ? this.setState({loading: true}) ||
        Api.Auth.depositMoney({
          tc: user,
          additNo: accounts[account].additionalNo,
          deposit: money,
        })
          .then(res => {
            this.setState({loading: false});
            Alert.alert(
              'Para Yatırma İşlemi Başarılı.',
              'Bankamızı kullandığınız için teşekkürler :)',
            );
            setAccountList(user);
            Actions.pop();
          })
          .catch(err => {
            this.setState({loading: false});
            Alert.alert('Para Yatırma İşlemi Başarısız.', err);
          })
      : Alert.alert(
          'Para Yatırma İşlemi Başarısız.',
          'Lütfen yatırmak istediğiniz tutarı gözden geçirin ve virgül kullanmayın!',
        );
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
    const {accounts, account, money, loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Para Yatır</Text>
        <View>
          <Text>
            {account > -1
              ? 'Bakiye: ' + accounts[account].Balance + ' TRY'
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
        <Input
          label={'Yatırılacak para miktarı (₺)'}
          labelStyle={{color: 'gray'}}
          placeholder="300 ₺"
          leftIconContainerStyle={{left: -13}}
          containerStyle={{marginTop: 30, width: 350}}
          keyboardType={'number-pad'}
          maxLength={5}
          value={money}
          onChangeText={text => this.setState({money: text})}
        />
        {loading ? (
          <ActivityIndicator color={'blue'} size="large" />
        ) : (
          <Button title={'Para Yatır'} onPress={this.onPress} />
        )}
      </View>
    );
  }
}

export default Deposit;

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
