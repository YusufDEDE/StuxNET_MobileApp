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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class Havale extends React.Component {
  state = {
    accounts: null,
    acc: -1,
    wantedMoney: '',
    targetAcc: null,
    targetAddit: null,
    loading: false,
  };

  componentDidMount() {
    const {accounts} = this.props.authStore;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      accounts: this.props.authStore.accounts,
      acc: accounts.status ? -1 : 0,
    });
  }

  onPress = () => {
    const {wantedMoney, targetAcc, targetAddit, accounts, acc} = this.state;
    const {user, setAccountList} = this.props.authStore;

    if (acc === -1 || targetAcc === -1) {
      Alert.alert('Hesap Seçmedin!', 'Lütfen hesap seçmeyi unutma.. :) ');
    } else {
      const value = accounts[acc].Balance;

      wantedMoney.indexOf('.') !== -1 &&
      wantedMoney.includes('.', wantedMoney.indexOf('.') + 1)
        ? Alert.alert(
            'Hoaydaa',
            'Biladerim alt tarafı para gönderecen fantazi yapma!',
          )
        : wantedMoney.includes(' ') || wantedMoney.includes('-')
        ? Alert.alert(
            'Oooooooopsss',
            'Elf gözlerim tanımsız simgeler görüyor :) ',
          )
        : wantedMoney <= 0
        ? Alert.alert('Oooooooopsss', 'Sıfır para gönderemezsiniz :) ')
        : wantedMoney === ''
        ? Alert.alert('Para miktarı boş geçilemez!')
        : wantedMoney.includes(',')
        ? Alert.alert(
            'Para Aktarma İşlemi Başarısız.',
            'virgül kullanmayınız..',
          )
        : value[0] - wantedMoney < 0
        ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'Bakiyeniz Yetersiz!.')
        : this.setState({loading: true}) ||
          Api.Auth.havale({
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
              this.setState({loading: false});
            })
            .catch(err => {
              console.log(err);
              Alert.alert('Hata!', 'Kod: 500 , Hedef Hesap Tanımsız!!');
              this.setState({loading: false});
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
            label={
              item.accNo +
              ' - ' +
              item.additionalNo +
              ' / ' +
              item.Balance +
              ' TRY'
            }
            value={index}
          />
        );
      });
    }
  }

  render() {
    const {accounts, acc, targetAcc, loading} = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.headerBox}>
            <Text style={styles.text}>Havale İşlemleri</Text>
            <View>
              <Text>
                {acc > -1
                  ? 'Gönderen Hesap: ' + accounts[acc].Balance + ' TRY'
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
          </View>
          <View style={styles.inputBox}>
            <Input
              label={'Gönderilecek hesap no'}
              labelStyle={{color: 'gray'}}
              placeholder="123456789"
              leftIconContainerStyle={{left: -13}}
              containerStyle={{marginTop: 30, width: 350}}
              keyboardType={'number-pad'}
              value={targetAcc}
              maxLength={8}
              onChangeText={item => {
                this.setState({targetAcc: item});
              }}
            />
            <Input
              label={'Gönderilecek Ek no'}
              labelStyle={{color: 'gray'}}
              placeholder="5001"
              maxLength={4}
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
              maxLength={5}
              value={this.state.wantedMoney}
              onChangeText={item => {
                this.setState({wantedMoney: item});
              }}
            />
            {loading ? (
              <ActivityIndicator color={'blue'} size="large" />
            ) : (
              <Button title={'Gönder'} onPress={this.onPress} />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Havale;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
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
  inputBox: {
    justifyContent: 'space-between',
    height: 420,
    marginBottom: 15,
  },
  headerBox: {
    height: 150,
    justifyContent: 'space-between',
  },
});
