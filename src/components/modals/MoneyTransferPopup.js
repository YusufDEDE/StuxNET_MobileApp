import React, {Component} from 'react';
import {BaseModal, ScaleAnimation} from 'react-native-modals';
import {colors} from 'res';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import Api from '~/api';
import {Actions} from 'react-native-router-flux';
import {ScaledSheet} from 'react-native-size-matters/extend';

export default class MoneyTransferPopup extends Component {
  state = {
    data: null,
  };
  dismiss = () => this.ref.dismiss();

  onPress = () => {
    this.dismiss();
    this.props.onPress();
  };

  componentDidMount() {
    Api.Auth.moneyTransferPopup({actID: this.props.item.activityID})
      .then(res => {
        this.setState({
          data: res[0],
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onRef = ref => (this.ref = ref);

  render() {
    const {animation} = this.props;
    const {data} = this.state;
    console.log('asaaad', data);

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
          {data ? (
            <>
              <Text style={styles.title}>İşlem Türü: {data.ACTIVITY}</Text>
              <View style={styles.divider} />
              <Text style={styles.title}>Tarih: {data.DATE}</Text>
              <View style={styles.divider} />
              <Text style={styles.title}>İşlem Zamanı: {data.TIME}</Text>
              <View style={styles.divider} />
              <Text style={styles.title}>Tutar: {data.PAY}</Text>
              <View style={styles.divider} />
              <Text style={styles.title}>Gönderici: {data.SENDER}</Text>
              <View style={styles.divider} />
              <Text style={styles.title}>Alıcı: {data.RECIPIENT}</Text>
            </>
          ) : (
            <Text>Bekleniyor..</Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <Button title={'TAMAM'} onPressIn={Actions.pop} />
        </View>
      </BaseModal>
    );
  }
}

MoneyTransferPopup.defaultProps = {
  animation: new ScaleAnimation({
    initialValue: 0,
    useNativeDriver: true,
  }),
  buttonTitle: 'Tamam',
  onPress: () => null,
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
    fontSize: '22@s',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: '29@s',
    letterSpacing: -0.4,
    textAlign: 'center',
    color: colors.secondaryDark,
  },
  topContainer: {
    paddingTop: '20@s',
    paddingBottom: '15@s',
    paddingHorizontal: '20@s',
  },
  bottomContainer: {
    backgroundColor: '#F5FAFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80@s',
    paddingHorizontal: '20@s',
  },
});
