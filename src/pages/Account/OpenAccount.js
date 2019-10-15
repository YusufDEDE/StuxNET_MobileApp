/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, StatusBar, Picker, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {fonts, colors} from 'res';
import {Actions} from 'react-native-router-flux';

export default class OpenAccount extends React.Component {
  onPress = () => {
    Alert.alert(
      'Hesap Oluştuma Başarılı!',
      'hesap başarıyla oluşturuldu. hesap numaranız: 123132131'
    );
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesap Oluştur</Text>
        <View>
          <Text>Hesap Tipi Seçiniz</Text>
          <View style={styles.pickerStyle}>
            <Picker>
              <Picker.Item label="Bireysel" value="bireysel" />
              <Picker.Item label="Kurumsal" value="kurumsal" />
            </Picker>
          </View>
        </View>
        <Button title={'Yeni Hesap Oluştur'} onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'space-evenly', alignItems: 'center'},
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.secondaryDark,
  },
  pickerStyle: {
    height: 50,
    width: 300,
    borderColor: colors.cyprus,
    borderWidth: 1,
  },
});
