/* eslint max-len: 0 */
/* eslint no-console: 0 */

import React from 'react'

const TextInput = (props) => {
  const { name, value, placeholder, onChange, onFocus, onBlur } = props
  console.log(`%c <TextInput name="${name}" /> render`, 'font-weight: bold; font-size: 14px; color: blue;')
  return (
    <input
      type="text"
      style={{ marginLeft: 5 }}
      id={name}
      name={name}
      value={value || ''}
      placeholder={placeholder || ''}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default TextInput
