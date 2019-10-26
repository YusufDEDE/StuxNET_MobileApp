import React from 'react';
import {View, StyleSheet, StatusBar, FlatList, Text} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class ListAccount extends React.Component {
  state = {
    testData: null,
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={
        'Hesap No: ' +
        item['Account Number'] +
        '      Hesap Açılış Tarihi : ' +
        item['Creation Date']
      }
      subtitle={'Bakiye: ' + item.Balance}
      bottomDivider
      chevron
      style={styles.flatListItem}
      onPress={() => console.warn(item)}
    />
  );

  onPress = () => {
    const {accounts} = this.props.authStore;
    this.setState({
      testData: accounts,
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

export default ListAccount;

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
