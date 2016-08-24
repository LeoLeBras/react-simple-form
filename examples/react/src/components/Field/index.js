import React, { createElement } from 'react'
import { withField } from 'react-simple-form'

const errorMessages = {
  isRequired: 'Champ requis',
}

const Field = (props) => {
  const { component, name, label, errors, hasBeenFocused, form } = props
  const showErrors = (hasBeenFocused || form.status === 'failure') && errors.length > 0
  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      {createElement(component, props)}
      {showErrors &&
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{errorMessages[error]}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default withField(Field)
