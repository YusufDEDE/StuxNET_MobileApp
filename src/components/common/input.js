import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {colors} from 'res';

const SearchInput = ({isFocused, searchGray, ...props}) => {
  return (
    <View style={searchGray ? styles.searchBoxGray : styles.searchBoxWhite}>
      {!isFocused && (
        <Icon
          name="search"
          size={scale(20)}
          color={colors.coolGrey}
          style={styles.iconStyle}
        />
      )}
      <TextInput
        autoCorrect={false}
        style={styles.textInputStyle}
        textAlignVertical={'top'}
        allowFontScaling={false}
        {...props}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  searchBoxGray: {
    marginHorizontal: '25@s',
    marginVertical: '23@vs',
    backgroundColor: colors.paleGrey,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: scale(3),
    height: '35@vs',
  },
  searchBoxWhite: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: '45@vs',
  },
  iconStyle: {alignSelf: 'center', paddingLeft: '12@s'},
  textInputStyle: {
    fontSize: '16@vs',
    alignSelf: 'center',
    paddingLeft: '10@s',
    width: '100%',
    height: '100%',
  },
});

export {SearchInput};
