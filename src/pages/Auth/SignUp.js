/* eslint-disable eqeqeq */
/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import Api from '~/api';
import {Formik} from 'formik';
import {colors} from 'res';

const dateRegExp = /^\d+$/; //sadece sayılar

export default class SignUp extends React.Component {
  state = {
    isVisible: true,
    isDate: false,
    date: '',
  };

  handleSubmit = (
    {id, password, phone, email, adress, date, name, surname},
    {setErrors, setSubmitting},
  ) => {
    Api.Auth.register({
      tc: id,
      pw: password,
      firstName: name,
      lastName: surname,
      birthDate: date,
      address: adress,
      phone: phone,
      mail: email,
    })
      .then(() => {
        Actions.login();
        Alert.alert('Kayıt olma başarılı.', 'giriş yapabilirsiniz..');
        setSubmitting(false);
      })
      .catch(() => {
        Alert.alert('Kayıt olma başarısız!.', 'lütfen tekrar deneyiniz..');
        setSubmitting(false);
      });

    setSubmitting(false);
  };

  onChangeDate = text => {
    const str = this.state.date;
    if (
      !str.endsWith('-') &&
      (text.length === 7 || text.length === 4) &&
      dateRegExp.test(text.slice(-1)) // '-' atmak için
    ) {
      text += '-';
    }
    this.setState(state => ({
      date:
        (state.date.length === 7 || state.date.length === 4) &&
        (text.lastIndexOf('-') !== 4 && text.lastIndexOf('-') !== 7)
          ? (state.date += '-')
          : text,
    }));
    console.log('11111', this.state.isDate);
  };

  isValidDate = dateString => {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return false;
    }

    // Parse the date parts to integers
    var parts = dateString.split('-');
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      return false;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29;
    }

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
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
                  maxLength={11}
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
                  maxLength={12}
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
                  maxLength={12}
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
                  maxLength={25}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                />
                <Input
                  label={'Soyad'}
                  labelStyle={{color: 'red'}}
                  placeholder="aurelio"
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  maxLength={25}
                  containerStyle={{marginTop: 30}}
                  onChangeText={props.handleChange('surname')}
                  onBlur={props.handleBlur('surname')}
                  value={props.values.surname}
                />
                <Input
                  label={'Adres'}
                  labelStyle={{color: 'red'}}
                  placeholder="yeni mahalle / no : 3 /turgutlu / manisa"
                  leftIcon={<Icon name="map" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  maxLength={50}
                  containerStyle={{marginTop: 30}}
                  onChangeText={props.handleChange('adress')}
                  onBlur={props.handleBlur('adress')}
                  value={props.values.adress}
                />
                <Input
                  label={'Mail'}
                  labelStyle={{color: 'red'}}
                  placeholder="example@mail.com"
                  leftIcon={<Icon name="envelope" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                  maxLength={30}
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
                  label={'Doğum Tarihi'}
                  labelStyle={{color: 'red'}}
                  placeholder="2011/11/11"
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                  maxLength={10}
                  onChangeText={this.onChangeDate}
                  value={this.state.date}
                  errorMessage={this.state.isDate.toString()}
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
                  maxLength={10}
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
