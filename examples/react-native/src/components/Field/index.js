/* eslint react/prefer-stateless-function: 0 */

import React, { PropTypes, createElement, Component } from 'react'
import { View, Text } from 'react-native'
import { withField } from 'react-simple-form/native'
import styles from './styles'

const errorMessages = {
  isRequired: 'Champ requis',
}

class Field extends Component {

  onSubmitEditing = () => {
    const { name, form } = this.props
    const fields = Object.keys(form.formState)
    const nextField = form.formState[fields[fields.indexOf(name) + 1]]
    if (nextField) nextField.ref.focus()
    else this.blur()
  }

  focus = () => {
    this.input.focus()
  }

  blur = () => {
    this.input.blur()
  }

  renderComponent = () => {
    const { component, form, name } = this.props
    const fields = Object.keys(form.formState)
    const nextField = form.formState[fields[fields.indexOf(name) + 1]]
    const returnKeyType = nextField ? 'next' : 'default'
    const onSubmitEditing = this.onSubmitEditing
    const ref = (c) => this.input = c
    return createElement(
      component,
      { ...this.props, returnKeyType, onSubmitEditing, ref,
    })
  }

  render() {
    const { label, errors, hasBeenFocused, form } = this.props
    const showErrors = (hasBeenFocused || form.status === 'failure') && errors.length > 0
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {label}
        </Text>
        {this.renderComponent()}
        {showErrors &&
          <View style={styles.errors}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.error}>
                {errorMessages[error]}
              </Text>
            ))}
          </View>
        }
      </View>
    )
  }
}

Field.propTypes = {
  component: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasBeenFocused: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

export default withField(Field)
