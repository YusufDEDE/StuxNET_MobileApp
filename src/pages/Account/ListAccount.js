/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {fonts, colors} from 'res';

@inject('authStore')
@observer
class ListAccount extends React.Component {
  state = {
    testData: null,
    loading: false,
  };

  keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    const {accounts, user, setAccountList} = this.props.authStore;
    setAccountList(user);
    this.setState({
      testData: accounts,
    });
  }

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
    const {accounts, user, setAccountList} = this.props.authStore;
    this.setState({loading: true});
    setAccountList(user)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
    this.setState({
      testData: accounts,
    });
  };

  render() {
    const {testData, loading} = this.state;
    console.log(testData);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <Text style={styles.text}>Hesaplarım</Text>
        <View style={styles.accountsContainer}>
          <View style={styles.flatListContainer}>
            {testData === null ? (
              <Text style={styles.errorText}>Bekleniyor..</Text>
            ) : testData.status === 404 || testData.status === false ? (
              <Text style={styles.errorText}>
                Üyeliğinize tanımlı hesap bulunamadı..
              </Text>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.testData}
                renderItem={this.renderItem}
                nullable
              />
            )}
          </View>
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          {loading ? (
            <ActivityIndicator color={'blue'} size="large" />
          ) : (
            <Button title={'Hesap Listele'} onPress={this.onPress} />
          )}
        </View>
      </View>
    );
  }
}

export default ListAccount;

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
    marginTop: 20,
    flex: 9,
  },
  errorText: {
    margin: 20,
    color: colors.red,
    fontFamily: fonts.avenirMedium,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
