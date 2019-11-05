/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {inject, observer} from 'mobx-react';
import * as yup from 'yup';
import Api from '~/api';
import {Formik} from 'formik';
import {colors} from 'res';

@inject('authStore')
@observer
class Login extends React.Component {
  state = {
    isVisible: true,
  };

  handleSubmit = ({id, password}, {setErrors, setSubmitting}) => {
    const {setUser, setAccountList} = this.props.authStore;

    Api.Auth.login({
      tc: id,
      pw: password,
    })
      .then(res => {
        setUser(id, res.token);
        setAccountList(id);
        Alert.alert('giriş başarılı.', 'hoşgeldin :)');
        Actions.replace('drawer', {token: res.token});
        setSubmitting(false);
      })
      .catch(err => {
        Alert.alert('giriş başarısız.', err);
        setSubmitting(false);
        setErrors({id: err.message});
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          onSubmit={this.handleSubmit}
          validationSchema={yup.object().shape({
            id: yup
              .number('bu alana sayı girilmelidir.')
              .required('bu alan boş geçilemez')
              .moreThan(9999999999, 'Kimlik Numarası uygun değil!')
              .lessThan(100000000000, 'Kimlik Numarası uygun değil!'),
            password: yup
              .string('bu alan boş geçilemez')
              .min(6, 'şifre minimum 6 karakter içermelidir')
              .max(12, 'şifre maximum 12 karakter içerebilir')
              .required('bu alan boş geçilemez'),
          })}>
          {props => (
            <React.Fragment>
              <View style={styles.inputBox}>
                <Input
                  label={'Kimlik No'}
                  placeholder="11122233344"
                  keyboardType={'numeric'}
                  leftIcon={<Icon name="id-card" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  onChangeText={props.handleChange('id')}
                  onBlur={props.handleBlur('id')}
                  value={props.values.id}
                  maxLength={11}
                  errorMessage={
                    props.touched.id && props.errors.id ? props.errors.id : null
                  }
                />
                <Input
                  label={'Şifre'}
                  placeholder="******"
                  leftIcon={<Icon name="key" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  rightIcon={
                    <Icon
                      name={this.state.isVisible ? 'eye-slash' : 'eye'}
                      size={24}
                      color="black"
                      onPress={() =>
                        this.setState({isVisible: !this.state.isVisible})
                      }
                    />
                  }
                  containerStyle={{marginTop: 20}}
                  secureTextEntry={this.state.isVisible}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                  maxLength={12}
                  errorMessage={
                    props.touched.password && props.errors.password
                      ? props.errors.password
                      : null
                  }
                />
              </View>
              <View style={styles.buttonBox}>
                <Button
                  title="Giriş Yap"
                  type="outline"
                  containerStyle={{
                    width: 200,
                    backgroundColor: colors.secondaryDark,
                  }}
                  titleStyle={{color: 'white'}}
                  onPress={props.handleSubmit}
                  loading={props.isSubmitting}
                  disabled={!props.isValid}
                />
              </View>
              <TouchableOpacity
                style={styles.forgotPass}
                onPress={() => console.warn('yeni hesap aç')}>
                <Text style={{color: 'red'}}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </Formik>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputBox: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forgotPass: {},
});
