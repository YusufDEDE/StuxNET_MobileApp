/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import colors from 'res/colors';
import Icon from 'react-native-vector-icons/Feather';
import Avatar from 'rn-colorful-avatar';
import fonts from 'res/fonts';
import {inject, observer} from 'mobx-react';
import {ScaledSheet} from 'react-native-size-matters';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MenuItem from './MenuItem';

@inject('authStore')
@observer
class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }
  state = {
    name: 'isim',
    surname: 'soyisim',
  };

  componentDidMount() {
    if (this.props.authStore.userInfo !== null) {
      const {firstName, lastName} = this.props.authStore.userInfo;
      this.setState({
        name: firstName,
        surname: lastName,
      });
    }
  }
  render() {
    const {name, surname} = this.state;
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.topDrawer}>
            <Avatar circle={true} size={60} name={name} lang="tr-TR" />
            <View style={styles.text}>
              <Text style={styles.name}>
                {name} {surname}
              </Text>
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
                <MenuItem text="Para Yatır" scene="depositMoney" />
                <MenuItem text="Para Çek" scene="takeMoney" />
                <MenuItem text="Havale" scene="havale" />
                <MenuItem text="Virman" scene="virman" />
                <MenuItem text="Para Transferleri" scene="moneyTransfer" />
              </CollapseBody>
            </Collapse>
            <Collapse>
              <CollapseHeader>
                <View style={styles.listItem}>
                  <Icon
                    name="file-text"
                    size={16}
                    color={this.state.pressed ? 'white' : 'black'}
                  />
                  <Text style={[styles.drawerText]}>Ödemeler</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <MenuItem text="Fatura Öde" scene="payment" />
                <MenuItem text="Ödeme Geçmişim" scene="pastPayments" />
              </CollapseBody>
            </Collapse>
            <Collapse>
              <CollapseHeader>
                <View style={styles.listItem}>
                  <Icon
                    name="settings"
                    size={16}
                    color={this.state.pressed ? 'white' : 'black'}
                  />
                  <Text style={[styles.drawerText]}>Ayarlar</Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <MenuItem text="Çıkış Yap" scene="main" type="reset" />
              </CollapseBody>
            </Collapse>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default DrawerContent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50,
  },
  topDrawer: {
    paddingHorizontal: '25@s',
    paddingVertical: '25@s',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  exit: {paddingLeft: '110@s'},
  text: {justifyContent: 'center', marginRight: '40@s'},
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
