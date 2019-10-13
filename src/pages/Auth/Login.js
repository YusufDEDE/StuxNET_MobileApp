/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {colors} from 'res';

export default class Login extends React.Component {
  state = {
    isVisible: true,
  };

  handleSubmit = ({id, password}, {setErrors, setSubmitting}) => {
    console.warn('onsubmit');
    // this.props.rootStore.authStore
    //   .login(id, password)
    //   .then(() => {
    //     Actions.mainPage();
    //     setSubmitting(false);
    //   })
    //   .catch(err => {
    //     setSubmitting(false);
    //     setErrors({id: err.message});
    //   });
    Actions.main({type: 'replace'});
    setSubmitting(false);
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
