/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {fonts, colors} from 'res';

export default class Virman extends React.Component {
    state= {
        money: '1500',
        wantedMoney: '0',
        targetMoney: '1500',
        acc: null,
        targetAcc: null,
    };

  onPress = () => {
    const { money, wantedMoney, acc, targetAcc} = this.state;
    if (acc === targetAcc) {
        Alert.alert('İşlem Başarısız', 'Hedef hesap alıcı hesapla aynı olamaz!');
    } else {
        Alert.alert(
            money - wantedMoney >= 0 && wantedMoney > 0 ? 'Para Aktarma İşlemi Başarılı.' : 'Para Aktarma İşlemi Başarısız :(',
            money - wantedMoney >= 0 && wantedMoney > 0 ? 'Bankamızı kullandığınız için teşekkürler :)' : 'Lütfen bakiyenizi kontrol edip tekrar deneyiniz..'
          );
    }

  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Virman İşlemleri</Text>
        <View>
          <Text>{'Gönderici Hesap Bakiyesi:  ' + this.state.money + '₺'}</Text>
          <View style={styles.pickerStyle}>
            <Picker
            selectedValue={this.state.money}
            onValueChange={(itemValue, itemIndex) =>
    this.setState({money: itemValue, acc: itemIndex})
  }>
              <Picker.Item label="11111111" value="1500" />
              <Picker.Item label="22222222" value="5000" />
              <Picker.Item label="33333333" value="3000" />
              <Picker.Item label="44444444" value="2000" />
              <Picker.Item label="55555555" value="1000" />
              <Picker.Item label="66666666" value="5000" />
            </Picker>

          </View>
        </View>
        <View>
          <Text>{'Alıcı Hesap Bakiyesi:  ' + this.state.targetMoney + '₺'}</Text>
          <View style={styles.pickerStyle}>
            <Picker
            selectedValue={this.state.targetMoney}
            onValueChange={(itemValue, itemIndex) =>
    this.setState({targetMoney: itemValue, targetAcc: itemIndex})
  }>
              <Picker.Item label="11111111" value="1500" />
              <Picker.Item label="22222222" value="5000" />
              <Picker.Item label="33333333" value="3000" />
              <Picker.Item label="44444444" value="2000" />
              <Picker.Item label="55555555" value="1000" />
              <Picker.Item label="66666666" value="5000" />
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
                  onChangeText={(item) => {this.setState({ wantedMoney: item});}}

                />
        <Button title={'Para Aktar'} onPress={this.onPress} />
      </View>
    );
  }
}

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
