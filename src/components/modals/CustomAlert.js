import React, { Component } from 'react';
import { BaseModal, ScaleAnimation } from 'react-native-modals';
import { colors } from 'res';
import { Image, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters/extend';

export default class CustomAlert extends Component {
  dismiss = () => this.ref.dismiss();

  onPress = () => {
    this.dismiss();
    this.props.onPress();
  };

  onRef = ref => (this.ref = ref);

  render() {
    const { text, title, image, buttonTitle, animation } = this.props;

    return (
      <BaseModal
        ref={this.onRef}
        visible
        modalAnimation={animation}
        onTouchOutside={this.dismiss}
        width={0.9}
        onDismiss={Actions.pop}>
        <View style={styles.topContainer}>
          {image && <Image resizeMode="contain" source={image} style={styles.image} />}
          {title && <Text style={styles.title}>{title}</Text>}
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <Button title={buttonTitle} onPress={this.onPress} />
        </View>
      </BaseModal>
    );
  }
}

CustomAlert.defaultProps = {
  animation: new ScaleAnimation({
    initialValue: 0,
    useNativeDriver: true,
  }),
  buttonTitle: 'OK',
  onPress: () => null,
};

const styles = ScaledSheet.create({
  image: {
    alignSelf: 'center',
    marginBottom: '10@s',
    width: '40@s',
    height: '40@s',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '60@s',
    paddingHorizontal: '20@s',
  },
});
