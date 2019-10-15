import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import colors from 'res/colors';
import Icon from 'react-native-vector-icons/Feather';
import Avatar from 'rn-colorful-avatar';
import fonts from 'res/fonts';
import {ScaledSheet} from 'react-native-size-matters';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MenuItem from './MenuItem';

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topDrawer}>
          <Avatar circle={true} size={60} name={'KullanıcıAdı'} lang="tr-TR" />
          <View style={styles.text}>
            <Text style={styles.name}>Kullanıcı Adı</Text>
          </View>
        </View>
        <View style={styles.bottomDrawer}>
          <Collapse>
            <CollapseHeader>
              <View style={styles.listItem}>
                <Icon
                  name="book"
                  size={16}
                  color={this.state.pressed ? 'white' : 'black'}
                />
                <Text style={[styles.drawerText]}>Hesaplarım</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <MenuItem text="Hesap Aç" scene="openAccount" />
              <MenuItem text="Hesap Kapat" scene="closeAccount" />
              <MenuItem text="Hesaplarımı Görüntüle" scene="listAccount" />
            </CollapseBody>
          </Collapse>
          <Collapse>
            <CollapseHeader>
              <View style={styles.listItem}>
                <Icon
                  name="dollar-sign"
                  size={16}
                  color={this.state.pressed ? 'white' : 'black'}
                />
                <Text style={[styles.drawerText]}>Para İşlemleri</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <MenuItem text="Para Yatır" scene="takeMoney" />
              <MenuItem text="Para Çek" scene="depositMoney" />
            </CollapseBody>
          </Collapse>
        </View>
      </SafeAreaView>
    );
  }
}

export default DrawerContent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topDrawer: {
    paddingHorizontal: '25@s',
    paddingVertical: '25@s',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  exit: {paddingLeft: '110@s'},
  text: {justifyContent: 'center'},
  name: {
    fontSize: '16@s',
    fontFamily: fonts.avenirMedium,
    letterSpacing: '-0.44@s',
    paddingLeft: '10@s',
  },
  drawerText: {
    fontFamily: fonts.avenirMediumr,
    fontSize: '18@s',
    letterSpacing: '-0.5@s',
    paddingLeft: '10@s',
    color: colors.cyprus,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: '20@s',
    paddingHorizontal: '20@s',
    borderBottomColor: colors.cyprus,
    borderBottomWidth: 1,
    marginRight: '80@s',
  },
  bottomDrawer: {},
});
