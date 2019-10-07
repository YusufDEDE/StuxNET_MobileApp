import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {inject, observer} from 'mobx-react';
import Api from '~/api';

@inject('testStore')
@observer
class StoreTest extends React.Component {
  testApi = () => {
    Api.Auth.login();
  };

  render() {
    const {testStore} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{testStore.value}</Text>

        <Button onPress={this.testApi} title={'Test API'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default StoreTest;
