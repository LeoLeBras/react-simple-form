/* @flow */
/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import _ from 'lodash'
import type { FormField, FormContext } from './../types'
import { getFieldErrors } from './../utils'

function getDisplayName(WrappedField: () => React$Element<any>) {
  return WrappedField.displayName || WrappedField.name || 'Field'
}

export default function withField(WrappedField: () => React$Element<any>) {
  class WithField extends Component {

    static contextTypes = {
      form: PropTypes.object.isRequired,
    }
    static displayName = `withField(${getDisplayName(WrappedField)})`
    static WrappedField = WrappedField

    props: FormField
    state: FormField

    componentWillMount() {
      const hasBeenFocused = false
      const isFocused = false
      const value = this.props.value || null
      const errors = getFieldErrors({ ...this.props, value })
      const field = { ...this.props, value, errors, hasBeenFocused, isFocused }
      this.state = field
      this.context.form.onInitialyze(field)
    }

    componentDidMount() {
      const ref = this.ref
      const field = { ...this.state, ref }
      this.context.form.onChange(field)
      this.setState(field)
    }

    onChange = (value: string): void => {
      const errors = getFieldErrors({ ...this.state, value })
      const field = { ...this.state, value, errors }
      this.context.form.onChange(field)
      this.setState(field)
    }

    onFocus = (): void => {
      const isFocused = true
      const field = { ...this.state, isFocused }
      this.context.form.onFocus(field)
      this.setState(field)
    }

    onBlur = (): void => {
      const hasBeenFocused = true
      const isFocused = false
      const field = { ...this.state, hasBeenFocused, isFocused }
      this.context.form.onBlur(field)
      this.setState(field)
    }

    componentWillReceiveProps(nextProps: FormField, nextContext: { form: FormContext }) {
      const { name } = this.state
      const { value } = nextContext.form.formState[name]
      if (value !== this.state.value) this.onChange(value)
    }

    shouldComponentUpdate(nextProps: FormField, nextState: FormField, nextContext: { form: FormContext }) {
      return (
        !_.isEqual(this.state, nextState) ||
        !_.isEqual(Object.keys(this.context.form.formState, Object.keys(nextContext.form.formState))) ||
        this.context.form.status !== nextContext.form.status
      )
    }

    render() {
      return (
        <WrappedField
          {...this.props}
          {...this.state}
          {...this.context}
          ref={(c) => this.ref = c}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      )
    }

  }

  return hoistStatics(WithField, WrappedField)
}
