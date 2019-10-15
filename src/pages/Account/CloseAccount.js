/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';

export default class CloseAccount extends React.Component {
  onPress = () => {
    Alert.alert(
      'Hesap Kapatıldı.',
      'Hesap başarıyla kapatıldı. Bankamızı kullandığınız için teşekkürler.'
    );
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesap Kapat</Text>
        <View>
          <Text>Hesap Seçiniz</Text>
          <View style={styles.pickerStyle}>
            <Picker>
              <Picker.Item label="11111111" value="bireysel" />
              <Picker.Item label="22222222" value="kurumsal" />
              <Picker.Item label="33333333" value="kurumsal" />
              <Picker.Item label="44444444" value="kurumsal" />
              <Picker.Item label="55555555" value="kurumsal" />
              <Picker.Item label="66666666" value="kurumsal" />
            </Picker>
          </View>
        </View>
        <Button title={'Hesabı Kapat'} onPress={this.onPress} />
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
