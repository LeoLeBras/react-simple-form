/* @flow */
/* eslint global-require: 0 */
/* eslint import/newline-after-import: 0 */

import React, { Component } from 'react'
import dismissKeyboard from './../../helpers/dismissKeyboard'
import * as actionTypes from './../../module/actionTypes'

const { FOCUS_FIELD } = actionTypes
const isReactNative = navigator.product === 'ReactNative'

type Props = {
  className?: string,
  style?: StyleSheet,
  contentOffset?: number,
  children?: React$Element<any>,
}

class WrappedForm extends Component {

  props: Props

  subscriptions: Array<any> = []

  componentWillMount() {
    if (isReactNative) {
      const { Keyboard } = require('react-native')
      this.subscriptions = [
        Keyboard.addListener('keyboardDidHide', () => {
          this.scrollView.scrollTo({ y: 0 })
        }),
      ]
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove())
  }

  dispatch = (action: Object): void => {
    if (action.type === FOCUS_FIELD && isReactNative) {
      const { contentOffset } = this.props
      const { ref } = action.field
      const { findNodeHandle } = require('react-native')
      const scrollResponder = this.scrollView.getScrollResponder()
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(ref),
        contentOffset || 10,
        true
      )
    }
  }

  render() {
    const { className, style } = this.props
    const children = this.props.children || null
    if (isReactNative) {
      const {
        ScrollView,
        View,
        TouchableWithoutFeedback,
      } = require('react-native')
      return (
        <ScrollView
          ref={(c) => this.scrollView = c}
          bounces={false}
          keyboardShouldPersistTaps={true}
        >
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={style}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )
    }
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          return false
        }}
        className={className}
      >
        {children}
      </form>
    )
  }

}

export default WrappedForm
