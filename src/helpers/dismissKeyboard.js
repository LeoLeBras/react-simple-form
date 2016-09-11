/* @flow */
/* eslint import/newline-after-import: 0 */
/* eslint global-require: 0 */

export default () => {
  const { State: TextInputState } = require('react-native').TextInput
  TextInputState.blurTextInput(
    TextInputState.currentlyFocusedField()
  )
}
