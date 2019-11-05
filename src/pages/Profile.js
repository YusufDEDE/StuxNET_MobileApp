/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import {inject, observer} from 'mobx-react';
import Api from '~/api';
import {Formik} from 'formik';
import {colors} from 'res';

@inject('authStore')
@observer
class Profile extends React.Component {
  state = {
    isVisible: true,
    password: '',
    date: '',
  };

  onChangeDate = text => {
    const str = this.state.date;
    if (!str.endsWith('.') && (text.length === 2 || text.length === 5)) {
      text += '.';
    } else if (
      (text.length === 3 || text.length === 6) &&
      !text.endsWith('.')
    ) {
      text = this.state.date + '.';
    }
    this.setState(state => ({
      date:
        (state.date.length === 2 || state.date.length === 5) &&
        (text.lastIndexOf('.') !== 5 &&
          text.lastIndexOf('.') !== 2 &&
          text.lastIndexOf('.') !== -1)
          ? (state.date += '.')
          : text,
    }));
  };

  handleChange = text => {
    this.setState({password: text});
  };

  handleSubmit = (
    {password, phone, email, adress, date, name, surname},
    {setErrors, setSubmitting},
  ) => {
    const {userInfo, setAccountList} = this.props.authStore;
    if (this.state.password === userInfo.password) {
      Api.Auth.updateUser({
        tc: 77777777777,
        pw: password,
        firstName: name,
        lastName: surname,
        birthDate: date,
        address: adress,
        phone: phone,
        mail: email,
      })
        .then(res => {
          setSubmitting(false);
          setAccountList(userInfo.tcNumber);
          Actions.home();
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
          setErrors({id: err.message});
        });
    } else {
      setSubmitting(false);
      Alert.alert(
        'You shall not pass!!',
        'Eski şifrenle girdiğin şifre uyumsuz bro :)',
      );
    }
  };
  render() {
    const {
      firstName,
      lastName,
      mail,
      phoneNumber,
      tcNumber,
      address,
      birthDate,
    } = this.props.authStore.userInfo;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={{
            name: firstName,
            surname: lastName,
            email: mail,
            phone: phoneNumber,
            address: address,
            date: birthDate,
            password: '',
            confirmPassword: '',
          }}
          validationSchema={yup.object().shape({
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
                  placeholder="*********"
                  keyboardType={'numeric'}
                  disabled={true}
                  leftIcon={<Icon name="id-card" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  value={tcNumber}
                  errorMessage={
                    props.touched.id && props.errors.id ? props.errors.id : null
                  }
                />
                <Input
                  label={'Eski Şifre'}
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
                  onChangeText={this.handleChange}
                  value={this.state.password}
                  maxLength={12}
                  errorMessage={
                    props.touched.password && props.errors.password
                      ? props.errors.password
                      : null
                  }
                />
                <Input
                  label={'Yeni Şifre'}
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
                  label={'Yeni Şifre Tekrar'}
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
                  maxLength={11}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                />
                <Input
                  label={'Soyad'}
                  labelStyle={{color: 'red'}}
                  placeholder="aurelio"
                  maxLength={20}
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
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
                  containerStyle={{marginTop: 30}}
                  maxLength={45}
                  onChangeText={props.handleChange('address')}
                  onBlur={props.handleBlur('address')}
                  value={props.values.address}
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
                  maxLength={40}
                  errorMessage={
                    props.touched.email && props.errors.email
                      ? props.errors.email
                      : null
                  }
                />
                <Input
                  label={'Doğum Tarihi'}
                  labelStyle={{color: 'red'}}
                  placeholder="01.01.1990"
                  keyboardType={'numeric'}
                  leftIcon={<Icon name="user" size={24} color="black" />}
                  leftIconContainerStyle={{left: -13}}
                  containerStyle={{marginTop: 30}}
                  maxLength={10}
                  onChangeText={this.onChangeDate}
                  value={this.state.date}
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
                  maxLength={10}
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
                    title="Bilgileri Güncelle"
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

export default Profile;

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
