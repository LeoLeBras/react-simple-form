/* @flow */

import React, { PropTypes, Component } from 'react'
import _ from 'lodash'
import { getFormStatus, getFormValues, getFormErrors } from './../../utils'
import formReducer from './../../module/reducer'
import * as actionTypes from './../../module/actionTypes'
import WrappedForm from './../WrappedForm'
import type { FormAction, FormState, FormResponse, FormContext } from './../../types'

const { UPDATE, SUBMIT } = actionTypes

type Props = {
  children?: React$Element<any>,
  initialValues?: { [name: string]: string },
  reducer?: () => { action: FormAction, state: FormState },
}

class Form extends Component {

  props: Props
  state: FormState = {
    status: 'pending',
    formState: {},
  }


  // Update values in all fields
  updateValues = (values: { [name: string]: string }): void => {
    this.dispatch({
      type: UPDATE,
      values,
    })
  }


  // Submit form. This method is accessible only
  // with ref
  submit = (): Promise<FormResponse> => {
    return new Promise(
      async (resolve, reject) => {
        const status = getFormStatus({ ...this.state })
        const form = _.cloneDeep(this.state)
        const { formState } = form
        if (status === 'success') {
          const values = getFormValues(form)
          const response = { status, formState, values }
          this.dispatch({
            type: SUBMIT,
            response,
          })
          resolve(response)
        } else {
          const response = {
            status,
            formState,
            errors: getFormErrors({ ...this.state }),
          }
          this.dispatch({
            type: SUBMIT,
            response,
          })
          reject(response)
        }
      }
    )
  }


  // Dispatch an action
  dispatch = (action: FormAction): void => {
    const { reducer } = this.props
    const state = formReducer(
      this.state || { status: 'pending', formState: {} },
      action,
    )
    if (this.wrapper) this.wrapper.dispatch(action)
    this.state = reducer ? reducer(state, action) : state
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.forceUpdate(), 10)
  }


  // Return form state
  getState = (): Object => {
    return this.state.formState
  }


  // Send form actions to field children
  static childContextTypes = { form: PropTypes.object.isRequired }
  getChildContext(): { form: FormContext } {
    return {
      form: {
        status: this.state.status,
        formState: this.state.formState,
        initialValues: this.props.initialValues || {},
        keyboardAvoidingViewRef: this.props.keyboardAvoidingViewRef,
        onInitialyze: this.onInitialyze,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        dispatch: this.dispatch,
        submit: this.submit,
      },
    }
  }


  // Render <Form /> component
  render() {
    const { children, ...props } = this.props
    return (
      <WrappedForm
        {...props}
        ref={(c) => this.wrapper = c}
      >
        {children}
      </WrappedForm>
    )
  }

}

export default Form
