/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import {Formik} from 'formik';
import {colors} from 'res';

export default class SignUp extends React.Component {
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
    Actions.main();
    setSubmitting(false);
  };
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Formik
          onSubmit={this.handleSubmit}
          validationSchema={yup.object().shape({
            id: yup
              .number('Bu alana sayı girilmelidir.')
              .required('Bu alan boş geçilemez')
              .moreThan(9999999999, 'Kimlik Numarası uygun değil!')
              .lessThan(100000000000, 'Kimlik Numarası uygun değil!'),
            password: yup
              .string('Bu alan boş geçilemez')
              .min(6, 'Şifre minimum 6 karakter içermelidir')
              .max(12, 'Şifre maximum 12 karakter içerebilir')
              .required('Bu alan boş geçilemez'),
            repassword: yup
              .string()
              .oneOf([yup.ref('password'), null], 'Şifreler Aynı Olmalı!'),
            phone: yup
              .number('Bu alana sayı girilmelidir.')
              .required('Bu alan boş geçilemez')
              .moreThan(5320000000, 'Telefon numarası geçersiz')
              .lessThan(5559999999, 'Telefon numarası geçersiz'),
            email: yup
              .string('Mail adresi geçersiz')
              .email('Geçersiz mail!')
              .required('Bu alan boş geçilemez.'),
          })}>
          {props => (
            <React.Fragment>
              <View style={styles.inputBox}>
                <Input
                  label={'Kimlik No'}
                  labelStyle={{color: 'red'}}
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
                  labelStyle={{color: 'red'}}
                  placeholder="******"
                  leftIcon={<Icon name="key" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
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
                <Input
                  label={'Şifre Tekrar'}
                  labelStyle={{color: 'red'}}
                  placeholder="******"
                  leftIcon={<Icon name="key" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
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
                  secureTextEntry={this.state.isVisible}
                  onChangeText={props.handleChange('repassword')}
                  onBlur={props.handleBlur('repassword')}
                  value={props.values.repassword}
                  errorMessage={
                    props.touched.repassword && props.errors.repassword
                      ? props.errors.repassword
                      : null
                  }
                />
                <Input
                  label={'Ad'}
                  labelStyle={{color: 'red'}}
                  placeholder="mehmet"
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                />
                <Input
                  label={'Soyad'}
                  labelStyle={{color: 'red'}}
                  placeholder="aurelio"
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                />
                <Input
                  label={'Adres'}
                  labelStyle={{color: 'red'}}
                  placeholder="yeni mahalle / no : 3 /turgutlu / manisa"
                  leftIcon={<Icon name="map" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                />
                <Input
                  label={'Mail'}
                  labelStyle={{color: 'red'}}
                  placeholder="example@mail.com"
                  leftIcon={<Icon name="envelope" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  errorMessage={
                    props.touched.email && props.errors.email
                      ? props.errors.email
                      : null
                  }
                />
                <Input
                  label={'Telefon'}
                  keyboardType={'numeric'}
                  labelStyle={{color: 'red'}}
                  placeholder="5356667711"
                  leftIcon={<Icon name="phone" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                  errorMessage={
                    props.touched.phone && props.errors.phone
                      ? props.errors.phone
                      : null
                  }
                />
                <View style={styles.buttonBox}>
                  <Button
                    title="Kayıt Ol"
                    type="outline"
                    containerStyle={{
                      width: 200,
                      backgroundColor: colors.secondaryDark,
                      marginBottom: 50,
                    }}
                    titleStyle={{color: 'white'}}
                    onPress={props.handleSubmit}
                    loading={props.isSubmitting}
                    disabled={!props.isValid}
                  />
                </View>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginHorizontal: 50,
    marginTop: 40,
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
