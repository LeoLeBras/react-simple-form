import React, { PropTypes } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const Button = (props) => {
  const { onPress, children } = props
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Button
