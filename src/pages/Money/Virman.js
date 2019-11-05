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
import Api from '~/api';
import {Actions} from 'react-native-router-flux';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class Virman extends React.Component {
  state = {
    accounts: null,
    wantedMoney: '',
    acc: -1,
    targetAcc: -1,
    loading: false,
  };

  componentDidMount() {
    const {accounts} = this.props.authStore;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      accounts: this.props.authStore.accounts,
      acc: accounts.status ? -1 : 0,
      targetAcc: accounts.status ? -1 : 0,
    });
  }

  onPress = () => {
    const {accounts, wantedMoney, acc, targetAcc} = this.state;
    const {user, setAccountList} = this.props.authStore;

    if (acc === -1 || targetAcc === -1) {
      Alert.alert('Hesap Seçmedin!', 'Lütfen hesap seçmeyi unutma.. :) ');
    } else {
      const value = accounts[acc].Balance;

      wantedMoney.indexOf('.') !== -1 &&
      wantedMoney.includes('.', wantedMoney.indexOf('.') + 1)
        ? Alert.alert('Hoaydaa', 'Fantastik şeyler deniyorsun. Yapma.')
        : wantedMoney.includes(' ') || wantedMoney.includes('-')
        ? Alert.alert(
            'Oooooooopsss',
            'Elf gözlerim tanımsız simgeler görüyor :) ',
          )
        : wantedMoney <= 0
        ? Alert.alert('Oooooooopsss', 'Sıfır para gönderemezsiniz :) ')
        : wantedMoney === '' || wantedMoney === '.'
        ? Alert.alert('Para miktarı boş geçilemez!')
        : wantedMoney.includes(',')
        ? Alert.alert(
            'Para Aktarma İşlemi Başarısız.',
            'virgül kullanmayınız..',
          )
        : value - wantedMoney < 0
        ? Alert.alert('Para Aktarma İşlemi Başarısız.', 'Bakiyeniz Yetersiz!.')
        : acc === targetAcc
        ? Alert.alert(
            'İşlem Başarısız',
            'Hedef hesap alıcı hesapla aynı olamaz!',
          )
        : this.setState({loading: true}) ||
          Api.Auth.virman({
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
              this.setState({loading: false});
            })
            .catch(err => {
              Alert.alert('Para Aktama İşlemi Başarısız.', err);
              this.setState({loading: false});
            });
    }
  };

  renderSenderPicker() {
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

  renderGetterPicker() {
    const {accounts} = this.props.authStore;
    if (accounts.status && accounts.status === 404) {
      return <Picker.Item key="1" label="seçimlerinizi yapınız" value="0" />;
    }
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

  render() {
    const {accounts, acc, targetAcc, loading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Virman İşlemleri</Text>
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
              {this.renderSenderPicker()}
            </Picker>
          </View>
        </View>
        <View>
          <Text>
            {targetAcc > -1
              ? 'Alıcı Hesap: ' + accounts[targetAcc].Balance + ' TRY'
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
          maxLength={5}
          value={this.state.wantedMoney}
          onChangeText={item => {
            this.setState({wantedMoney: item});
          }}
        />
        {loading ? (
          <ActivityIndicator color={'blue'} size="large" />
        ) : (
          <Button title={'Para Aktar'} onPress={this.onPress} />
        )}
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
