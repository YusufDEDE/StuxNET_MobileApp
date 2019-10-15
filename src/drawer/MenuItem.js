import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import colors from 'res/colors';
import fonts from 'res/fonts';
import Icon from 'react-native-vector-icons/Feather';
import {ScaledSheet} from 'react-native-size-matters';
import {Actions} from 'react-native-router-flux';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }
  onPress = () => {
    Actions.jump(this.props.scene);
  };

  render() {
    const {text} = this.props;
    return (
      <TouchableHighlight
        style={styles.accordionItem}
        underlayColor={'transparent'}
        onPress={this.onPress}>
        <View style={styles.listItem}>
          <Icon name={'minus'} size={16} color={colors.coolGrey} />
          <Text style={[styles.accordionText]}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = ScaledSheet.create({
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '20@s',
    paddingHorizontal: '30@s',
  },
  accordionText: {
    fontSize: '18@s',
    letterSpacing: '-0.5@s',
    paddingLeft: '10@s',
    color: colors.secondaryDark,
    fontFamily: fonts.avenirMedium,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
