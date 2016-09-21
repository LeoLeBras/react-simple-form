/* @flow */
/* eslint max-len: 0 */

import React, { Component, PropTypes } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import _ from 'lodash'
import * as actionTypes from './../module/actionTypes'
import type { FormField, FormContext } from './../types'
import { getFieldErrors } from './../utils'

function getDisplayName(WrappedField: () => React$Element<any>) {
  return WrappedField.displayName || WrappedField.name || 'Field'
}

const { INITIALYZE_FIELD, CHANGE_FIELD, FOCUS_FIELD, BLUR_FIELD } = actionTypes

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
      const { initialValues } = this.context.form
      const { name } = this.props
      const hasBeenFocused = false
      const isFocused = false
      const value = this.props.value || initialValues[name] || null
      const errors = getFieldErrors(
        { ...this.props, value },
        this.context.form,
      )
      const field = { ...this.props, value, errors, hasBeenFocused, isFocused }
      this.dispatch({
        type: INITIALYZE_FIELD,
        field,
      })
    }

    componentDidMount() {
      const ref = this.ref
      const field = { ...this.state, ref }
      this.dispatch({
        type: CHANGE_FIELD,
        field,
      })
    }

    onChange = (value: string): void => {
      const errors = getFieldErrors(
        { ...this.state, value },
        this.context.form,
      )
      if (value !== this.state.value || !_.isEqual(this.state.errors, errors)) {
        const field = { ...this.state, value, errors }
        this.dispatch({
          type: CHANGE_FIELD,
          field,
          force: true,
        })
      }
    }

    onFocus = (): void => {
      const isFocused = true
      const field = { ...this.state, isFocused }
      this.dispatch({
        type: FOCUS_FIELD,
        field,
      })
    }

    onBlur = (): void => {
      const hasBeenFocused = true
      const isFocused = false
      const field = { ...this.state, hasBeenFocused, isFocused }
      this.dispatch({
        type: BLUR_FIELD,
        field,
      })
    }

    dispatch = (action) => {
      this.context.form.dispatch(action)
      this.state = action.field
      if (action.force) this.forceUpdate()
    }

    shouldComponentUpdate(nextProps: FormField, nextState: FormField, nextContext: { form: FormContext }) {
      const { name } = this.state
      const field = this.context.form.formState[name]
      const nextField = nextContext.form.formState[name]
      return (
        this.state.value !== nextState.value ||
        !_.isEqual(field, nextField) ||
        !_.isEqual(Object.keys(this.context.form.formState), Object.keys(nextContext.form.formState)) ||
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
