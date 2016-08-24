import React, { PropTypes } from 'react'

const Button = (props) => {
  const { onClick, children } = props
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
