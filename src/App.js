import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Lightbox,
  Router,
  Scene,
  Tabs,
  Stack,
  Drawer,
} from 'react-native-router-flux';
import {TabIcon} from '~/components/navigation';
import {
  Login,
  SignUp,
  HomeScreen,
  OpenAccount,
  ListAccount,
  CloseAccount,
  Deposit,
  WithDraw,
  Havale,
  Virman,
} from '~/pages';
import DrawerContent from '~/drawer/DrawerContent';
import NavBar from '~/components/navigation/NavBar';
import {colors} from 'res';
import {AlertLightBox} from '~/components/modals';
import * as stores from '~/store';
import {Provider} from 'mobx-react';
import CustomAlert from '~/components/modals/CustomAlert';

/**
 * Bir şeyleri yeniden icat etmek yerine Router-Flux ve React-Navigation proplarına bakmalısın.
 * Router'a prop vererek tasarım genel olarak özelleştirilebilr.
 * activeTintColor, sceneStyle, indicatorStyle, headerTintColor, navigationBarStyle gibi.
 *
 * https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md
 * https://reactnavigation.org/docs/en/with-navigation.html
 *
 */
export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <Router
          sceneStyle={styles.scene}
          tabBarStyle={styles.tabBar}
          titleStyle={styles.title}
          tintColor={colors.headerTint}
          headerTintColor={colors.headerTint}>
          <Lightbox key="lightbox" hideNavBar>
            <Stack key="main" hideNavBar>
              <Tabs key={'auth'} icon={TabIcon} showLabel={false}>
                <Scene
                  key={'login'}
                  component={Login}
                  iconName={'user'}
                  hideNavBar
                />
                <Scene
                  key={'signup'}
                  component={SignUp}
                  iconName={'sign-in'}
                  hideNavBar
                />
              </Tabs>

              <Scene
                key="alert"
                headerLayoutPreset="center"
                component={AlertLightBox}
              />
              <Scene
                key="customAlert"
                headerLayoutPreset="center"
                component={CustomAlert}
              />
              <Drawer
                key="drawer"
                type="replace"
                hideNavBar
                contentComponent={DrawerContent}
                drawerPosition="left"
                drawerWidth={280}
                navBar={NavBar}>
                <Scene key={'home'} component={HomeScreen} type={'reset'} />
                <Scene key={'openAccount'} component={OpenAccount} />
                <Scene key={'listAccount'} component={ListAccount} />
                <Scene key={'closeAccount'} component={CloseAccount} />
                <Scene key={'depositMoney'} component={Deposit} />
                <Scene key={'takeMoney'} component={WithDraw} />
                <Scene key={'havale'} component={Havale} />
                <Scene key={'virman'} component={Virman} />
              </Drawer>
            </Stack>
          </Lightbox>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scene: {backgroundColor: colors.background},
  tabBar: {backgroundColor: colors.lightGray},
});
