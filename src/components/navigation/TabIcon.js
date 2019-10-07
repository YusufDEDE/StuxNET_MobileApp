import React, {Component} from 'react';
import {colors} from 'res';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabIcon extends Component {
  render() {
    const color = this.props.focused ? colors.primary : 'white';
    return (
      <Icon name={this.props.iconName || 'user-o'} size={22} color={color} />
    );
  }
}
