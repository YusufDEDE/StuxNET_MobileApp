import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import BaseLightBox from './BaseLightBox';
import { colors } from 'res';

export default class AlertLightBox extends Component {
  ref = ref => (this.lightbox = ref);
  closeButton = () => this.lightbox.closeModal();

  render() {
    const { title, text } = this.props;

    return (
      <BaseLightBox ref={this.ref}>
        <View style={styles.card}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={this.closeButton} block={true} title={'Close'} />
          </View>
        </View>
      </BaseLightBox>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 40,
    margin: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    flexShrink: 1,
  },
  heading: { textAlign: 'center', marginBottom: 15 },
  text: { textAlign: 'center', marginVertical: 5 },
  buttonContainer: {
    marginTop: 15,
    alignSelf: 'stretch',
  },
});
