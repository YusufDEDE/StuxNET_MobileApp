import React from 'react';
import {View, StyleSheet, StatusBar, FlatList, Text} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {fonts, colors} from 'res';

export default class OpenAccount extends React.Component {
  state = {
    listData: [
      {
        number: '123213213213',
        name: 'mehmet',
      },
      {
        number: '65784123213213',
        name: 'mehmet',
      },
      {
        number: '78454686213',
        name: 'mehmet',
      },
      {
        number: '123213213213',
        name: 'mehmet',
      },
      {
        number: '65784123213213',
        name: 'mehmet',
      },
      {
        number: '78454686213',
        name: 'mehmet',
      },
      {
        number: '123213213213',
        name: 'mehmet',
      },
      {
        number: '65784123213213',
        name: 'mehmet',
      },
      {
        number: '78454686213',
        name: 'mehmet',
      },
    ],
    testData: null,
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={`Hesap no: ${item.number}`}
      bottomDivider
      chevron
      style={styles.flatListItem}
      onPress={() => console.warn(item.number)}
    />
  );

  onPress = () => {
    this.setState({
      testData: this.state.listData,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesaplarım</Text>
        <View>
          <View style={styles.flatListContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.testData}
              renderItem={this.renderItem}
              nullable
            />
          </View>
        </View>
        <Button title={'Hesap Listele'} onPress={this.onPress} />
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
    fontWeight: 'bold',
  },
  flatListItem: {
    borderColor: colors.cyprus,
    borderWidth: 0.2,
  },
  flatListContainer: {
    height: 350,
    width: 320,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.lightGray,
    overflow: 'hidden',
  },
});
