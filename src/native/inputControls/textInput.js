import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import commonStyle from '../commonStyle';

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    }),
  },
  textIcon: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        right: 10,
        top: 30,
      },
      android: {
        right: 10,
        top: 43,
      },
    }),
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 20,
  },
  valid: {
    ...Platform.select({
      ios: {
        borderColor: 'gray',
      },
    }),
  },
  invalid: {
    ...Platform.select({
      ios: {
        borderColor: '#C3281C',
      },
    }),
  },
  error: {
    color: '#C3281C',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '600',
    marginTop: 3,
  },
});

/**
 * to be wrapped with redux-form Field component
 */
class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordToggle: props.password,
    };
  }

  render() {
    const {
      input, meta, inputRef, label, password, ...inputProps
    } = this.props;

    // do not display warning if the field has not been touched or if it's currently being edited
    const valid = meta.touched && !meta.active ? !!meta.valid : true;
    const errorStyle = !valid && styles.invalid;
    return (
      <View>
        {!!label && <Text style={commonStyle.text}>{label}</Text>}
        <TextInput
          {...inputProps}
          ref={inputRef}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, errorStyle]}
          underlineColorAndroid={valid ? 'gray' : '#C3281C'}
          secureTextEntry={password && this.state.passwordToggle}
        />
        {password && (
          <TouchableHighlight
            style={styles.textIcon}
            underlayColor="white"
            onPress={() => this.setState({ passwordToggle: !this.state.passwordToggle })}
          >
            <Icon name={this.state.passwordToggle ? 'ios-eye' : 'ios-eye-off'} size={22} />
          </TouchableHighlight>
        )}
        {meta.error && !valid && <Text style={styles.error}>{meta.error}</Text>}
      </View>
    );
  }
}

InputText.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    error: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired,
  }).isRequired,
  password: PropTypes.bool,
  date: PropTypes.bool,
  inputRef: PropTypes.func,
  label: PropTypes.string,
};

InputText.defaultProps = {
  password: false,
  date: false,
  inputRef: () => {},
  label: '',
};

export default InputText;
