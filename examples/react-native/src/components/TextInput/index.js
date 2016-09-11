/* eslint max-len: 0 */
/* eslint no-console: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react'
import { TextInput as Input } from 'react-native'
import styles from './styles'

class TextInput extends Component {

  focus = () => {
    this.ref.focus()
  }

  blur = () => {
    this.ref.blur()
  }

  render() {
    console.log(`%c <TextInput name="${this.props.name}" /> render`, 'font-weight: bold; font-size: 14px; color: blue;')
    const {
      value, placeholder, returnKeyType,
      onChange, onFocus, onBlur, onSubmitEditing,
    } = this.props
    return (
      <Input
        ref={(c) => this.ref = c}
        style={styles.main}
        value={value || ''}
        placeholder={placeholder || ''}
        returnKeyType={returnKeyType || 'default'}
        blurOnSubmit={false}
        onChangeText={(e) => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
      />
    )
  }

}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
}

export default TextInput
