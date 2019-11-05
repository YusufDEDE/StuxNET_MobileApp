/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Api from '~/api';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class Payment extends React.Component {
  state = {
    testData: null,
    id: '',
    loading: false,
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={
        'Abone Adı: ' + item.Customer + '      Borç : ' + item.Debt + ' TRY'
      }
      subtitle={
        'Fatura Dönemi: ' + item.Term + '        Fatura Tipi: ' + item.Type
      }
      bottomDivider
      chevron
      style={styles.flatListItem}
      onPress={() => Actions.jump('billPopup', {item})}
    />
  );

  onPress = id => {
    //const {accounts, user, setAccountList} = this.props.authStore;
    this.setState({loading: true});
    Api.Auth.payment({subsID: id})
      .then(res => {
        res.status === 404
          ? this.setState({loading: false}) ||
            Alert.alert(
              'Fatura Bulunamadı!!',
              'Girdiğiniz abone numarasını kontrol ediniz..',
            )
          : this.setState({
              testData: res,
              loading: false,
            });
      })
      .catch(() => {
        Alert.alert(
          'Ödeme işlemi başarısız!',
          'Girdiğiniz abone numarasını kontrol ediniz..',
        );
        this.setState({loading: false});
      });
  };

  onChangeText = text => {
    this.setState({
      id: text,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Faturalar</Text>
        <View style={styles.accountsContainer}>
          <View style={styles.flatListContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.testData}
              renderItem={this.renderItem}
              nullable
            />
          </View>
        </View>
        <View style={{width: '80%'}}>
          <Input
            label={'Abone Numarası'}
            labelStyle={{color: 'red'}}
            placeholder="10001"
            leftIcon={<Icon name="payment" size={24} color="black" />}
            leftIconContainerStyle={{left: -13}}
            containerStyle={{marginTop: 30}}
            onChangeText={this.onChangeText}
            maxLength={5}
            value={this.state.id}
            keyboardType={'number-pad'}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator color={'blue'} size="large" />
        ) : (
          <Button
            title={'Faturaları Listele'}
            onPress={() => this.onPress(this.state.id)}
          />
        )}
      </View>
    );
  }
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontFamily: fonts.avenirMedium,
    fontSize: 28,
    color: colors.secondaryDark,
    fontWeight: 'bold',
  },
  flatListItem: {
    borderColor: colors.cyprus,
    borderWidth: 0.2,
  },
  flatListContainer: {
    height: '100%',
    marginHorizontal: 50,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.lightGray,
    overflow: 'hidden',
  },
  accountsContainer: {
    width: '100%',
    flex: 0.9,
  },
});
