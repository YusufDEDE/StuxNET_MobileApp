/* eslint-disable comma-dangle */
import React, {Component} from 'react';
import {BaseModal, ScaleAnimation} from 'react-native-modals';
import {colors} from 'res';
import {Button} from 'react-native-elements';
import {Text, View, Picker, Alert, ActivityIndicator} from 'react-native';
import Api from '~/api';
import {inject, observer} from 'mobx-react';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters/extend';

@inject('authStore')
@observer
class PayBillPopup extends Component {
  state = {
    accounts: [],
    account: -1,
    loading: false,
  };
  dismiss = () => this.ref.dismiss();

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      accounts: this.props.authStore.accounts,
    });
  }
  onRef = ref => (this.ref = ref);

  handlePress = () => {
    const {accounts, account} = this.state;
    const {user, setAccountList} = this.props.authStore;
    const {item} = this.props;
    const value = accounts[account].Balance;
    this.setState({loading: true});

    value < item.Debt
      ? Alert.alert('Ödeme İşlemi Başarısız.', 'Bakiyeniz Yetersiz!.') ||
        this.setState({loading: false})
      : Api.Auth.paymentBank({
          accNo: accounts[account].accNo,
          additNo: accounts[account].additionalNo,
          billID: item.BillID,
          pay: item.Debt,
          area: item.Area,
        })
          .then(res => {
            res.recordset[0].Status === 1
              ? Api.Auth.paymentReq({
                  billID: item.BillID,
                  accNo: accounts[account].accNo,
                  additNo: accounts[account].additionalNo,
                })
                  .then(response => {
                    if (response[0].Status === 1) {
                      setAccountList(user);
                      Actions.pop();
                      this.setState({loading: false});
                      Alert.alert(
                        'Ödeme İşlemi Başarılı.',
                        'Bankamızı kullandığınız için teşekkürler :)',
                        [
                          {
                            text: 'TAMAM',
                            onPress: () => Actions.pop(),
                          },
                        ],
                      );
                    } else {
                      Alert.alert('Ödeme İşlemi Başarısız.');
                      this.setState({loading: false});
                    }
                  })
                  .catch(() => {
                    Alert.alert('Ödeme İşlemi Başarısız.');
                    this.setState({loading: false});
                  })
              : Alert.alert('Ödeme İşlemi Başarısız.');
            this.setState({loading: false});
          })
          .catch(err => {
            Alert.alert('Ödeme İşlemi Başarısız.', err);
            this.setState({loading: false});
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
          label={item.accNo + ' - ' + item.additionalNo}
          value={index}
        />
      );
    });
  }

  render() {
    const {animation, item} = this.props;
    const {accounts, account, loading} = this.state;
    console.log('vvv', item);
    return (
      <BaseModal
        ref={this.onRef}
        visible
        modalAnimation={animation}
        onTouchOutside={this.dismiss}
        width={0.9}
        overlayPointerEvents="auto"
        onDismiss={Actions.pop}>
        <View style={styles.topContainer}>
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
          <View style={styles.divider} />
          <Text style={styles.title}>
            Ödenmesi Gereken Tutar: {' ' + item.Debt} TRY
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          {loading ? (
            <ActivityIndicator color={'blue'} size="large" />
          ) : (
            <Button
              title={'ÖDE'}
              onPressIn={this.handlePress}
              // eslint-disable-next-line react-native/no-inline-styles
              buttonStyle={{height: 50, width: 200}}
            />
          )}
        </View>
      </BaseModal>
    );
  }
}

export default PayBillPopup;

PayBillPopup.defaultProps = {
  animation: new ScaleAnimation({
    initialValue: 0,
    useNativeDriver: true,
  }),
  buttonTitle: 'Tamam',
};

const styles = ScaledSheet.create({
  image: {
    alignSelf: 'center',
    marginBottom: '10@s',
    width: '40@s',
    height: '40@s',
  },
  divider: {
    borderBottomColor: 'gray',
    borderWidth: 0.3,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  text: {
    marginTop: '3@s',
    fontFamily: 'Avenir',
    fontSize: '15@s',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: '20@s',
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.lightGray,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: '24@s',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: '29@s',
    letterSpacing: -0.4,
    textAlign: 'center',
    color: colors.secondaryDark,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20@s',
    paddingBottom: '50@s',
  },
  bottomContainer: {
    backgroundColor: '#F5FAFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100@s',
    paddingHorizontal: '20@s',
  },
  pickerStyle: {
    height: 50,
    width: 300,
    borderColor: colors.cyprus,
    borderWidth: 1,
  },
});
