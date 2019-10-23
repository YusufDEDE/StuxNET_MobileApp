/* eslint-disable prettier/prettier */
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
  state={
    money: '',
    accounts: [],
  }
  componentDidMount(){
    const { user } = this.props.authStore;
    Api.Auth.listAccount({
      tc: user,
    }).then(res => {
      this.setState({
accounts: res,
      });
      this.state.accounts.map((item) => {

        console.log(item.Balance);
                    });

    })
    .catch(err => {
      console.log(err);
    });
  }
  onPress = () => {
    const { user } = this.props.authStore;
    Api.Auth.deleteAccount({
      tc: user,
    })
      .then(res => {
        console.log(res);
        Alert.alert(
          'Hesap Kapatıldı.',
          'Hesap başarıyla kapatıldı. Bankamızı kullandığınız için teşekkürler.'
        );
        Actions.pop();
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
        return (
            this.state.accounts.map((item,index) => {
                return <Picker.Item key={'index.toString()'} label={'index'} value={item.Balance } />;
            })
        );
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesap Kapat</Text>
        <View>
          <Text>{this.state.money ?  'Bakiye: ' + this.state.money + '₺'  : 'Hesap Seçiniz'}</Text>
          <View style={styles.pickerStyle}
         >
            <Picker  selectedValue={this.state.account}
          onValueChange={(itemValue, itemIndex) =>
  this.setState({money: itemValue})
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
